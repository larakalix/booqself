"use client";

import { createRef, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import html2canvas from "html2canvas";
import { BiEraser } from "react-icons/bi";
import { registerStore } from "@/stores/registerStore";
import { downloadImage } from "@/utils/utils";
import { ContractService } from "@/services/ContractServices";

export const DocumentSign = ({
    downloadDocument = false,
}: {
    downloadDocument?: boolean;
}) => {
    const { assignee, changeStep } = registerStore((state) => state);
    const signatureRef = createRef<HTMLDivElement>();
    const actionsRef = createRef<HTMLLIElement>();
    const submitRef = createRef<HTMLDivElement>();
    const sigCanvas = useRef({} as SignatureCanvas);

    const handleSubmit = async () => {
        actionsRef.current?.classList.add("hidden");
        submitRef.current?.classList.add("hidden");

        const canvas = await html2canvas(signatureRef.current!);
        const contract = canvas.toDataURL("image/png");

        if (downloadDocument) {
            const documentName = `${assignee?.name} ${assignee?.lastName} - Contract.png`;
            downloadImage(contract, documentName);
        }

        const { status } = await ContractService().sendContract({
            assignee: assignee!,
            contract,
        });

        if (status === 200) changeStep(2);

        actionsRef.current?.classList.remove("hidden");
        submitRef.current?.classList.remove("hidden");
    };

    return (
        <section className="w-full py-10 relative">
            <div className="flex items-center justify-center">
                <div
                    className="flex flex-col gap-4 max-w-2xl w-full"
                    ref={signatureRef}
                >
                    <div className="flex flex-col gap-4 px-20">
                        <h1>FAKE CONTRACT</h1>

                        <p>
                            This Fake Contract is made and entered into as of{" "}
                            <strong>[Date]</strong>, between:
                        </p>

                        <p>
                            <strong>[Your Company Name]</strong>, with its
                            principal place of business at{" "}
                            <strong>[Your Company Address]</strong>, hereinafter
                            referred to as the Company
                        </p>

                        <p>and</p>

                        <p>
                            <strong>[Counterparty Name]</strong>, with its
                            principal place of business at{" "}
                            <strong>[Counterparty Address]</strong>, hereinafter
                            referred to as the Counterparty.
                        </p>

                        <h2>WHEREAS</h2>

                        <p>
                            The Company and Counterparty desire to enter into a
                            mutual agreement for the purpose of{" "}
                            <strong>[Purpose of the Contract]</strong>.
                        </p>

                        <h2>NOW, THEREFORE</h2>

                        <p>
                            In consideration of the mutual promises and
                            covenants contained herein, the Company and
                            Counterparty agree as follows:
                        </p>

                        <ol>
                            <li>
                                <h3>Scope of Work:</h3>
                                <ul>
                                    <li>
                                        The Company agrees to{" "}
                                        <strong>
                                            [Describe the tasks or services the
                                            Company will provide]
                                        </strong>
                                        .
                                    </li>
                                    <li>
                                        The Counterparty agrees to{" "}
                                        <strong>
                                            [Describe the tasks or services the
                                            Counterparty will provide]
                                        </strong>
                                        .
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <h3>Term:</h3>
                                <ul>
                                    <li>
                                        This Contract shall commence on{" "}
                                        <strong>[Start Date]</strong> and
                                        terminate on <strong>[End Date]</strong>
                                        .
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <ul className="flex gap-4">
                            <li className="font-semibold">Sign here:</li>
                            <li ref={actionsRef}>
                                <button
                                    onClick={() => sigCanvas.current.clear()}
                                >
                                    <BiEraser className="text-2xl text-black font-light mt-[-1px]" />
                                </button>
                            </li>
                        </ul>

                        <div className="flex items-center justify-center py-4">
                            <SignatureCanvas
                                canvasProps={{
                                    width: 400,
                                    height: 150,
                                    className: "border border-black",
                                }}
                                ref={sigCanvas}
                            />
                        </div>

                        <p className="w-full text-xl font-bold text-center py-4 text-black uppercase">
                            {assignee?.name} {assignee?.lastName}
                        </p>
                    </div>

                    <div ref={submitRef}>
                        <button
                            className="col-span-2 bg-blue-400 text-white rounded-md py-[0.813rem] px-[1.969rem]"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
