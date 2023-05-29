"use client";

import { Disclosure } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { RegisterForm } from "../register/RegisterForm";
import { DocumentSign } from "../register/DocumentSign";
import { registerStore } from "@/stores/registerStore";
import type { IFormField } from "@/types/form";

export const Steps = ({ formFields }: { formFields: IFormField[] }) => {
    const { step } = registerStore((state) => state);

    return (
        <div className="flex flex-col gap-4">
            <Disclosure as="div" defaultOpen={step === 0}>
                {({ open, close }) => (
                    <>
                        <Disclosure.Button className="flex w-full justify-between rounded-md bg-blue-400 py-3 px-5 text-left text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span>Form</span>
                            <BiChevronDown
                                className={`${
                                    open ? "rotate-180 transform" : ""
                                } h-5 w-5 text-white`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            <RegisterForm
                                formFields={formFields as IFormField[]}
                                close={close}
                            />
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            {step === 1 && (
                <Disclosure as="div" defaultOpen>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-md bg-blue-400 py-3 px-5 text-left text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>Do you offer technical support?</span>
                                <BiChevronDown
                                    className={`${
                                        open ? "rotate-180 transform" : ""
                                    } h-5 w-5 text-white`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                <DocumentSign />
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            )}
        </div>
    );
};
