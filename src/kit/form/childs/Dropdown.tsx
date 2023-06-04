/* eslint-disable react-hooks/exhaustive-deps */

import { Children, Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
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

// export const Dropdown = ({
//     formField,
// }: {
//     field: FieldInputProps<any>;
//     meta: FieldMetaProps<any>;
//     formField: IFormDropdown;
// }) => {
//     const [field] = useField({ name: formField.name });
//     const [tag, setTag] = useState<string | null>(null);

//     return (
//         <Listbox
//             value={field.value}
//             onChange={(value) => {
//                 const tag = formField.options.find(
//                     (option) => option.value === value
//                 )?.label as string;
//                 setTag(tag);
//                 field.onChange({
//                     target: {
//                         name: field.name,
//                         value,
//                     },
//                 });
//             }}
//         >
//             <div className="relative">
//                 <Listbox.Button className="flex relative cursor-default border border-input-border rounded-md w-full bg-gray-100 py-[0.9rem] px-5">
//                     <span className="block truncate">
//                         {tag ? tag : formField.label}
//                     </span>
//                     <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                         <BiChevronDown
//                             className="h-5 w-5 text-gray-400"
//                             aria-hidden="true"
//                         />
//                     </span>
//                 </Listbox.Button>
//                 <Transition
//                     as={Fragment}
//                     leave="transition ease-in duration-100"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                 >
//                     <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                         {Children.toArray(
//                             formField.options.map((option) => (
//                                 <Listbox.Option
//                                     className={({ active }) =>
//                                         `relative cursor-default select-none py-2 pl-10 pr-4 ${
//                                             active
//                                                 ? "bg-gray-100 text-gray-900"
//                                                 : "text-gray-900"
//                                         }`
//                                     }
//                                     value={option.value}
//                                 >
//                                     {({ selected }) => (
//                                         <>
//                                             <span
//                                                 className={`block truncate ${
//                                                     selected
//                                                         ? "font-medium"
//                                                         : "font-normal"
//                                                 }`}
//                                             >
//                                                 {option.label}
//                                             </span>
//                                             {selected ? (
//                                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-500">
//                                                     <BiCheck
//                                                         className="h-5 w-5"
//                                                         aria-hidden="true"
//                                                     />
//                                                 </span>
//                                             ) : null}
//                                         </>
//                                     )}
//                                 </Listbox.Option>
//                             ))
//                         )}
//                     </Listbox.Options>
//                 </Transition>
//             </div>
//         </Listbox>
//     );
// };
