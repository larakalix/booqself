import { Card } from "@/kit/card/Card";
import { Landing } from "@/components/home/Landing";

export default async function Home() {
    return (
        <section className="min-h-screen w-full p-5">
            <Card className="flex items-center justify-between flex-col gap-4 min-h-[calc(100vh-2.5rem)] p-0">
                <div className="flex items-center justify-center flex-col gap-4 flex-1">
                    <h1 className="text-main-blue text-[1.5rem] font-semibold">
                        Pura Vida
                    </h1>
                    <Landing />
                </div>
                <footer className="py-6">
                    <p className="text-gray-400 text-sm">
                        Copyright © 2023 Pura Vida. All rights reserved.
                    </p>
                </footer>
            </Card>
        </section>
    );
}
