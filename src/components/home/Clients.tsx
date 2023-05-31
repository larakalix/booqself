import { Children } from "react";
import Link from "next/link";
import {
    Card,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Text,
    Title,
} from "@tremor/react";
import {
    AiOutlineCheckCircle,
    AiOutlineExclamationCircle,
} from "react-icons/ai";
import { GenericTableHead } from "../generic/GenericTableHead";
import type { IMeta } from "@/types/strapi/generic";
import type { IClient } from "@/types/models/clients";

export const Clients = ({ clients }: { clients: IClient[]; meta: IMeta }) => {
    if (!clients || clients.length === 0) return null;

    return (
        <Card className="relative w-full text-left ring-1 bg-white shadow border-blue-500 ring-gray-200 p-6 rounded-md">
            <Title className="text-gray-700 text-lg font-medium">
                List of patients
            </Title>
            <Table className="mt-5">
                <GenericTableHead
                    headers={[
                        "Name",
                        "Last Name",
                        "Email",
                        "Phone",
                        "Contract",
                        "Actions",
                    ]}
                />
                <TableBody className="align-top overflow-x-auto divide-y divide-gray-200">
                    {Children.toArray(
                        clients.map((client) => (
                            <TableRow>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{client.name}</Text>
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
                                    <Link
                                        href={`/dashboard/summary/${client.id}`}
                                    >
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
