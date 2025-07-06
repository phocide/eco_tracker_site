import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
    title: 'Система мониторинга воздуха корпуса №1 НИУ БелГУ',
    description:
        'Система мониторинга качества воздуха с использованием датчиков Alphasense и Plantower на территории корпуса №1 НИУ БелГУ',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid=".v6o-ps">
            {' '}
            <body className="" data-oid="0dkzgog">
                {' '}
                {children}{' '}
            </body>{' '}
        </html>
    );
}
