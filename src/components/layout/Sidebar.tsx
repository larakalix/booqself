/* eslint-disable @next/next/no-img-element */
"use client";

import { Children, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";
import { CgMenuLeft, CgClose } from "react-icons/cg";
import { Logo } from "./Logo";
import { useAuthStore } from "@/stores/authStore";
import { ROUTES } from "@/ constants/routes";
import type { NavItems } from "@/types/layout";

const links: NavItems[] = [
    { label: "Dashboard", route: ROUTES.DASHBOARD },
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
    const sideBarRef = useRef(null);

    const handleClick = (route: string) => {
        setToogle((state) => (state = false));
        router.push(route);
    };

    const handleLogout = () => {
        removeSession();
        router.push(ROUTES.HOME);
    };

    useOnClickOutside(sideBarRef, () => {
        setToogle((state) => (state = false));
    });

    const styles = clsx({
        ["transform-none"]: toogle,
        ["-translate-x-full"]: !toogle,
    });

    // if (!user) return null;

    return (
        <>
            <nav className="fixed top-0 z-50 w-full dark:bg-white border-b dark:border-gray-200 bg-gray-800 border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                onClick={() => setToogle((s) => !s)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                {/* <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg> */}
                                {toogle ? (
                                    <CgClose className="text-[1.5rem]" />
                                ) : (
                                    <CgMenuLeft className="text-[1.5rem]" />
                                )}
                            </button>
                            <Logo />
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <div>
                                    <button
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 dark:focus:ring-gray-300 focus:ring-gray-600"
                                        aria-expanded="false"
                                        data-dropdown-toggle="dropdown-user"
                                    >
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                            alt="user photo"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                ref={sideBarRef}
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${styles} dark:bg-white border-r dark:border-gray-200 xl:translate-x-0 bg-gray-800 border-gray-700`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-white bg-gray-800">
                    <ul className="flex flex-col gap-2 font-medium">
                        {Children.toArray(
                            links.map(({ label, route }) => (
                                <li>
                                    <button
                                        type="button"
                                        onClick={() => handleClick(route)}
                                        className="w-full flex items-center p-2 dark:text-gray-900 rounded-lg text-white dark:hover:bg-gray-100 hover:bg-gray-700 group"
                                    >
                                        <span className="ml-3 whitespace-nowrap">
                                            {label}
                                        </span>
                                    </button>
                                </li>
                            ))
                        )}
                        <li>
                            <button
                                type="button"
                                className="w-full flex items-center p-2 dark:text-gray-900 rounded-lg text-white dark:hover:bg-gray-100 hover:bg-gray-700 group"
                                onClick={handleLogout}
                            >
                                <span className="ml-3 whitespace-nowrap">
                                    Log out
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};
