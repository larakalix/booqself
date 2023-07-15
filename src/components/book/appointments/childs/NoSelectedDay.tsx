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

            <h2 className="text-center mb-4 text-lg md:text-xl lg:text-2xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
                Select a day to book an appointment.
            </h2>
        </div>
    );
};
