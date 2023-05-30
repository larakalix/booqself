import { Children } from "react";
import {
    Card,
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
    Title,
} from "@tremor/react";
import {
    AiOutlineCheckCircle,
    AiOutlineExclamationCircle,
} from "react-icons/ai";
import type { IMeta } from "@/types/strapi/generic";
import type { IClient } from "@/types/models/clients";
import Link from "next/link";

export const Results = ({ clients }: { clients: IClient[]; meta: IMeta }) => {
    if (!clients || clients.length === 0) return null;

    return (
        <Card className="relative w-full text-left ring-1 bg-white shadow border-blue-500 ring-gray-200 p-6 rounded-md">
            <Title className="text-gray-700 text-lg font-medium">
                List of patients registered in the system
            </Title>
            <Table className="mt-5">
                <TableHead className="text-left text-gray-500 font-semibold">
                    <TableRow>
                        {Children.toArray(
                            [
                                "Name",
                                "Last Name",
                                "Email",
                                "Phone",
                                "Contract",
                                "Actions",
                            ].map((label) => (
                                <TableHeaderCell className="sticky whitespace-nowrap text-left text-gray-500 top-0 px-4 py-3.5 font-semibold">
                                    {label}
                                </TableHeaderCell>
                            ))
                        )}
                    </TableRow>
                </TableHead>
                <TableBody className="align-top overflow-x-auto divide-y divide-gray-200">
                    {Children.toArray(
                        clients.map((client) => (
                            <TableRow>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    {client.name}
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{client.lastName}</Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{client.email}</Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{client.phone}</Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    {client.id === 1 ? (
                                        <span className="flex items-center gap-2 text-sm whitespace-nowrap">
                                            <AiOutlineCheckCircle className="text-green-500" />{" "}
                                            Contract uploaded
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2 text-sm whitespace-nowrap">
                                            <AiOutlineExclamationCircle className="text-yellow-500" />{" "}
                                            No contract yet
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Link href={`/client/${client.id}`}>
                                        <Text color="blue">View details</Text>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};
