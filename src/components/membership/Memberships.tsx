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
import { useAuthStore } from "@/stores/authStore";
import { GenericTableHead } from "../generic";
import type { IMeta } from "@/types/models/generic";
import type { IMembership } from "@/types/models/membership";

export const Memberships = ({
    data: memberships,
}: {
    data: IMembership[];
    meta: IMeta;
}) => {
    const { params } = useAuthStore((state) => state);

    return (
        <Card className="relative w-full text-left ring-1 bg-white shadow border-blue-500 ring-gray-200 p-6 rounded-md">
            <Title className="text-gray-700 text-lg font-medium">
                Memberships
            </Title>

            <Table className="mt-5">
                <GenericTableHead
                    headers={["Name", "Price", "Tier color", ""]}
                />
                <TableBody className="align-top overflow-x-auto divide-y divide-gray-200">
                    {Children.toArray(
                        memberships.map((membership) => (
                            <TableRow>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <div className="flex flex-col">
                                        <Text className="flex items-center gap-1 text-sm text-gray-500">
                                            {membership.name}
                                        </Text>
                                    </div>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <div className="flex flex-col">
                                        <Text className="flex items-center gap-1 text-sm text-gray-500">
                                            USD {membership.price}
                                        </Text>
                                    </div>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <span
                                        className="w-14 h-14 rounded-md flex items-center justify-center hover:opacity-80 transition-opacity ring-0 hover:ring-2 hover:ring-gray-200"
                                        style={{
                                            backgroundColor: membership.tier,
                                        }}
                                    ></span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        {/* <Link
                                            href={`/booking/${params?.merchant_id}/${appointment.id}`}
                                            target="_blank"
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            <HiPencil />
                                        </Link> */}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};
