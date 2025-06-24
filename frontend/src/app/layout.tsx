import type { Metadata } from "next";
import { Roboto, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QueryProvider from "@/components/providers/QueryProvider";

const roboto = Roboto({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UX.News – Новини дизайну та інтерфейсів",
  description:
    "Свіжі матеріали про UX, UI, досвід користувача та сучасний веб-дизайн українською мовою.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ua">
      <body className={`${roboto.variable} ${dmSerif.variable} antialiased`}>
        <div className="flex flex-col gap-[32px] min-h-screen p-8 pb-12 sm:p-20 ">
          <Header />
          <main className="flex items-center justify-center sm:items-start">
            <QueryProvider>{children}</QueryProvider>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
