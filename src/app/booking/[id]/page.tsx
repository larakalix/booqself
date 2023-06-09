import { BookingBoard } from "@/components/book/BookingBoard";

type Props = {
    params: { id: string };
};

export default async function BookingById({ params: { id } }: Props) {
    return (
        <section className="min-h-screen w-full p-5">
            <BookingBoard id={id} />
        </section>
    );
}
