/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

type Props = {
    className?: string;
    children: React.ReactNode;
};

export const PageWrapper = ({ className = "", children }: Props) => {
    const { push } = useRouter();
    const { params } = useAuthStore((state) => state);

    useEffect(() => {
        if (!params) push("/");

        return () => {};
    }, []);

    return (
        <section
            className={`min-h-screen w-full ml-0 xl:ml-60 p-5 ${className}`}
        >
            {children}
        </section>
    );
};
