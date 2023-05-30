import { Children } from "react";
import { TableHead, TableHeaderCell, TableRow } from "@tremor/react";

export const GenericTableHead = ({ headers }: { headers: string[] }) => {
    return (
        <TableHead className="text-left text-gray-500 font-semibold">
            <TableRow>
                {Children.toArray(
                    headers.map((label) => (
                        <TableHeaderCell className="sticky whitespace-nowrap text-left text-gray-500 top-0 px-4 py-3.5 font-semibold">
                            {label}
                        </TableHeaderCell>
                    ))
                )}
            </TableRow>
        </TableHead>
    );
};
