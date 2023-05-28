import * as RadioGroup from "@radix-ui/react-radio-group";
import { ICommon, IValue } from "../types/generic";
import { VariantProps } from "class-variance-authority";
import { radioVariants } from "./variants";

interface RadioItem extends ICommon, IValue<string> {}

export type RadioGroupProps = React.ComponentPropsWithoutRef<
    typeof RadioGroup.Root
> &
    VariantProps<typeof radioVariants> & {
        options: RadioItem[];
    };
