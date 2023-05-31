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
        const timeLabel = new Date(currentTime).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        });

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
    const [hours, minutes] = timeValue
        .split(":")
        .map((part) => parseInt(part, 10));

    const mergedDateTime = set(date, { hours, minutes });

    return mergedDateTime;
};

export const formatToISO = (date: Date): string => {
    return format(date, "yyyy-MM-dd'T'HH:mm");
};
