import { GET_CONFIG } from "../configurations/generic";
import type { IOrder } from "@/types/models/order";

export const OrderService = () => {
    const getCloverOrders = async (merchantId: string, apiKey: string) => {
        try {
            const URI = `${process.env.NEXT_CLOVER_API_URL}/orders`;
            const res = await fetch(URI, {
                ...GET_CONFIG,
                headers: {
                    ...GET_CONFIG.headers,
                    authorization: `Bearer ${apiKey}`,
                    merchantid: merchantId,
                },
            });
            if (!res.ok) throw new Error("Failed to get orders");

            const { elements } = await res.json();

            return elements as IOrder[];
        } catch (error) {
            console.log("error", error);
        }
    };

    return {
        getCloverOrders,
    };
};
