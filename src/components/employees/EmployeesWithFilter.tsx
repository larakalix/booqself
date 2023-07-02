/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToasts } from "react-toast-notifications";
import { useEmployeesFilterStore } from "@/stores/filterStore";
import { useAuthStore } from "@/stores/authStore";
import { EmptyResults } from "../generic/EmptyResults";
import { EmployeeService } from "@/services/employee/EmployeeService";
import { DynamicForm } from "../generic/form/DynamicForm";
import { Loading } from "../generic/Loading";
import { Employees } from "./Employees";

export const EmployeesWithFilter = () => {
    const { addToast } = useToasts();
    const { data, isLoading, error } = useQuery({
        queryKey: ["getEmployees"],
        queryFn: async () => await EmployeeService().getCloverEmployees(params?.merchant_id!, process.env.NEXT_CLOVER_APP_SECRET!),
        onSuccess: (data) => { if (data) setEmployees(data); },
        onError: (error) => addToast(`${error}`, { appearance: "error", autoDismiss: true }),
    });

    const { params } = useAuthStore((state) => state);
    const { loading, employees, setLoading, setEmployees } =
        useEmployeesFilterStore((state) => state);

    const handleSubtmit = useMemo(
        () => async (values: any, actions: any) => {
            setLoading(true);
            const { name, email, nickname, pin } = values;

            const rows = await EmployeeService().getCloverEmployees(
                params?.merchant_id!,
                process.env.NEXT_CLOVER_APP_SECRET!
            );

            if (rows) setEmployees(rows);
            actions.setSubmitting(false);
        },
        []
    );

    return (
        <div className="flex flex-col gap-6">
            <DynamicForm
                formFields={[
                    {
                        name: "name",
                        label: "Name",
                        type: "text",
                        placeholder: "ex: John",
                    },
                    {
                        name: "nickname",
                        label: "Nickname",
                        type: "text",
                        placeholder: "ex: John",
                    },
                    {
                        name: "pin",
                        label: "Pin",
                        type: "text",
                        placeholder: "ex: 987986",
                    },
                    {
                        name: "email",
                        label: "Email",
                        type: "text",
                        placeholder: "ex: john@doe.com",
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
            ) : !employees || employees.length === 0 ? (
                <EmptyResults text="No employees found." />
            ) : (
                <Employees data={employees} />
            )}
        </div>
    );
};
