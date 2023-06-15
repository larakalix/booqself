/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Children, useMemo, useState } from "react";
import { useField, type FieldInputProps, type FieldMetaProps } from "formik";
import { BiCheck, BiChevronDown } from "react-icons/bi";
import { Popover, PopoverContent, PopoverTrigger } from "@/kit/popover/Popover";
import { Button } from "@/kit/button/Button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/kit/command/Command";
import { cn } from "@/utils/utils";
import type { IFormDropdown } from "@/types/forms/form";

export const Dropdown = ({
    formField,
}: {
    field: FieldInputProps<any>;
    meta: FieldMetaProps<any>;
    formField: IFormDropdown;
}) => {
    const [field] = useField({ name: formField.name });
    const [open, setOpen] = useState(false);

    const handleChange = useMemo(
        () => (value: string) => {
            const id =
                formField.options.find(
                    (opt) => opt.label.toLowerCase() === value.toLowerCase()
                )?.value ?? null;
            field.onChange({
                target: {
                    name: field.name,
                    value: id,
                },
            });
            setOpen(false);
        },
        [field]
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {field.value
                        ? formField.options.find(
                              (opt) => opt.value === field.value
                          )?.label
                        : "Select option..."}
                    <BiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput
                        placeholder={
                            formField.placeholder
                                ? formField.placeholder
                                : "Select an option..."
                        }
                    />
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup>
                        {Children.toArray(
                            formField.options.map((option) => (
                                <CommandItem onSelect={handleChange}>
                                    <BiCheck
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            field.value === option.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))
                        )}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
