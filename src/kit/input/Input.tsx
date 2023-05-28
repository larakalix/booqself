import { forwardRef } from "react";
import { cn } from "@/utils/utils";
import { InputProps } from "./types";
import { inputVariants } from "./variants";

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, children, variant, size, ...props }, ref) => {
        const _className = cn(inputVariants({ variant, size, className }));

        return <input className={_className} ref={ref} {...props} />;
    }
);

Input.displayName = "Input";

export { Input, inputVariants };
