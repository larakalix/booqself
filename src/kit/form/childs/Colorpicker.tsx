"use client";

import { useMemo } from "react";
import { useField, type FieldInputProps, type FieldMetaProps } from "formik";
import { type Color, ColorPicker, useColor } from "react-color-palette";
import type { IColorPickerInput } from "@/types/forms/form";
import "react-color-palette/lib/css/styles.css";

type ColorPickerProps = {
    field: FieldInputProps<any>;
    meta: FieldMetaProps<any>;
    formField: IColorPickerInput;
};

export const Colorpicker = ({ formField }: ColorPickerProps) => {
    const [field] = useField({ name: formField.name });
    const [color, setColor] = useColor("hex", "#1CC551");

    const handleChange = useMemo(
        () => (color: Color) => {
            field.onChange({
                target: {
                    name: field.name,
                    value: color.hex,
                },
            });
            setColor(color);
        },
        [field, setColor]
    );

    return (
        <ColorPicker
            width={456}
            height={228}
            color={color}
            onChange={(color) => handleChange(color)}
            hideHSV
            dark
        />
    );
};
