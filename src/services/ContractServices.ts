import type { IClientAttributes } from "@/types/models/client";

export const ContractService = () => {
    const sendContract = async ({
        assignee,
        contract,
    }: {
        assignee: IClientAttributes;
        contract: string;
    }) => {
        const res = await fetch(`${process.env.NEXT_API_URL}/contract`, {
            method: "POST",
            body: JSON.stringify({ assignee, contract }),
        });
        const { status, body } = await res.json();

        return { status, body };
    };

    return {
        sendContract,
    };
};
