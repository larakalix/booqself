"use client";

import Link from "next/link";
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
            {step !== 2 && (
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
            )}
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
            {step === 2 && (
                <Disclosure as="div" defaultOpen>
                    {({ open }) => (
                        <>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                <div className="flex flex-col items-center justify-center h-[80vh]">
                                    <div className="max-w-lg text-center flex flex-col items-center justify-center gap-4 py-10">
                                        <h1 className="text-black font-bold text-xl">
                                            Contract successfully signed.
                                        </h1>

                                        <p>
                                            Now you are registered, please check
                                            your email to confirm your account.
                                        </p>

                                        <p>
                                            If you have any questions, please
                                            contact us at 000-000-0000 or email
                                            us at help@testmail.com and we will
                                            be happy to assist you.
                                        </p>

                                        <Link
                                            href="/"
                                            className="col-span-2 bg-green-500 text-white rounded-md py-4 px-8 mt-8"
                                        >
                                            Go to home
                                        </Link>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            )}
        </div>
    );
};
