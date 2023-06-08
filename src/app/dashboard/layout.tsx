import { Sidebar } from "@/components/layout/Sidebar";
import { PageWrapper } from "@/components/wrapper/PageWrapper";

export default async function Layout(props: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <>
            <Sidebar />
            {props.modal}
            <main className="flex items-start w-full">{props.children}</main>
        </>
    );
}
