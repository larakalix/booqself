import Link from "next/link";
import { PageWrapper } from "@/components/wrapper/PageWrapper";

export default async function Home() {
    return (
        <PageWrapper className="flex flex-col gap-8 items-center justify-center">
            <div className="flex flex-col gap-4">
                <small>
                    <div className="text-main-blue text-[1.5rem] font-semibold">
                        <h1 className="w-10 h-10">
                            <span>Booqself</span>
                        </h1>
                    </div>
                </small>
                <Link
                    href="/api/auth/login"
                    className="text-base font-light bg-blue-400 text-white rounded-sm py-2 px-8 hover:ring-gray-200 hover:ring-2"
                >
                    Dashboard
                </Link>
            </div>
        </PageWrapper>
    );
}
