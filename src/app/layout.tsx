import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Floral Boutique | Custom Bouquets',
  description: 'Create your perfect custom bouquet with our interactive designer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}