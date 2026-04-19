'use client';

import { forwardRef, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';

import { cn } from '@/lib/utils/cn';

export interface SelectOption {
    value: string;
    label: string;
    description?: string;
}

export interface SelectProps {
    id?: string;
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    name?: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
    { id, options, value, onChange, placeholder = 'Choisir', className, disabled = false, name },
    ref,
) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const rootRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const listboxId = useId();

    const selectedOption = useMemo(() => options.find((option) => option.value === value), [options, value]);

    const getInitialHighlightedIndex = () => {
        const selectedIndex = options.findIndex((option) => option.value === value);
        return selectedIndex >= 0 ? selectedIndex : 0;
    };

    const openMenu = () => {
        if (disabled) {
            return;
        }

        setHighlightedIndex(getInitialHighlightedIndex());
        setIsOpen(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setHighlightedIndex(-1);
    };

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handlePointerDown = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                closeMenu();
            }
        };

        const handleEscape = (event: globalThis.KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeMenu();
                buttonRef.current?.focus();
            }
        };

        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    const commitSelection = (nextValue: string) => {
        onChange?.(nextValue);
        closeMenu();
        buttonRef.current?.focus();
    };

    const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) {
            return;
        }

        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openMenu();
        }
    };

    const handleListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!isOpen) {
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setHighlightedIndex((prev) => {
                if (prev < options.length - 1) {
                    return prev + 1;
                }

                return 0;
            });
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            setHighlightedIndex((prev) => {
                if (prev > 0) {
                    return prev - 1;
                }

                return options.length - 1;
            });
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();

            const option = options[highlightedIndex];
            if (option) {
                commitSelection(option.value);
            }
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            closeMenu();
            buttonRef.current?.focus();
        }
    };

    return (
        <div ref={rootRef} className={cn('relative', className)}>
            {name ? <input type="hidden" name={name} value={value ?? ''} /> : null}

            <button
                ref={(node) => {
                    buttonRef.current = node;

                    if (typeof ref === 'function') {
                        ref(node);
                    } else if (ref) {
                        ref.current = node;
                    }
                }}
                type="button"
                id={id}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={listboxId}
                onClick={() => {
                    if (isOpen) {
                        closeMenu();
                    } else {
                        openMenu();
                    }
                }}
                onKeyDown={handleTriggerKeyDown}
                className={cn(
                    'group relative cursor-pointer flex min-h-12 w-full items-center justify-between rounded-[1.1rem] border border-white/10 bg-white/4 px-4 py-3 text-left text-white outline-none transition-all duration-300',
                    'focus-visible:border-white/22 focus-visible:bg-white/5.5 focus-visible:ring-2 focus-visible:ring-white/8',
                    'hover:border-white/14 hover:bg-white/5.5',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    isOpen && 'border-white/18 bg-white/6',
                )}
            >
                <span className="min-w-0">
                    {selectedOption ? (
                        <span className="block truncate text-sm text-white/88">{selectedOption.label}</span>
                    ) : (
                        <span className="block truncate text-sm text-white/34">{placeholder}</span>
                    )}
                </span>

                <span
                    aria-hidden="true"
                    className={cn(
                        'ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/4 text-white/38 transition-all duration-300',
                        isOpen && 'rotate-180 border-white/12 text-white/58',
                    )}
                >
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </button>

            <div
                className={cn(
                    'absolute left-0 right-0 z-50 mt-2 origin-top transition-all duration-200',
                    isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0',
                )}
            >
                <div
                    id={listboxId}
                    role="listbox"
                    tabIndex={-1}
                    onKeyDown={handleListKeyDown}
                    className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-[rgba(8,14,24,0.92)] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
                >
                    <div className="max-h-72 overflow-y-auto pr-1">
                        {options.map((option, index) => {
                            const isSelected = option.value === value;
                            const isHighlighted = index === highlightedIndex;

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                    onClick={() => commitSelection(option.value)}
                                    className={cn(
                                        'flex w-full cursor-pointer items-start justify-between gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200',
                                        isHighlighted ? 'bg-white/8' : 'bg-transparent hover:bg-white/6',
                                    )}
                                >
                                    <span className="min-w-0">
                                        <span className={cn('block text-sm', isSelected ? 'text-white' : 'text-white/78')}>{option.label}</span>

                                        {option.description ? <span className="mt-1 block text-xs leading-5 text-white/40">{option.description}</span> : null}
                                    </span>

                                    <span
                                        aria-hidden="true"
                                        className={cn('mt-1 h-2 w-2 shrink-0 rounded-full transition-all duration-200', isSelected ? 'bg-(--accent)' : 'bg-transparent')}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
});
