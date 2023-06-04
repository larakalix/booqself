import { Children } from "react";
import { intlFormat } from "date-fns";
import type { IFlatAppointment } from "@/types/models/appointment";

export const Availability = ({
    appointments,
}: {
    appointments: IFlatAppointment[];
}) => {
    return (
        <ol className="w-full mt-4 space-y-1 text-sm leading-6 text-gray-500 border-t border-gray-300 pt-8 text-center">
            {appointments.length > 0 ? (
                Children.toArray(
                    appointments.map((appointment) => (
                        <>
                            <h1>
                                Appointment at{" "}
                                {intlFormat(
                                    new Date(appointment.appointmentDay),
                                    {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    },
                                    {
                                        locale: "en-US",
                                    }
                                )}
                            </h1>
                        </>
                    ))
                )
            ) : (
                <p>No appointments for today.</p>
            )}
        </ol>
    );
};
