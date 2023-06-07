/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo } from "react";
import { EmptyResults } from "../generic/EmptyResults";
import { useOrdersFilterStore } from "@/stores/filterStore";
import { OrderService } from "@/services/order/OrderService";
import { DynamicForm } from "../generic/form/DynamicForm";
import { Orders } from "./Orders";

export const OrdersWithFilter = ({
    merchantId,
    apiKey,
}: {
    merchantId: string;
    apiKey: string;
}) => {
    const { loading, orders, setLoading, setOrders } = useOrdersFilterStore(
        (state) => state
    );

    const handleSubtmit = useMemo(
        () => async (values: any, actions: any) => {
            setLoading(true);
            const { currency, total, nickname, pin } = values;

            const rows = await OrderService().getCloverOrders(
                merchantId,
                apiKey
            );

            if (rows) setOrders(rows);
            actions.setSubmitting(false);
        },
        []
    );

    useEffect(() => {
        (async () => {
            const rows = await OrderService().getCloverOrders(
                merchantId,
                apiKey
            );

            if (rows) setOrders(rows);
        })();
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <DynamicForm
                formFields={[
                    {
                        name: "title",
                        label: "Title",
                        type: "text",
                        placeholder: "ex: ",
                    },
                ]}
                config={{
                    buttonLabel: "Search",
                    areFilters: true,
                }}
                isLoading={loading}
                onSubmit={handleSubtmit}
            />

            {!orders || orders.length === 0 ? (
                <EmptyResults text="No orders found" />
            ) : (
                <Orders data={orders} />
            )}
        </div>
    );
};
