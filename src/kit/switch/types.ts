import * as UiSwitch from "@radix-ui/react-switch";
import { VariantProps } from "class-variance-authority";
import { switchVariants } from "./variants";

export type SwitchProps = React.ComponentPropsWithoutRef<typeof UiSwitch.Root> &
    VariantProps<typeof switchVariants> & {
        label: string;
    };
