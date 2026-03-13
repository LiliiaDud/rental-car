import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "RentalCar | Car Rental Service",
    description: "Reliable and budget-friendly car rentals for any journey.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
      <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
      {children}
      </body>
      </html>
    );
};