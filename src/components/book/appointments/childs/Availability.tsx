import { Children } from "react";
import { format, parseISO } from "date-fns";
import type { IFlatAppointment } from "@/types/models/appointment";

export const Availability = ({
    selectedDay,
    appointments,
}: {
    selectedDay: Date;
    appointments: IFlatAppointment[];
}) => {
    return (
        <ul className="w-full mt-4 space-y-4 text-sm leading-6 text-gray-500 border-t border-gray-300 pt-8 text-center">
            {appointments.length > 0 ? (
                Children.toArray(
                    appointments
                        .filter((appointment) =>
                            appointment.appointmentDay.startsWith(
                                format(selectedDay, "yyyy-MM-dd")
                            )
                        )
                        .map((appointment) => (
                            <li>
                                <time dateTime={appointment.appointmentDay}>
                                    {format(
                                        parseISO(appointment.appointmentDay),
                                        "h:mma, EEEE, MMMM d, yyyy"
                                    )}
                                </time>
                            </li>
                        ))
                )
            ) : (
                <li>No appointments for today.</li>
            )}
        </ul>
    );
};
