import { Sidebar } from "@/components/layout/Sidebar";

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
