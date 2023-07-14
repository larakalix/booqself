"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@tremor/react";
import { ROUTES } from "@/ constants/routes";
import type { ITenantAttributes } from "@/types/models/tenant";
import { useHeader } from "./hooks/useHeader";

export const Header = ({ tenant }: { tenant: ITenantAttributes }) => {
    const { greetings } = useHeader();

    return (
        <header className="flex items-center justify-between">
            <Card className="flex justify-between items-center w-full h-full">
                {tenant && (
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">
                            Welcome to {tenant.name}!
                        </h1>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                            {greetings}! We&apos;re delighted to have you here
                            User!
                        </p>

                        <p className="hidden lg:block text-base font-normal text-gray-500 dark:text-gray-400">
                            If you have any questions or need assistance, please
                            don&apos;t hesitate to reach out. Our team is ready
                            to provide you with the support you need.
                        </p>

                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Thank you for choosing {tenant.name}!
                        </p>

                        <a
                            href={`mailto:${tenant.email}`}
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-5 text-center my-2"
                        >
                            Contact us, we&apos;ll help you!
                        </a>
                    </div>
                )}

                <Image
                    className="hidden lg:block"
                    src="/images/jump.webp"
                    width={256}
                    height={256}
                    alt="No selected day"
                    loading="lazy"
                />
            </Card>
        </header>
    );
};
