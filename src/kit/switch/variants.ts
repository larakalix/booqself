import { cva } from "class-variance-authority";

export const switchVariants = cva(
    "w-[2.5rem] h-[1.5rem] border border-gray-border bg-white rounded-full relative data-[state=checked]:bg-blue-accent outline-none cursor-default",
    {
        variants: {
            variant: {
                blue: "data-[state=checked]:bg-blue-accent",
                green: "data-[state=checked]:bg-green-500",
            },
        },
        defaultVariants: {
            variant: "blue",
        },
    }
);
