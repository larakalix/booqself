import { Children, ForwardedRef, forwardRef } from "react";
import * as Select from "@radix-ui/react-select";
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@radix-ui/react-icons";
import clsx from "clsx";
import { cn } from "@/utils/utils";
import { DropdownItem, DrondownProps, IIndicatorAlign } from "./types";

type DropdownOptionProps = DropdownItem &
    Partial<IIndicatorAlign> & {
        itemClassName?: string;
        ref?: ForwardedRef<never>;
    };

const DropdownOption = ({
    id,
    value,
    itemClassName,
    alignIndicator,
    ref,
}: DropdownOptionProps) => {
    const alignIndicatorStyle = clsx({
        "left-2": alignIndicator === "left",
        "right-2": alignIndicator === "right",
    });

    return (
        <Select.Item
            ref={ref}
            className={cn(
                `bg-transparent text-heading-6 leading-none text-accent-black hover:bg-blue-accent hover:text-white rounded-md flex items-center 
                px-8 py-3 relative select-none data-[disabled]:text-accent-gray-4 data-[disabled]:pointer-events-none 
                data-[highlighted]:outline-none data-[highlighted]:bg-accent-blue data-[highlighted]:text-accent-blue cursor-pointer`,
                itemClassName
            )}
            id={id}
            value={id}
        >
            <Select.ItemText id={id}>{value}</Select.ItemText>
            <Select.ItemIndicator
                className={cn(
                    "absolute w-[1rem] inline-flex items-center justify-center",
                    alignIndicatorStyle
                )}
            >
                <CheckIcon />
            </Select.ItemIndicator>
        </Select.Item>
    );
};

const Dropdown = forwardRef<
    React.ElementRef<typeof Select.Root>,
    DrondownProps
>(
    (
        {
            boxClassName,
            itemClassName,
            options,
            placeholder,
            alignIndicator = "left",
            children,
            ...props
        },
        ref
    ) => {
        return (
            <Select.Root {...props}>
                <Select.Trigger
                    ref={ref}
                    className={cn(
                        `w-full overflow-hidden border border-gray-border focus:border-blue-accent flex items-center justify-between 
                        rounded-lg px-4 text-heading-6 leading-none h-dropdown-height gap-2 bg-white text-black-accent 
                        hover:bg-mauve3  data-[placeholder]:text-gray-2 outline-none`,
                        boxClassName
                    )}
                    aria-label="Selections"
                >
                    <Select.Value placeholder={placeholder} />
                    <Select.Icon className="bg-gray-4 text-black-accent p-1 rounded-full">
                        <ChevronDownIcon />
                    </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content
                        ref={ref}
                        className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                    >
                        <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                            <ChevronUpIcon />
                        </Select.ScrollUpButton>

                        <Select.Viewport ref={ref} className="p-2">
                            {Children.toArray(
                                options.map(({ id, value }: DropdownItem) => (
                                    <DropdownOption
                                        id={id}
                                        value={value}
                                        itemClassName={itemClassName}
                                        alignIndicator={alignIndicator}
                                    />
                                ))
                            )}
                        </Select.Viewport>

                        <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                            <ChevronDownIcon />
                        </Select.ScrollDownButton>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );
    }
);

Dropdown.displayName = Select.Root.displayName;

export { Dropdown };
