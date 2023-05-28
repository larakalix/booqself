import { Children } from "react";
import { RadioGroup } from "@headlessui/react";
import { useField, type FieldInputProps, type FieldMetaProps } from "formik";
import { BiCheck } from "react-icons/bi";
import type { IFormDropdown } from "@/types/form";

export const Radio = ({
    formField,
}: {
    field: FieldInputProps<any>;
    meta: FieldMetaProps<any>;
    formField: IFormDropdown;
}) => {
    const [field] = useField({ name: formField.name });

    return (
        <div className="w-full">
            <div className="mx-auto w-full">
                <RadioGroup
                    value={field.value}
                    onChange={(value) => {
                        field.onChange({
                            target: {
                                name: field.name,
                                value,
                            },
                        });
                    }}
                >
                    <RadioGroup.Label className="sr-only">
                        {formField.label}
                    </RadioGroup.Label>
                    <div className="space-y-2">
                        {Children.toArray(
                            formField.options.map((option) => (
                                <RadioGroup.Option
                                    value={option.value}
                                    className={({ active, checked }) =>
                                        `${
                                            active
                                                ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                                                : ""
                                        }
                      ${
                          checked
                              ? "bg-green-600 bg-opacity-75 text-white"
                              : "bg-white"
                      }
                        relative flex cursor-pointer border border-input-border rounded-md w-full py-3 px-5 focus:outline-none`
                                    }
                                >
                                    {({ active, checked }) => (
                                        <>
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="text-base">
                                                        <RadioGroup.Label
                                                            as="p"
                                                            className={`font-medium  ${
                                                                checked
                                                                    ? "text-white"
                                                                    : "text-gray-900"
                                                            }`}
                                                        >
                                                            {option.label}
                                                        </RadioGroup.Label>
                                                        {option?.description && (
                                                            <RadioGroup.Description
                                                                as="span"
                                                                className={`inline ${
                                                                    checked
                                                                        ? "text-sky-100"
                                                                        : "text-gray-500"
                                                                }`}
                                                            >
                                                                {
                                                                    option?.description
                                                                }
                                                            </RadioGroup.Description>
                                                        )}
                                                    </div>
                                                </div>
                                                {checked && (
                                                    <div className="shrink-0 text-white">
                                                        <BiCheck className="h-6 w-6" />
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </RadioGroup.Option>
                            ))
                        )}
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
};
