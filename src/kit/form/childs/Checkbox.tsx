"use client";
import React, { Children } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/utils/utils";
import { Field, type FieldInputProps, type FieldMetaProps } from "formik";
import type { IFormCheckboxGroup, IFormSelections } from "@/types/forms/form";

export const Checkbox = ({
    field,
    meta,
    formField,
}: {
    field: FieldInputProps<any>;
    meta: FieldMetaProps<any>;
    formField: IFormCheckboxGroup;
}) => {
    return (
        <div className="grid grid-cols-2 gap-2">
            {Children.toArray(
                formField.options.map((option: IFormSelections) => (
                    <label className="flex items-center gap-2">
                        <Field
                            type="checkbox"
                            name={field.name}
                            value={option.value}
                        />
                        {option.label}
                    </label>
                ))
            )}
        </div>
    );
};

// export interface CheckboxProps {
//     field: FieldInputProps<any>;
//     meta: FieldMetaProps<any>;
//     formField: IFormCheckboxGroup;
// }

// const Checkbox = React.forwardRef<
//     React.ElementRef<typeof CheckboxPrimitive.Root>,
//     React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
//         CheckboxProps
// >(({ field, formField, className, ...props }, ref) => (
//     <div className="grid grid-cols-2 gap-2">
//         {Children.toArray(
//             formField.options.map((option: IFormSelections) => (
//                 <label
//                     htmlFor={option.id}
//                     className="flex items-center gap-2 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                 >
//                     <CheckboxPrimitive.Root
//                         id={field.name}
//                         name={field.name}
//                         ref={ref}
//                         className={cn(
//                             "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
//                             className
//                         )}
//                         {...props}
//                     >
//                         <CheckboxPrimitive.Indicator
//                             className={cn(
//                                 "flex items-center justify-center text-current"
//                             )}
//                         >
//                             <Check className="h-4 w-4" />
//                         </CheckboxPrimitive.Indicator>
//                     </CheckboxPrimitive.Root>
//                     {option.label}
//                 </label>
//             ))
//         )}
//     </div>
// ));

// Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// export { Checkbox };
