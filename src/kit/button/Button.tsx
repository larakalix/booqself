import { forwardRef } from "react";
import { cn } from "@/utils/utils";
import { ButtonProps } from "./types";

import { buttonVariants } from "./variants";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, variant, size, ...props }, ref) => {
        const _className = cn(buttonVariants({ variant, size, className }));

        return (
            <button className={_className} ref={ref} {...props}>
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
