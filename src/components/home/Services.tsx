import { Children } from "react";
import {
    Card,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Text,
    Title,
} from "@tremor/react";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { GenericTableHead } from "../generic/GenericTableHead";
import type { IService } from "@/types/models/service";
import type { IMeta } from "@/types/models/generic";

export const Services = ({
    data: services,
    meta,
}: {
    data: IService[];
    meta?: IMeta;
}) => {
    return (
        <Card className="relative w-full text-left ring-1 bg-white shadow border-blue-500 ring-gray-200 p-6 rounded-md">
            <Title className="text-gray-700 text-lg font-medium">
                Services
            </Title>

            <Table className="mt-5">
                <GenericTableHead
                    headers={["Name", "Price", "Cost", "Price Type", "Status"]}
                />

                <TableBody className="align-top overflow-x-auto divide-y divide-gray-200">
                    {Children.toArray(
                        services.map((service) => (
                            <TableRow>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{service.name}</Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>${service.parsedPrice}</Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{service.cost}</Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{service.priceType}</Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    {service.available ? (
                                        <Text className="text-green-500">
                                            Available
                                        </Text>
                                    ) : (
                                        <Text className="text-gray-300">
                                            Unavailable
                                        </Text>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};
