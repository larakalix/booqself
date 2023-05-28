import { forwardRef, useId } from "react";
import * as UiCheckbox from "@radix-ui/react-checkbox";
import { BsCheck } from "react-icons/bs";
import { cn } from "@/utils/utils";

import type { CheckboxProps } from "./types";

const Checkbox = forwardRef<
    React.ElementRef<typeof UiCheckbox.Root>,
    CheckboxProps
>(({ className, children, ...props }, ref) => {
    const id = useId();

    return (
        <div className={cn("flex items-center justify-center gap-2")}>
            <UiCheckbox.Root
                ref={ref}
                className={cn(
                    "peer h-4 w-4 shrink-0 rounded-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
                    className
                )}
                id={id}
                {...props}
            >
                <UiCheckbox.Indicator
                    className={cn("flex items-center justify-center")}
                >
                    <BsCheck className="h-4 w-4 text-black-accent" />
                </UiCheckbox.Indicator>
            </UiCheckbox.Root>
            <label className="Label" htmlFor={id}>
                {children}
            </label>
        </div>
    );
});

Checkbox.displayName = UiCheckbox.Root.displayName;

export { Checkbox };
