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
import type { IEmployee } from "@/types/models/employee";
import type { IMeta } from "@/types/models/generic";

export const Employees = ({
    data: employees,
    meta,
}: {
    data: IEmployee[];
    meta?: IMeta;
}) => {
    return (
        <Card className="relative w-full text-left ring-1 bg-white shadow border-blue-500 ring-gray-200 p-6 rounded-md">
            <Title className="text-gray-700 text-lg font-medium">
                Employees
            </Title>

            <Table className="mt-5">
                <GenericTableHead
                    headers={["Name", "Nickname", "Pin", "Custom ID", "Role"]}
                />
                <TableBody className="align-top overflow-x-auto divide-y divide-gray-200">
                    {Children.toArray(
                        employees.map((employee) => (
                            <TableRow>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <div className="flex flex-col">
                                        <Text className="flex items-center gap-1 text-sm text-gray-500">
                                            <HiOutlineUser className="text-gray-800" />
                                            {employee.name}
                                        </Text>
                                        <Text className="flex items-center gap-1 text-sm text-gray-500">
                                            <HiOutlineMail className="text-gray-800" />
                                            {employee.email}
                                        </Text>
                                    </div>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{employee.nickname}</Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{employee.pin}</Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{employee.customId}</Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{employee.role}</Text>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};
