import Link from 'next/link';

const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/oeuvres', label: 'Oeuvres' },
    { href: '/admin/commandes', label: 'Commandes' },
    { href: '/admin/demandes', label: 'Demandes' },
    { href: '/admin/temoignages', label: 'Temoignages' },
    { href: '/admin/settings', label: 'Parametres' },
];

export function AdminSidebar() {
    return (
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-6 lg:block">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Norel Admin</p>
            <nav className="mt-6 space-y-2">
                {links.map((link) => (
                    <Link key={link.href} href={link.href} className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
