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
import { AiOutlineCheckCircle, AiOutlineFieldTime } from "react-icons/ai";
import { format, isPast } from "date-fns";
import { GenericTableHead } from "../generic/GenericTableHead";
import type { IAppointment } from "@/types/models/appointment";
import type { IMeta } from "@/types/strapi/generic";

export const Appointments = ({
    appointments,
}: {
    appointments: IAppointment[];
    meta: IMeta;
}) => {
    return (
        <Card className="relative w-full text-left ring-1 bg-white shadow border-blue-500 ring-gray-200 p-6 rounded-md">
            <Title className="text-gray-700 text-lg font-medium">
                Appointments
            </Title>
            <Table className="mt-5">
                <GenericTableHead
                    headers={["Name", "Email", "Comments", "Status"]}
                />
                <TableBody className="align-top overflow-x-auto divide-y divide-gray-200">
                    {Children.toArray(
                        appointments.map((appointment) => (
                            <TableRow>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{appointment.name}</Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text>{appointment.email}</Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Text className="text-ellipsis overflow-hidden max-w-[15rem]">
                                        {appointment.comment
                                            ? appointment.comment
                                            : "No comments"}
                                    </Text>
                                </TableCell>
                                <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    {isPast(
                                        new Date(appointment.appointmentDay)
                                    ) ? (
                                        <span className="flex items-center gap-2 text-sm whitespace-nowrap">
                                            <AiOutlineCheckCircle className="text-green-500" />{" "}
                                            Done
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
                                {/* <TableCell className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                    <Link
                                        href={`/appointment/${appointment.id}`}
                                    >
                                        <Text color="blue">View details</Text>
                                    </Link>
                                </TableCell> */}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <footer className="w-full py-4 text-center">
                <Link href="/dashboard/appointments">
                    <Text color="blue">View more</Text>
                </Link>
            </footer>
        </Card>
    );
};
