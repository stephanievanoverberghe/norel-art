export function AdminHeader() {
    return (
        <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Back-office</p>
                    <p className="text-lg font-semibold text-slate-900">Gestion Norel Art</p>
                </div>
                <button className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700">Se déconnecter</button>
            </div>
        </header>
    );
}
