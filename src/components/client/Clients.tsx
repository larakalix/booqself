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
import { HiOutlinePhone } from "react-icons/hi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { GenericTableHead } from "../generic/GenericTableHead";
import type { IClient } from "@/types/models/client";
import type { IMeta } from "@/types/models/generic";

export const Clients = ({
    data: clients,
    meta,
}: {
    data: IClient[];
    meta?: IMeta;
}) => {
    if (!clients || clients?.length === 0) return null;

    return (
        <Card className="relative w-full text-left ring-1 bg-white shadow border-blue-500 ring-gray-200 p-6 rounded-md">
            <Title className="text-gray-700 text-lg font-medium">
                List of patients
            </Title>
            <Table className="mt-5">
                <GenericTableHead
                    headers={[
                        "First Name",
                        "Last Name",
                        "Email",
                        "Phone",
                        "Actions",
                    ]}
                />
                <TableBody className="align-top overflow-x-auto divide-y divide-gray-200">
                    {Children.toArray(
                        clients.map((client) => (
                            <TableRow>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{client.firstName}</Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{client.lastName}</Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    {Children.toArray(
                                        client.emailAddressesList.map(
                                            ({
                                                emailAddress,
                                                primaryEmail,
                                            }) => (
                                                <Text className="flex items-center gap-2">
                                                    {primaryEmail ? (
                                                        <AiOutlineCheckCircle className="inline-block text-green-500" />
                                                    ) : (
                                                        <AiOutlineCheckCircle className="inline-block text-gray-300" />
                                                    )}
                                                    {emailAddress}
                                                </Text>
                                            )
                                        )
                                    )}
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    {Children.toArray(
                                        client.phoneNumbersList.map(
                                            ({ phoneNumber }) => (
                                                <Text className="flex items-center gap-2">
                                                    <HiOutlinePhone className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                    {phoneNumber}
                                                </Text>
                                            )
                                        )
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
