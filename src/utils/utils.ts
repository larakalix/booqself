import { ClassValue, clsx } from "clsx";
import { Attachment } from "nodemailer/lib/mailer";
import { Readable } from "stream";
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
