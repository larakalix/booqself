import { Children } from "react";
import { format, intlFormat } from "date-fns";
import type { IFlatAppointment } from "@/types/models/appointment";

export const Availability = ({
    selectedDay,
    appointments,
}: {
    selectedDay: Date;
    appointments: IFlatAppointment[];
}) => {
    return (
        <ol className="w-full mt-4 space-y-1 text-sm leading-6 text-gray-500 border-t border-gray-300 pt-8 text-center">
            {appointments.length > 0 ? (
                Children.toArray(
                    appointments
                        .filter((appointment) =>
                            appointment.appointmentDay.startsWith(
                                format(selectedDay, "yyyy-MM-dd")
                            )
                        )
                        .map((appointment) => (
                            <h1>
                                {intlFormat(
                                    new Date(appointment.appointmentDay),
                                    {
                                        month: "long",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                    },
                                    {
                                        locale: "en-US",
                                    }
                                )}
                            </h1>
                        ))
                )
            ) : (
                <p>No appointments for today.</p>
            )}
        </ol>
    );
};
