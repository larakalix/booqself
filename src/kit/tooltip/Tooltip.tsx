import { forwardRef, useId } from "react";
import * as UiTooltip from "@radix-ui/react-tooltip";
import { cn } from "@/utils/utils";
import { TooltipProps } from "./types";
import { tooltipVariants } from "./variants";

const Tooltip = forwardRef<
    React.ComponentPropsWithRef<typeof UiTooltip.Root>,
    TooltipProps
>(({ className, variant, tooltipRender, children, ...props }) => {
    const id = useId();
    const _className = cn(tooltipVariants({ variant, className }));

    return (
        <UiTooltip.Provider>
            <UiTooltip.Root {...props}>
                <UiTooltip.Trigger asChild>
                    <button>{children}</button>
                </UiTooltip.Trigger>
                <UiTooltip.Portal id={id}>
                    <UiTooltip.Content className={_className} sideOffset={5}>
                        {tooltipRender}
                    </UiTooltip.Content>
                </UiTooltip.Portal>
            </UiTooltip.Root>
        </UiTooltip.Provider>
    );
});

Tooltip.displayName = UiTooltip.Root.displayName;

export { Tooltip, tooltipVariants };
