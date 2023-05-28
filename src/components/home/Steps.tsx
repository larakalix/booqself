"use client";

import { Disclosure } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { RegisterForm } from "../register/RegisterForm";
import type { IFormField } from "@/types/form";
import { DocumentSign } from "../register/DocumentSign";

export const Steps = ({ formFields }: { formFields: IFormField[] }) => {
    return (
        <div className="flex flex-col gap-4">
            <Disclosure as="div" defaultOpen>
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex w-full justify-between rounded-md bg-purple-100 py-3 px-5 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span>Form</span>
                            <BiChevronDown
                                className={`${
                                    open ? "rotate-180 transform" : ""
                                } h-5 w-5 text-purple-500`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            <RegisterForm
                                formFields={formFields as IFormField[]}
                            />
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <Disclosure as="div" defaultOpen>
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex w-full justify-between rounded-md bg-purple-100 py-3 px-5 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span>Do you offer technical support?</span>
                            <BiChevronDown
                                className={`${
                                    open ? "rotate-180 transform" : ""
                                } h-5 w-5 text-purple-500`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            <DocumentSign />
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
};
