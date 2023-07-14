/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { ROUTES } from "@/ constants/routes";

export const Latest = () => {
    return (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Daily Appointments
                </h5>
                <Link
                    href={ROUTES.APPOINTMENTS}
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                    View all
                </Link>
            </div>

            <ol className="relative border-l border-gray-200 dark:border-gray-700">
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-green-400 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        Upcoming at 11:00AM, Friday, August 11, 2023
                    </time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Ivan Lara
                    </h3>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        Beauty package #1 with Leticia Weaver
                    </p>
                </li>
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-green-400 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        Upcoming at 2:00PM, Saturday, July 15, 2023
                    </time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Nina B. Gordon
                    </h3>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Face threading deluxe with Maidely Rey
                    </p>
                </li>
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-green-400 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        Upcoming at 4:00PM, Wednesday, August 9, 2023
                    </time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Joel Morris Ballard
                    </h3>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Beauty package #3 with Maidely Rey
                    </p>
                </li>
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-green-400 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        Upcoming at 9:00AM, Friday, July 14, 2023
                    </time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Cynthia R. Smiley
                    </h3>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Eyebrow lamination with Leticia Weaver
                    </p>
                </li>
            </ol>
        </div>
    );
};
