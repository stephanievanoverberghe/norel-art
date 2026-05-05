import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-body',
});

const catchyMager = localFont({
    src: '../../public/fonts/CatchyMager.ttf',
    variable: '--font-heading',
});

export const metadata: Metadata = {
    title: {
        default: 'Norel Art',
        template: '%s | Norel Art',
    },
    description: 'L’art du regard, le trait de l’âme.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" data-scroll-behavior="smooth">
            <body className={`${montserrat.variable} ${catchyMager.variable}`}>{children}</body>
        </html>
    );
}
