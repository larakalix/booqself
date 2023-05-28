import * as UiTooltip from "@radix-ui/react-tooltip";
import { VariantProps } from "class-variance-authority";
import { tooltipVariants } from "./variants";

export type TooltipProps = React.ComponentPropsWithoutRef<
    typeof UiTooltip.Root
> &
    VariantProps<typeof tooltipVariants> & {
        children: React.ReactNode;
        tooltipRender: React.ReactNode;
        className?: string;
    };
