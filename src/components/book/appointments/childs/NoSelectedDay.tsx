import Image from "next/image";

export const NoSelectedDay = () => {
    return (
        <div className="flex items-center justify-center flex-col gap-2 p-5 border-t border-l-0 md:border-t-0 md:border-l border-gray-300">
            <Image
                src="/icon/calendar.webp"
                width={80}
                height={80}
                alt="No selected day"
                loading="lazy"
            />

            <h2 className="font-semibold text-gray-900 text-base md:text-xl">
                Select a day to book an appointment.
            </h2>
        </div>
    );
};
