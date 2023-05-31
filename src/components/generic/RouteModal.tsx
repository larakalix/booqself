"use client";

import {
    useCallback,
    useRef,
    useEffect,
    Fragment,
    Ref,
    MutableRefObject,
} from "react";
import { GrFormClose } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
    title?: string;
    showClose?: boolean;
    children: React.ReactNode;
};

export const RouteModal = ({ title, showClose = false, children }: Props) => {
    const overlay = useRef({} as HTMLDivElement);
    const wrapper = useRef({} as HTMLDivElement);
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

    const onClick = useCallback(
        (e: any) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss();
            }
        },
        [onDismiss, overlay, wrapper]
    );

    const onKeyDown = useCallback(
        (e: any) => {
            if (e.key === "Escape") onDismiss();
        },
        [onDismiss]
    );

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return (
        <>
            {" "}
            <Transition appear show={true} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {}}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div
                            className="flex min-h-full items-center justify-center p-4 text-center"
                            ref={overlay}
                            onClick={onClick}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                                ref={wrapper}
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                    {title && (
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            {title}
                                        </Dialog.Title>
                                    )}
                                    {showClose && (
                                        <div className="absolute top-0 right-0 p-4">
                                            <button onClick={onDismiss}>
                                                <GrFormClose className="text-gray-400 hover:text-gray-600" />
                                            </button>
                                        </div>
                                    )}

                                    <>{children}</>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};
