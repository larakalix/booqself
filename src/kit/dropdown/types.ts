import * as Select from "@radix-ui/react-select";
import { ICommon, IValue } from "../types/generic";

type CheckAlign = "left" | "right";

export interface IIndicatorAlign {
    alignIndicator: CheckAlign;
}

export interface DropdownItem extends ICommon, IValue<string> {
    childs?: DropdownItem[];
}

export type DrondownProps = React.ComponentPropsWithRef<typeof Select.Root> &
    Partial<IIndicatorAlign> & {
        options: DropdownItem[];
        placeholder: string;
        boxClassName?: string;
        itemClassName?: string;
    };
