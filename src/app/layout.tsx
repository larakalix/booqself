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
            <body className={inter.className}>
                <Sidebar />
                <main className="flex items-start">{children}</main>
            </body>
        </html>
    );
}
