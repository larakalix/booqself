"use client";

import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { Board } from "@/components/home/Board";

export default async function Dashboard() {
    return (
        <PageWrapper className="flex flex-col gap-8">
            <Board />
        </PageWrapper>
    );
}
