import { forwardRef, useId } from "react";
import * as UiSwitch from "@radix-ui/react-switch";
import { cn } from "@/utils/utils";
import { SwitchProps } from "./types";
import { switchVariants } from "./variants";

const Switch = forwardRef<
    React.ComponentPropsWithRef<typeof UiSwitch.Root>,
    SwitchProps
>(({ variant, className, label, ...props }) => {
    const id = useId();
    const _className = cn(switchVariants({ variant, className }));

    return (
        <UiSwitch.Root id={id} className={_className} {...props}>
            <UiSwitch.Thumb className="border border-gray-3 bg-gray-3 block w-[1.125rem] h-[1.125rem] rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-full data-[state=checked]:bg-white" />
        </UiSwitch.Root>
    );
});

Switch.displayName = UiSwitch.Root.displayName;

export { Switch, switchVariants };
