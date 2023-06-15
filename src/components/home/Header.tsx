"use client";

import Link from "next/link";
import { ROUTES } from "@/ constants/routes";
import type { ITenantAttributes } from "@/types/models/tenant";

export const Header = ({ tenant }: { tenant: ITenantAttributes }) => {
    return (
        <header className="flex items-center justify-between px-6">
            {tenant && (
                <h1 className="text-2xl font-bold">Welcome to {tenant.name}!</h1>
            )}
            <ul>
                <li>
                    {/* <Link
        href={ROUTES.REGISTER}
        className="flex-shrink-0 inline-flex justify-center items-center group focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium rounded-md border shadow-sm px-4 py-2.5 text-lg bg-green-500 border-green-500 focus:ring-green-300 text-white hover:bg-green-500"
    >
        Register
    </Link> */}
                    <a href={`mailto:${tenant.email}`} className="text-blue-600">
                        Contact us, we&apos;ll help you!
                    </a>
                </li>
            </ul>
        </header>
    );
};
