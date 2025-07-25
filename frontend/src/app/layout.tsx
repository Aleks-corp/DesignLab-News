import { Roboto, DM_Serif_Display, Roboto_Condensed } from "next/font/google";
import "./globals.css";
// import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QueryProvider from "@/components/providers/QueryProvider";
import AdminNavbar from "@/components/AdminNavBar";
import { AdminProvider } from "../context/AdminContext";
import { metadata } from "@/lib/metadata";

const roboto = Roboto({
  weight: ["400", "500", "600", "700"],
  subsets: ["cyrillic", "latin"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  weight: ["400", "500", "600", "700"],
  subsets: ["cyrillic", "latin"],
  variable: "--font-robotoCondensed",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${roboto.variable} ${dmSerif.variable} ${robotoCondensed.variable} antialiased`}
      >
        <div className="flex flex-col gap-[32px] min-h-screen p-8 pb-12 sm:p-20 ">
          <AdminProvider>
            <QueryProvider>
              <AdminNavbar />
              <Header />
              <main className="flex items-center justify-center sm:items-start">
                {children}
              </main>
              {/* <Footer /> */}
            </QueryProvider>
          </AdminProvider>
        </div>
      </body>
    </html>
  );
}
