import { QueryProvider } from "@/context/QueryProvider";
import { BookingBoard } from "@/components/book/BookingBoard";

type Props = {
    params: { id: string; appointmentId: string; employeeId: string };
};

export default async function BookingById({ params: { id, appointmentId, employeeId }}: Props) {
    return (
        <QueryProvider>
            <section className="min-h-screen w-full p-5">
                <BookingBoard id={id} appointmentId={appointmentId} employeeId={employeeId} />
            </section>
        </QueryProvider>
    );
}
