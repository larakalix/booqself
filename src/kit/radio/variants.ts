import { cva } from "class-variance-authority";

export const radioVariants = cva("flex gap-4", {
    variants: {
        flex: {
            vertical: "flex-col",
            horizontal: "flex-row",
        },
    },
    defaultVariants: {
        flex: "vertical",
    },
});
