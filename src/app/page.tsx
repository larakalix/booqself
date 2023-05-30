import { Header } from "@/components/home/Header";
import { Results } from "@/components/home/Results";
import { PageWrapper } from "@/components/wrapper/PageWrapper";
import type { IMeta } from "@/types/strapi/generic";
import type { IClient } from "@/types/models/clients";

// async function getData(): Promise<{ clients: IClient[]; meta: IMeta }> {
//     const res = await fetch(`${process.env.NEXT_API_URL}/client`);
//     if (!res.ok) throw new Error("Failed to fetch data");

//     return res.json();
// }

export default async function Home() {
    // const { clients, meta } = await getData();

    return (
        <PageWrapper className="flex flex-col gap-8">
            <Header />

            <Results clients={[]} meta={{} as IMeta} />
        </PageWrapper>
    );
}
