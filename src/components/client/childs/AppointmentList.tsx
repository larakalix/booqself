import { Children } from "react";
import { List, ListItem, Subtitle, Text } from "@tremor/react";
import { format, formatDistanceToNow } from "date-fns";
import type { IAppointment } from "@/types/models/appointment";

export const AppointmentList = ({
    appointments,
}: {
    appointments: IAppointment[];
}) => {
    if (!appointments || appointments.length === 0) {
        return (
            <div className="flex items-center justify-center">
                <Text>No appointments found</Text>
            </div>
        );
    }

    return (
        <List>
            {Children.toArray(
                appointments.map((appointment) => (
                    <ListItem className="flex items-center justify-start">
                        <div className="flex flex-col gap-2 w-full py-2">
                            <h5 className="text-sm">
                                {appointment.name} scheduled at{" "}
                                <span className="font-semibold italic">
                                    {format(
                                        new Date(appointment.appointmentDay),
                                        "dd/MM/yyyy"
                                    )}
                                </span>
                                ,{" "}
                                {formatDistanceToNow(
                                    new Date(appointment.appointmentDay)
                                )}{" "}
                                ago
                            </h5>

                            <Subtitle className="text-gray-800 font-semibold mt-4">
                                Comments
                            </Subtitle>
                            <p className="break-words whitespace-normal w-full">
                                {appointment.comment
                                    ? appointment.comment
                                    : "No comments"}
                            </p>
                        </div>
                    </ListItem>
                ))
            )}
        </List>
    );
};
