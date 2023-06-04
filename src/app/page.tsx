import Link from "next/link";
import { PageWrapper } from "@/components/wrapper/PageWrapper";

export default async function Home() {
    return (
        <PageWrapper className="flex flex-col gap-8 items-center justify-center">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard"
                    className="text-base font-light bg-blue-400 text-white rounded-sm py-2 px-8 hover:ring-gray-200 hover:ring-2"
                >
                    Dashboard
                </Link>
                <Link
                    href="/booking"
                    className="text-base font-light bg-blue-400 text-white rounded-sm py-2 px-8 hover:ring-gray-200 hover:ring-2"
                >
                    Booking
                </Link>
            </div>
        </PageWrapper>
    );
}
