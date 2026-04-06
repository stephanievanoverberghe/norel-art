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
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50">
                    <tr>
                        {columns.map((column) => (
                            <th key={String(column.key)} className="px-4 py-3 font-medium text-slate-600">
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {rows.map((row, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td key={String(column.key)} className="px-4 py-3 text-slate-700">
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
