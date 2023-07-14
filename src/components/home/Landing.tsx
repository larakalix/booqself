/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import type { AuthParamProps } from "@/types/auth/auth";

export const Landing = () => {
    const { push } = useRouter();
    const searchParams = useSearchParams();
    const { params, setParams } = useAuthStore((state) => state);

    const URI = `${process.env.NEXT_CLOVER_ROOT_URL}/oauth/authorize?client_id=${process.env.NEXT_CLOVER_APP_ID}`;

    useEffect(() => {
        if (params) push("dashboard");

        const queryParams: AuthParamProps = {
            merchant_id: searchParams.get("merchant_id") ?? undefined,
            employee_id: searchParams.get("employee_id") ?? undefined,
            client_id: searchParams.get("client_id") ?? undefined,
            code: searchParams.get("code") ?? undefined,
        };

        if (
            Object.values(queryParams).every(
                (param) => param !== null && param !== undefined
            )
        ) {
            setParams(queryParams);
            push("dashboard");
        }
    }, []);

    return (
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link
                href={URI}
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
                Login
                <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                </svg>
            </Link>
            <a
                href="#"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
                Learn more
            </a>
        </div>
    );
};
