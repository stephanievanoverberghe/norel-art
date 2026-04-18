interface SplitLinesProps {
    lines: string[];
}

export function SplitLines({ lines }: SplitLinesProps) {
    return lines.map((line, index) => (
        <span key={`${line}-${index}`}>
            {line}
            {index < lines.length - 1 && <br />}
        </span>
    ));
}
