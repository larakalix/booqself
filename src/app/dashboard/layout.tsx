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
            <main className="p-4 mt-16 md:mt-10 flex items-start w-full max-w-[1920px]">
                {props.children}
            </main>
        </>
    );
}
