"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";
import { CgMenuLeft, CgClose } from "react-icons/cg";
import { HiLogout } from "react-icons/hi";
import { Logo } from "./Logo";
import { useAuthStore } from "@/stores/authStore";
import { ROUTES } from "@/ constants/routes";
import type { NavItems } from "@/types/layout";

const links: NavItems[] = [
    { label: "Home", route: ROUTES.DASHBOARD },
    { label: "Appointments", route: ROUTES.APPOINTMENTS },
    { label: "Clients", route: ROUTES.CLIENTS },
    { label: "Employees", route: ROUTES.EMPLOYEES },
    { label: "Services", route: ROUTES.SERVICES },
    { label: "Orders", route: ROUTES.ORDERS },
    { label: "Reports", route: ROUTES.REPORTS },
    { label: "Settings", route: ROUTES.SETTINGS },
];

export const Sidebar = () => {
    const [toogle, setToogle] = useState(false);
    const router = useRouter();
    const { removeSession } = useAuthStore((state) => state);
    const ref = useRef(null);

    const handleClick = (route: string) => {
        setToogle(false);
        router.push(route);
    };

    const handleLogout = () => {
        removeSession();
        router.push(ROUTES.HOME);
    };

    const handleClickOutside = () => {
        if (toogle) setToogle(false);
    };

    useOnClickOutside(ref, handleClickOutside);

    const styles = clsx({
        ["left-0"]: toogle,
        ["left-[-15rem]"]: !toogle,
    });

    // if (!user) return null;

    return (
        <div
            ref={ref}
            className={`bg-sidebar min-h-[100vh] w-[15rem] max-w-[20rem] p-5 border-r border-main-gray-border absolute xl:fixed ${styles} xl:left-0 transition-all z-10`}
        >
            <button
                className="absolute right-[-2.5rem] cursor-pointer flex xl:hidden"
                onClick={() => setToogle((state) => !state)}
            >
                {toogle ? (
                    <CgClose className="text-[1.5rem]" />
                ) : (
                    <CgMenuLeft className="text-[1.5rem]" />
                )}
            </button>

            <Logo />

            <nav className="mt-7 border-main-gray-border pb-4 mb-4">
                <ol className="space-y-4">
                    {links.map(({ label, route }) => (
                        <li key={`${label}-nav-item`}>
                            <button
                                type="button"
                                // href={route}
                                // passHref
                                onClick={() => handleClick(route)}
                                className="text-start bg-transparent text-link-gray text-[0.875rem] font-medium leading-[1.25rem] hover:bg-white hover:text-gray-800 block w-full p-2 rounded-md"
                            >
                                {label}
                            </button>
                        </li>
                    ))}
                    <li key={`logout-nav-item`}>
                        <button
                            type="button"
                            className="flex items-center justify-between text-start bg-transparent text-link-gray text-[0.875rem] font-medium leading-[1.25rem] hover:bg-white hover:text-gray-800 w-full p-2 rounded-md"
                            onClick={handleLogout}
                        >
                            Log out
                            <HiLogout className="rotate-180" />
                        </button>
                    </li>
                </ol>
            </nav>

            {/* {user && (
                <Link href={`/${user.username}`} passHref>
                    <User
                        id={user.id}
                        name={user.name}
                        lastname={user.lastname}
                        email={user.email}
                        username={user.username}
                        thumbnail={user.thumbnail}
                    />
                </Link>
            )} */}
        </div>
    );
};
