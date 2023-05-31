"use client";

import { useRouter } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { RegisterForm } from "../register/RegisterForm";
import { DocumentSign } from "../register/DocumentSign";
import { useRegisterStore } from "@/stores/registerStore";
import type { IFormField } from "@/types/forms/form";
import { Card } from "@tremor/react";

export const Steps = ({ formFields }: { formFields: IFormField[] }) => {
    const router = useRouter();
    const { step, remove } = useRegisterStore((state) => state);

    const handleClick = () => {
        remove();
        router.push("/");
    };

    return (
        <div className="flex flex-col gap-4">
            {step !== 2 && (
                <Disclosure as="div" defaultOpen={step === 0}>
                    {({ open, close }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-md bg-blue-400 py-3 px-5 text-left text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>Register form</span>
                                <BiChevronDown
                                    className={`${
                                        open ? "rotate-180 transform" : ""
                                    } h-5 w-5 text-white`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="mt-4 text-sm text-gray-500">
                                <Card className="relative w-full text-left ring-1 bg-white shadow border-blue-500 ring-gray-200 p-6 rounded-md">
                                    <RegisterForm
                                        formFields={formFields as IFormField[]}
                                        close={close}
                                    />
                                </Card>
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
                            <Disclosure.Panel className="mt-4 text-sm text-gray-500">
                                <Card className="relative w-full text-left ring-1 bg-white shadow border-blue-500 ring-gray-200 p-6 rounded-md">
                                    <DocumentSign />
                                </Card>
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

                                        <button
                                            className="col-span-2 bg-green-500 text-white rounded-md py-4 px-8 mt-8"
                                            onClick={handleClick}
                                        >
                                            Go to home
                                        </button>
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
