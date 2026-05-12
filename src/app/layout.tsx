import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/app/components/Navbar';
import { getSession } from '@/app/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FinTrack - Pencatatan Keuangan',
  description: 'Aplikasi pencatatan keuangan pribadi',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession(); // ✅ sudah pakai await
  
  return (
    <html lang="id">
      <body className={inter.className}>
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}