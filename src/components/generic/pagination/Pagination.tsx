import { Children } from "react";
import Link from "next/link";
import clsx from "clsx";
import type { IPagination } from "@/types/models/generic";
import { NextLink, PrevLink } from "./childs";

type Props = {
    pagination: IPagination;
    rootRoute: string;
};

export const Pagination = ({ pagination, rootRoute }: Props) => {
    const isFirstPage = pagination.page === 1;
    const isLastPage = pagination.page === pagination.pageCount;
    const isCurrentPage = (page: number) => page === pagination.page;

    const handlePrevPage = isFirstPage
        ? "#!"
        : `${rootRoute}?page=${pagination.page - 1}`;
    const handleNextPage = isLastPage
        ? "#!"
        : `${rootRoute}?page=${pagination.page + 1}`;

    return (
        <nav aria-label="Page navigation">
            <ul className="flex items-center -space-x-px h-10 text-base">
                <PrevLink
                    isFirstPage={isFirstPage}
                    handlePrevPage={handlePrevPage}
                />
                {Children.toArray(
                    Array.from({ length: pagination.pageCount }, (_, i) => (
                        <li>
                            <Link
                                href={`${rootRoute}?page=${i + 1}`}
                                className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                                    ${clsx({
                                        "bg-white dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-white":
                                            !isCurrentPage(i + 1),
                                        "bg-blue-500 hover:bg-blue-600 text-white":
                                            isCurrentPage(i + 1),
                                    })}
                                    `}
                            >
                                {i + 1}
                            </Link>
                        </li>
                    ))
                )}
                <NextLink
                    isLastPage={isLastPage}
                    handlePrevPage={handleNextPage}
                />
            </ul>
        </nav>
    );
};
