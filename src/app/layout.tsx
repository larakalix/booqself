import Script from "next/script";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import type { Metadata } from "next";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Booqself",
    description: "Booqself is an application to make appointments.",
    manifest: "/manifest.json",
    viewport: "width=device-width, initial-scale=1",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://booqself.vercel.app",
        title: "Booqself",
        description: "Booqself is an application to make appointments.",
        siteName: "Booqself",
    },
    twitter: {
        title: "Booqself",
        description: "Booqself is an application to make appointments.",
        site: "Booqself",
    },
    icons: {
        icon: "/vercel.svg",
        apple: "/vercel.svg",
    },
    themeColor: "#000",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Sidebar />
                <main className="flex items-start">{children}</main>
            </body>

            <Script id="service-worker" src="register" />
        </html>
    );
}
