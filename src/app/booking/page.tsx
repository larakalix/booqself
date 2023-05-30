import { Card } from "@tremor/react";
import { Apointments, Calendar } from "@/components/book";

export default async function Booking() {
    return (
        <section className="min-h-screen w-full p-5">
            <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[calc(100vh-2.5rem)] p-0">
                <Calendar appointments={[]} />
                <Apointments appointments={[]} />
            </Card>
        </section>
    );
}
