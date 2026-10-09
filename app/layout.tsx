import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NextStore | Premium Electronics, Clothing & Home Goods',
  description: 'Explore high quality electronics, apparel, and home essentials with fast shipping and seamless cart checkout.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#f8fafc] text-slate-800`}>
        <CartProvider>
          <Suspense fallback={<div className="h-20 bg-[#155dfc]" />}>
            <Header />
          </Suspense>
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
