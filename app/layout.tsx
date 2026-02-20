import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    template: "%s | DomikStay",
    default: "DomikStay — Аренда уютного домика на природе",
  },
  description:
    "Уютный домик для отдыха на природе. Тишина, комфорт и чистый воздух — всё для незабываемых выходных. Бронируйте онлайн!",
  keywords: ["аренда домика", "отдых на природе", "домик на выходные", "загородный отдых"],
  openGraph: {
    title: "DomikStay — Аренда уютного домика на природе",
    description:
      "Уютный домик для отдыха на природе. Тишина, комфорт и чистый воздух — всё для незабываемых выходных.",
    type: "website",
    locale: "ru_RU",
    siteName: "DomikStay",
  },
  twitter: {
    card: "summary_large_image",
    title: "DomikStay — Аренда уютного домика на природе",
    description: "Уютный домик для отдыха на природе. Бронируйте онлайн!",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
