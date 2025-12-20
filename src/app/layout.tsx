import type { Metadata } from "next";
import {  Poppins} from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});



export const metadata: Metadata = {
  title: "Sandra - Professional Cleaning Services",
  description: "Bringing freshness, comfort and care to every home. Experience professional cleaning services that transform your living space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
