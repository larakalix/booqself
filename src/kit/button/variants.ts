import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    "flex items-center justify-center rounded-lg disabled:cursor-not-allowed disabled:bg-grey-4/70",
    {
        variants: {
            variant: {
                primary:
                    "text-white bg-blue-accent border border-blue-accent hover:bg-blue-hover focus:bg-blue-pressed",
                secondary:
                    "text-black-accent bg-white border border-gray-border hover:bg-gray-4 hover:border-gray-4 focus:bg-gray-pressed",
            },
            size: {
                medium: "py-3 px-6",
                large: "py-4 px-8",
                extraLarge: "py-6 px-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "medium",
        },
    }
);
