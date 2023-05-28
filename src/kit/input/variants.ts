import { cva } from "class-variance-authority";

export const inputVariants = cva(
    "flex items-center border py-3 rounded-lg bg-white disabled:cursor-not-allowed disabled:bg-grey-4/70",
    {
        variants: {
            variant: {
                primary:
                    "border-gray-border text-black-accent placeholder-gray-2 hover:border-blue-accent focus:border-blue-accent",
                error: "border-red-accent text-black-accent placeholder-gray-2 hover:border-red-accent focus:border-red-accent",
            },
            size: {
                medium: "p-4",
                large: "py-4 px-8",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "medium",
        },
    }
);
