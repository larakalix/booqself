import { Children, forwardRef, useId } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/utils/utils";
import { RadioGroupProps } from "./types";
import { radioVariants } from "./variants";

const RadioButtonGroup = forwardRef<
    React.ElementRef<typeof RadioGroup.Root>,
    RadioGroupProps
>(({ options, className, flex, children, ...props }, ref) => {
    const id = useId();
    const _className = cn(radioVariants({ flex, className }));
    const _itemClassName = cn();

    return (
        <RadioGroup.Root
            id={id}
            ref={ref}
            className={_className}
            defaultValue="default"
            aria-label="View density"
            {...props}
        >
            {Children.toArray(
                options.map(({ id, value }) => (
                    <div className="flex items-center">
                        <RadioGroup.Item
                            className="bg-white w-[1.5rem] h-[1.5rem] rounded-full outline-none cursor-default border border-gray-border data-[state=checked]:border-blue-accent data-[state=checked]:border-2"
                            value={id}
                            id={id}
                        >
                            <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-blue-accent" />
                        </RadioGroup.Item>
                        <label
                            className="text-black-accent text-[15px] leading-none pl-[15px]"
                            htmlFor="r1"
                        >
                            {value}
                        </label>
                    </div>
                ))
            )}
        </RadioGroup.Root>
    );
});

RadioButtonGroup.displayName = RadioGroup.Root.displayName;

export { RadioButtonGroup };
