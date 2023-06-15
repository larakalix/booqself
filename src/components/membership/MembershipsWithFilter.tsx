/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToasts } from "react-toast-notifications";
import { useAuthStore } from "@/stores/authStore";
import { useMembershipsFilterStore } from "@/stores/filterStore";
import { Loading } from "../generic/Loading";
import { EmptyResults } from "../generic/EmptyResults";
import { Memberships } from "./Memberships";
import { MembershipService } from "@/services/membership/MembershipService";
import { DynamicForm } from "../generic/form/DynamicForm";

export const MembershipsWithFilter = () => {
    const { addToast } = useToasts();
    const { data, isLoading, error } = useQuery(
        ["getAppointments"],
        async () =>
            await MembershipService().getByFilter(params?.merchant_id!, {
                offset: 0,
                limit: 50,
            }),
        {
            onSuccess: (data) => {
                if (data) setMemberships(data);
            },
            onError: (error) =>
                addToast(`${error}`, {
                    appearance: "error",
                    autoDismiss: true,
                }),
        }
    );

    const { params } = useAuthStore((state) => state);
    const { loading, memberships, setLoading, setMemberships } =
        useMembershipsFilterStore((state) => state);

    const handleSubtmit = useMemo(
        () => async (values: any, actions: any) => {
            setLoading(true);
            const { name, email, employee, rangeDate } = values;

            const rows = await MembershipService().getByFilter(
                params?.merchant_id!,
                { name, email, employee, rangeDate, offset: 0, limit: 50 }
            );

            if (rows) setMemberships(rows);
            actions.setSubmitting(false);
            setLoading(false);
        },
        []
    );

    return (
        <div className="flex flex-col gap-6">
            <DynamicForm
                formFields={[
                    {
                        name: "name",
                        label: "Membership name",
                        type: "text",
                        placeholder: "ex: Golden",
                    },
                    {
                        name: "price",
                        label: "Price",
                        type: "text",
                        placeholder: "ex: 100",
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
            ) : !memberships || memberships.data.length === 0 ? (
                <EmptyResults text="No memberships found." />
            ) : (
                <Memberships data={memberships.data} meta={memberships.meta} />
            )}
        </div>
    );
};
