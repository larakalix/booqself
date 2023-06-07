/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo } from "react";
import { EmptyResults } from "../generic/EmptyResults";
import { useEmployeesFilterStore } from "@/stores/filterStore";
import { EmployeeService } from "@/services/employee/EmployeeService";
import { DynamicForm } from "../generic/form/DynamicForm";
import { Employees } from "./Employees";
import { useAuthStore } from "@/stores/authStore";

export const EmployeesWithFilter = () => {
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

    useEffect(() => {
        (async () => {
            const rows = await EmployeeService().getCloverEmployees(
                params?.merchant_id!,
                process.env.NEXT_CLOVER_APP_SECRET!
            );

            if (rows) setEmployees(rows);
        })();
    }, []);

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

            {!employees || employees.length === 0 ? (
                <EmptyResults text="No employees found" />
            ) : (
                <Employees data={employees} />
            )}
        </div>
    );
};
