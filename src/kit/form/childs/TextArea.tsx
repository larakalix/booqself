import { forwardRef } from "react";
import { cn } from "@/utils/utils";
import type { FieldInputProps, FieldMetaProps } from "formik";
import type { IFormField } from "@/types/forms/form";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    field: FieldInputProps<any>;
    meta: FieldMetaProps<any>;
    formField: IFormField;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ field, formField, className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                    className
                )}
                placeholder={formField.placeholder ? formField.placeholder : ""}
                {...field}
            />
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
