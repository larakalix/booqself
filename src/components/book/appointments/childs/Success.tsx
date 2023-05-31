import { BsCalendar3 } from "react-icons/bs";
import type { IEntity } from "@/types/strapi/generic";
import type { AppointmentAttributes } from "@/types/strapi/appointments";
import { format, parseISO } from "date-fns";

type Props = {
    appointment: IEntity<AppointmentAttributes>;
};

export const Success = ({ appointment }: Props) => {
    return (
        <div className="flex items-center justify-center flex-col gap-8 p-5 border-t border-l-0 md:border-t-0 md:border-l border-gray-300">
            <header className="w-full max-w-[70%] text-center border-b border-gray-100 pb-4 px-8">
                <h1 className="font-bold text-black">Confirmed</h1>
                <h2 className="font-normal text-gray-900">
                    Your appointment has been booked.
                </h2>
            </header>

            <ul className="text-base text-gray-600">
                <li className="flex items-center gap-2">
                    <BsCalendar3 />
                    <time dateTime={appointment.attributes.appointmentDay}>
                        {format(
                            parseISO(appointment.attributes.appointmentDay),
                            "h:mma, EEEE, MMMM d, yyyy"
                        )}
                    </time>
                </li>
            </ul>

            <p className="text-gray-800 font-bold">
                We will send you an email confirmation shortly.
            </p>
        </div>
    );
};
