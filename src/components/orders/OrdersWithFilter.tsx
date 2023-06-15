/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { EmptyResults } from "../generic/EmptyResults";
import { Loading } from "../generic/Loading";
import { useOrdersFilterStore } from "@/stores/filterStore";
import { OrderService } from "@/services/order/OrderService";
import { DynamicForm } from "../generic/form/DynamicForm";
import { Orders } from "./Orders";
import { useAuthStore } from "@/stores/authStore";

export const OrdersWithFilter = () => {
    const { data, isLoading, error } = useQuery(
        ["getCloverEmployees"],
        async () => await OrderService().getCloverOrders(params?.merchant_id!, process.env.NEXT_CLOVER_APP_SECRET!),
        {
            onSuccess: (data) => {
                if (data) setOrders(data);
            },
        }
    );
    
    const { params } = useAuthStore((state) => state);
    const { loading, orders, setLoading, setOrders } = useOrdersFilterStore(
        (state) => state
    );

    const handleSubtmit = useMemo(
        () => async (values: any, actions: any) => {
            setLoading(true);
            const { currency, total, nickname, pin } = values;

            const rows = await OrderService().getCloverOrders(
                params?.merchant_id!,
                process.env.NEXT_CLOVER_APP_SECRET!
            );

            if (rows) setOrders(rows);
            actions.setSubmitting(false);
        },
        []
    );

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

            {isLoading ? (
                <Loading />
            ) : !orders || orders.length === 0 ? (
                <EmptyResults text="No orders found." />
            ) : (
                <Orders data={orders} />
            )}
        </div>
    );
};
