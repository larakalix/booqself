import Image from "next/image";
import { BsCalendar3 } from "react-icons/bs";
import { format, parseISO } from "date-fns";
import type { IFormAppointment } from "@/types/models/appointment";
import type { ITenantBooking } from "@/types/models/tenant";

type Props = {
    appointment: IFormAppointment;
    boilerplate: ITenantBooking;
};

export const Success = ({ appointment, boilerplate }: Props) => {
    const employee = boilerplate.employees.elements.find(
        (employee) => `${employee.id}` === appointment.cloverEmployeeId!
    );
    const service = boilerplate.services.elements.find(
        (service) => `${service.id}` === appointment.cloverServiceId!
    );

    return (
        <div className="flex items-center justify-center flex-col gap-8 p-5 border-t border-l-0 md:border-t-0 md:border-l border-gray-300">
            <header className="flex flex-col items-center w-full max-w-[70%] text-center border-b border-gray-100 pb-4 px-8">
                <Image
                    src="/icon/checkmark.webp"
                    width={80}
                    height={80}
                    alt="Successfull appointment booking"
                    loading="lazy"
                />

                <h1 className="font-bold text-black">Confirmed</h1>
                <h2 className="font-normal text-gray-900">
                    {boilerplate?.appointment
                        ? "Your appointment has been rescheduled."
                        : "Your appointment has been booked."}
                </h2>
            </header>

            <ul className="flex flex-col gap-2 text-base text-gray-600 text-center px-8">
                <li className="flex items-center justify-center gap-2">
                    <BsCalendar3 />
                    <time dateTime={appointment.appointmentDay}>
                        {format(
                            parseISO(appointment.appointmentDay),
                            "h:mma, EEEE, MMMM d, yyyy"
                        )}
                    </time>
                </li>
                <li>
                    <p>
                        Thank you for booking an appointment with us. We have
                        {boilerplate?.appointment ? "rescheduled" : "scheduled"}
                        {employee && ` with ${employee?.name}`}, for{" "}
                        {service?.name}. An email confirmation will be sent to
                        you shortly.
                    </p>
                    <p>
                        Looking forward to seeing you soon {appointment.name}!
                    </p>
                </li>
            </ul>
        </div>
    );
};
