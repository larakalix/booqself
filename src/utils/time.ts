import { set, format } from "date-fns";

export const generateTimeArray = <T extends { label: string; value: string }>(
    startTime: string,
    endTime: string,
    intervalMinutes: number
): T[] => {
    const options: T[] = [];

    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);

    const intervalMilliseconds = intervalMinutes * 60 * 1000;
    let currentTime = start.getTime();

    while (currentTime <= end.getTime()) {
        const timeValue = new Date(currentTime).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

        options.push({
            value: `time${options.length + 1}`,
            label: timeValue,
        } as T);
        currentTime += intervalMilliseconds;
    }

    return options;
};

export const mergeTimeWithDate = (timeValue: string, date: Date): Date => {
    const [hoursStr, minutesStr, period] = timeValue.split(/:|\s(?=(?:AM|PM))/);
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (period.toUpperCase() === "PM" && hours !== 12) {
        return set(date, { hours: hours + 12, minutes });
    } else if (period.toUpperCase() === "AM" && hours === 12) {
        return set(date, { hours: 0, minutes });
    } else {
        return set(date, { hours, minutes });
    }
};

export const formatToISO = (date: Date): string => {
    return format(date, "yyyy-MM-dd'T'HH:mm");
};
