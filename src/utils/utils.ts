import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const downloadImage = (imageDataUrl: string, filename: string) => {
    const a = document.createElement("a");
    a.href = imageDataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

export const appendQueryParams = (
    url: string,
    queryParams: Record<string, any>
): string => {
    const urlObj = new URL(url);

    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "")
            urlObj.searchParams.append(key, String(value));
    });

    return urlObj.toString();
};
