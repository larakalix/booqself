import { InputHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/utils";

const textareaVariants = cva(
    "flex items-center border p-4 rounded-lg bg-white disabled:cursor-not-allowed disabled:bg-grey-4/70",
    {
        variants: {
            variant: {
                primary:
                    "border-gray-border text-black-accent placeholder-gray-2 hover:border-blue-accent focus:border-blue-accent",
                error: "border-red-accent text-black-accent placeholder-gray-2 hover:border-red-accent focus:border-red-accent",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    }
);

export type InputProps = InputHTMLAttributes<HTMLTextAreaElement> &
    VariantProps<typeof textareaVariants> & {};

const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
    ({ className, children, variant, size, ...props }, ref) => {
        const _className = cn(textareaVariants({ variant, className }));

        return <textarea className={_className} ref={ref} {...props} />;
    }
);

TextArea.displayName = "Textarea";

export { TextArea, textareaVariants };
