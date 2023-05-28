import Head from "next/head";
import Script from "next/script";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Booqself",
    description: "Booqself is an application to make appointments.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon.png"></link>
                <meta name="theme-color" content="#fff" />
            </Head>

            <body className={inter.className}>
                <Sidebar />
                <main className="flex items-start">{children}</main>
            </body>

            <Script id="service-worker" src="register" />
        </html>
    );
}
