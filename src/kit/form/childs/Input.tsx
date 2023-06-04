import { forwardRef } from "react";
import { cn } from "@/utils/utils";
import type { FieldInputProps, FieldMetaProps } from "formik";
import type { IFormField } from "@/types/forms/form";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    field: FieldInputProps<any>;
    meta: FieldMetaProps<any>;
    formField: IFormField;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ field, formField, className, type, ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                placeholder={formField.placeholder ? formField.placeholder : ""}
                {...props}
                {...field}
            />
        );
    }
);

Input.displayName = "Input";

// export const Input = ({
//     field,
//     meta,
//     formField,
// }: {
//     field: FieldInputProps<any>;
//     meta: FieldMetaProps<any>;
//     formField: IFormField;
// }) => {
//     return (
//         <input
//             type="text"
//             placeholder={formField.placeholder ? formField.placeholder : ""}
//             className={`border border-input-border rounded-md w-full bg-gray-100 py-4 px-6 text-sm disabled:bg-gray-200 disabled:text-gray-600`}
//             {...field}
//         />
//     );
// };
