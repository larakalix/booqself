import { Sidebar } from "@/components/layout/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - Booqself",
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

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Sidebar />
            <main className="flex items-start w-full">{children}</main>
        </>
    );
}
