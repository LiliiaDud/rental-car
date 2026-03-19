import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rental-car-phi-ashen.vercel.app'),

  title: 'RentalCar | Car Rental Service',
  description: 'A platform for renting cars with ease and convenience',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'RentalCar | Car Rental Service',
    description: 'A platform for renting cars with ease and convenience',
    url: 'https://rental-car-phi-ashen.vercel.app',
    images: [
      {
        url: '/images/hero.webp',
        width: 1200,
        height: 630,
        alt: 'RentalCar Hero Image',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Toaster position="top-right" />
        </TanStackProvider>
      </body>
    </html>
  );
}
