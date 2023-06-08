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
        console.log(params);
        if (params) push("dashboard");

        const queryParams: AuthParamProps = {
            merchant_id: searchParams.get("merchant_id") ?? undefined,
            employee_id: searchParams.get("employee_id") ?? undefined,
            client_id: searchParams.get("client_id") ?? undefined,
            code: searchParams.get("code") ?? undefined,
        };

        console.log(queryParams);

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
        <div>
            <Link
                href={URI}
                className="text-base font-medium bg-blue-400 text-white rounded-sm py-4 px-10 hover:ring-gray-200 hover:ring-2"
            >
                Login
            </Link>
        </div>
    );
};
