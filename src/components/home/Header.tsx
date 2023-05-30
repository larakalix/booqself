"use client";

import Link from "next/link";
import { Searchbar } from "./Searchbar";
import { ROUTES } from "@/ constants/routes";

export const Header = () => {
    return (
        <div className="flex items-center justify-between">
            <Searchbar />

            <ul>
                <li>
                    <Link
                        href={ROUTES.REGISTER}
                        className="flex-shrink-0 inline-flex justify-center items-center group focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium rounded-md border shadow-sm px-4 py-2.5 text-lg bg-green-500 border-green-500 focus:ring-green-300 text-white hover:bg-green-500"
                    >
                        Register
                    </Link>
                </li>
            </ul>
        </div>
    );
};
