"use client";

import { forwardRef } from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/utils/utils";
import type { FieldInputProps, FieldMetaProps } from "formik";
import type { IFormField } from "@/types/forms/form";

export interface SwitchProps {
    field: FieldInputProps<any>;
    meta: FieldMetaProps<any>;
    formField: IFormField;
}

const Switch = forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & SwitchProps
>(({ field, formField, className, ...props }, ref) => (
    <SwitchPrimitives.Root
        className={cn(
            "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
            className
        )}
        {...props}
        {...field}
        ref={ref}
    >
        <SwitchPrimitives.Thumb
            className={cn(
                "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
            )}
        />
    </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

// export const Switch = ({
//     formField,
// }: {
//     field: FieldInputProps<any>;
//     meta: FieldMetaProps<any>;
//     formField: IFormSwitchInput;
// }) => {
//     const [field] = useField({ name: formField.name });

//     return (
//         <HSwitch
//             checked={field.value}
//             onChange={(value) => {
//                 field.onChange({
//                     target: {
//                         name: field.name,
//                         value,
//                     },
//                 });
//             }}
//             className={`${
//                 field.value ? "bg-green-500" : "bg-gray-200"
//             } relative inline-flex h-7 w-12 items-center rounded-full`}
//         >
//             <span className="sr-only">{formField.label}</span>
//             <span
//                 className={`${
//                     field.value ? "translate-x-6" : "translate-x-1"
//                 } inline-block h-5 w-5 transform rounded-full bg-gray-100 transition`}
//             />
//         </HSwitch>
//     );
// };
