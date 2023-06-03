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
import { HiOutlineMail, HiOutlinePhone, HiOutlineUser } from "react-icons/hi";
import { AiOutlineCheckCircle, AiOutlineFieldTime } from "react-icons/ai";
import { format, isPast } from "date-fns";
import { GenericTableHead } from "../generic/GenericTableHead";
import type { ITenantAppointmentBoilerplate } from "@/types/models/tenant";

type Props = ITenantAppointmentBoilerplate & {
    showFooter?: boolean;
};

export const Appointments = ({
    data: appointments,
    meta,
    showFooter = false,
}: Props) => {
    return (
        <Card className="relative w-full text-left ring-1 bg-white shadow border-blue-500 ring-gray-200 p-6 rounded-md">
            <Title className="text-gray-700 text-lg font-medium">
                Appointments
            </Title>

            <Table className="mt-5">
                <GenericTableHead
                    headers={["Client", "Employee", "Service", "Status"]}
                />
                <TableBody className="align-top overflow-x-auto divide-y divide-gray-200">
                    {Children.toArray(
                        appointments.map((appointment) => (
                            <TableRow>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <div className="flex flex-col">
                                        <Text className="flex items-center gap-1 text-sm text-gray-500">
                                            <HiOutlineUser className="text-gray-800" />
                                            {appointment.name}
                                        </Text>
                                        <Text className="flex items-center gap-1 text-sm text-gray-500">
                                            <HiOutlineMail className="text-gray-800" />
                                            {appointment.email}
                                        </Text>
                                    </div>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    {appointment.employee ? (
                                        <div className="flex flex-col">
                                            <Text className="flex items-center gap-1 text-sm text-gray-500">
                                                <HiOutlineUser className="text-gray-800" />
                                                {appointment.employee.name}{" "}
                                                {appointment.employee
                                                    ?.nickname &&
                                                    `(${appointment.employee?.nickname})`}
                                            </Text>
                                            <Text className="flex items-center gap-1 text-sm text-gray-500">
                                                <HiOutlineMail className="text-gray-800" />
                                                {appointment.employee.email}
                                            </Text>
                                        </div>
                                    ) : (
                                        <span>No employee</span>
                                    )}
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>
                                        {appointment.service ? (
                                            <div className="flex flex-col">
                                                <span className="flex items-center gap-1">
                                                    {appointment.service.name}
                                                </span>
                                            </div>
                                        ) : (
                                            <span>No service</span>
                                        )}
                                    </Text>
                                </TableCell>
                                {/* <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text className="text-ellipsis overflow-hidden max-w-[15rem]">
                                        {appointment.comment
                                            ? appointment.comment
                                            : "No comments"}
                                    </Text>
                                </TableCell> */}
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    {isPast(
                                        new Date(appointment.appointmentDay)
                                    ) ? (
                                        <span className="flex items-center gap-2 text-sm whitespace-nowrap">
                                            <AiOutlineCheckCircle className="text-green-500" />{" "}
                                            Done on{" "}
                                            {format(
                                                new Date(
                                                    appointment.appointmentDay
                                                ),
                                                "dd/MM/yyyy"
                                            )}
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2 text-sm whitespace-nowrap">
                                            <AiOutlineFieldTime className="text-blue-500" />{" "}
                                            Upcoming at{" "}
                                            {format(
                                                new Date(
                                                    appointment.appointmentDay
                                                ),
                                                "dd/MM/yyyy"
                                            )}
                                        </span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {showFooter && (
                <footer className="w-full py-4 text-center">
                    <Link href="/dashboard/appointments">
                        <Text color="blue">View more</Text>
                    </Link>
                </footer>
            )}
        </Card>
    );
};
