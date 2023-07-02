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
                        <h2>{greetings} User!</h2>

                        <a
                            href={`mailto:${tenant.email}`}
                            className="text-blue-600"
                        >
                            Contact us, we&apos;ll help you!
                        </a>
                    </div>
                )}

                <Image
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
