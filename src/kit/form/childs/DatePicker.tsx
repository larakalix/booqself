import { DateRangePicker } from "@tremor/react";
import type { FieldInputProps, FieldMetaProps } from "formik";
import type { IDatePickerForm } from "@/types/forms/form";
import { formatToISO } from "@/utils/time";
import { sub } from "date-fns";

export const DatePicker = ({
    formField,
    field,
}: {
    field: FieldInputProps<any>;
    meta: FieldMetaProps<any>;
    formField: IDatePickerForm;
}) => {
    return (
        <DateRangePicker
            // className="border border-input-border rounded-md overflow-hidden w-full"
            placeholder={formField.placeholder}
            dropdownPlaceholder="Seleccionar"
            options={[
                {
                    value: "currentyear",
                    text: "Current Year",
                    startDate: new Date(new Date().getFullYear(), 0, 1),
                    endDate: sub(new Date(), { days: 1 }),
                },
                {
                    value: "tdy",
                    text: "Last 5 days",
                    startDate: sub(new Date(), { days: 5 }),
                    endDate: sub(new Date(), { days: -5 }),
                },
                {
                    value: "fl2weeks",
                    text: "Last 2 Weeks",
                    startDate: sub(new Date(), { weeks: 2 }),
                    endDate: sub(new Date(), { days: 1 }),
                },
                {
                    value: "xmas",
                    text: "Christmas Holiday",
                    startDate: new Date(2022, 12, 23),
                    endDate: new Date(2022, 12, 26),
                },
            ]}
            enableDropdown
            onValueChange={(value) => {
                const [start, end] = value;
                const formatted = `${new Date(start!).toISOString()}|${new Date(
                    end!
                ).toISOString()}`;
                field.onChange({
                    target: {
                        name: field.name,
                        value: formatted,
                    },
                });
            }}
        />
    );
};
