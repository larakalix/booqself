import { Children } from "react";
import { Card } from "@/kit/card/Card";
import { formatDistanceToNow } from "date-fns";
import { Text } from "@tremor/react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineClock } from "react-icons/hi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AppointmentList } from "./childs";
import type { IClient } from "@/types/models/client";
import type { IAppointment } from "@/types/models/appointment";

type Props = { client: IClient; appointments: IAppointment[] };

export const ClientSummary = ({ client, appointments }: Props) => {
    return (
        <section className="flex flex-col">
            <header className="bg-white w-full lg:flex lg:items-center lg:justify-between p-8 border-b border-gray-200">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        {client.firstName} {client.lastName}
                    </h2>
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <HiOutlineMail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {Children.toArray(
                                client.emailAddressesList.map(
                                    ({ emailAddress, primaryEmail }) => (
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
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
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
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <HiOutlineClock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            Registered{" "}
                            {formatDistanceToNow(new Date(client.createdAt))}{" "}
                            ago
                        </div>
                    </div>
                </div>
            </header>
            <div className="flex gap-4 w-full p-8 bg-gray-100">
                <Card className="p-8">
                    <AppointmentList appointments={appointments} />
                </Card>
            </div>
        </section>
    );
};
