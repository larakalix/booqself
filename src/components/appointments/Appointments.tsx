import { Children } from "react";
import Link from "next/link";
import {
    Card,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Text,
} from "@tremor/react";
import {
    HiOutlineMail,
    HiOutlineUser,
    HiOutlinePhone,
    HiPencil,
} from "react-icons/hi";
import { AiOutlineCheckCircle, AiOutlineFieldTime } from "react-icons/ai";
import { format, isPast, parseISO } from "date-fns";
import { GenericTableHead } from "../generic/GenericTableHead";
import { useAuthStore } from "@/stores/authStore";
import { Pagination } from "../generic";
import { ROUTES } from "@/ constants/routes";
import type { ITenantBoilerplateChunk } from "@/types/models/tenant";
import type { IAppointment } from "@/types/models/appointment";

export const Appointments = ({
    data: appointments,
    meta,
}: ITenantBoilerplateChunk<IAppointment>) => {
    const { params } = useAuthStore((state) => state);

    return (
        <Card className="relative w-full text-left ring-1 bg-white shadow border-blue-500 ring-gray-200 p-6 rounded-md">
            <Table className="mt-5">
                <GenericTableHead
                    headers={["Client", "Employee", "Service", "Status", ""]}
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
                                        <Text className="flex items-center gap-1 text-sm text-gray-500">
                                            <HiOutlinePhone className="text-gray-800" />
                                            {appointment.phone}
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
                                    {appointment.service ? (
                                        <Text className="flex flex-col">
                                            <span className="flex items-center gap-1">
                                                {appointment.service.name}
                                            </span>
                                        </Text>
                                    ) : (
                                        <span>No service</span>
                                    )}
                                </TableCell>
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
                                            <time
                                                dateTime={
                                                    appointment.appointmentDay
                                                }
                                            >
                                                {format(
                                                    parseISO(
                                                        appointment.appointmentDay
                                                    ),
                                                    "h:mma, EEEE, MMMM d, yyyy"
                                                )}
                                            </time>
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {!isPast(
                                        new Date(appointment.appointmentDay)
                                    ) ? (
                                        <div className="flex items-center gap-4">
                                            <Link
                                                href={`/booking/${params?.merchant_id}/${appointment.id}`}
                                                target="_blank"
                                                className="text-blue-500 hover:text-blue-600"
                                            >
                                                <HiPencil />
                                            </Link>
                                        </div>
                                    ) : (
                                        <span></span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <div className="w-full flex items-center justify-center mt-4">
                <Pagination
                    pagination={meta.pagination}
                    rootRoute={ROUTES.APPOINTMENTS}
                />
            </div>
        </Card>
    );
};
