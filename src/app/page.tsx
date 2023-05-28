import { Header } from "@/components/home/Header";
import { Results } from "@/components/home/Results";
import { PageWrapper } from "@/components/wrapper/PageWrapper";

export default function Home() {
    return (
        <PageWrapper className="flex flex-col gap-8">
            <Header />

            <Results />
        </PageWrapper>
    );
}
