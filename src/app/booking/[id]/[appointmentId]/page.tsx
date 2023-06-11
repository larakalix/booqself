import { BookingBoard } from "@/components/book/BookingBoard";

type Props = {
    params: { id: string; appointmentId: string };
};

export default async function BookingById({
    params: { id, appointmentId },
}: Props) {
    return (
        <section className="min-h-screen w-full p-5">
            <BookingBoard id={id} appointmentId={appointmentId} />
        </section>
    );
}
