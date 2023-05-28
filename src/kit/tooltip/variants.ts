import { cva } from "class-variance-authority";

// px-[15px] py-[10px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]

export const tooltipVariants = cva(
    `
        data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade
        data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade
        leading-none rounded-lg select-none text-black-accent border text-heading-5 will-change-[transform,opacity] shadow-sm
        py-4 px-9
    `,
    {
        variants: {
            variant: {
                primary: "bg-gray-4 border-gray-4 text-black-accent",
                secondary: "bg-black-accent border-black-accent text-white",
            },
            size: {
                medium: "",
                large: "",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "medium",
        },
    }
);
