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
import type { IOrder } from "@/types/models/order";
import type { IMeta } from "@/types/models/generic";

export const Orders = ({
    data: orders,
    meta,
}: {
    data: IOrder[];
    meta?: IMeta;
}) => {
    return (
        <Card className="relative w-full text-left ring-1 bg-white shadow border-blue-500 ring-gray-200 p-6 rounded-md">
            <Title className="text-gray-700 text-lg font-medium">Orders</Title>

            <Table className="mt-5">
                <GenericTableHead
                    headers={["Title", "Total", "Items", "Payment State"]}
                />
                <TableBody className="align-top overflow-x-auto divide-y divide-gray-200">
                    {Children.toArray(
                        orders.map((order) => (
                            <TableRow>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{order.title}</Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text className="flex items-center gap-1">
                                        {order.currency}
                                        {order.parsedTotal}
                                    </Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    {order.itemList?.length > 0 &&
                                        Children.toArray(
                                            order.itemList.map(
                                                ({ parsedPrice, name }) => (
                                                    <Text className="flex items-center gap-1">
                                                        <span>
                                                            {order.currency}
                                                            {parsedPrice}
                                                        </span>
                                                        {name}
                                                    </Text>
                                                )
                                            )
                                        )}
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{order.paymentState}</Text>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};
