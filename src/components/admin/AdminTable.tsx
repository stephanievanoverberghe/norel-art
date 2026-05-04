interface AdminTableColumn<T> {
    key: keyof T;
    label: string;
}

interface AdminTableProps<T extends Record<string, string>> {
    columns: AdminTableColumn<T>[];
    rows: T[];
}

export function AdminTable<T extends Record<string, string>>({ columns, rows }: AdminTableProps<T>) {
    return (
        <div className="overflow-hidden rounded-md border border-white/10 bg-[#08131f]/78 shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-xl">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                <thead className="bg-white/5">
                    <tr>
                        {columns.map((column) => (
                            <th key={String(column.key)} className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/8">
                    {rows.map((row, index) => (
                        <tr key={index} className="transition hover:bg-white/[0.035]">
                            {columns.map((column) => (
                                <td key={String(column.key)} className="px-4 py-4 text-white/68">
                                    {row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
