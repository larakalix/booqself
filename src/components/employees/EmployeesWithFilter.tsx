/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo } from "react";
import { EmptyResults } from "../generic/EmptyResults";
import { useEmployeesFilterStore } from "@/stores/filterStore";
import { EmployeeService } from "@/services/employee/EmployeeService";
import { DynamicForm } from "../generic/form/DynamicForm";
import { Employees } from "../home/Employees";

export const EmployeesWithFilter = () => {
    const { loading, employees, setLoading, setEmployees } =
        useEmployeesFilterStore((state) => state);

    const handleSubtmit = useMemo(
        () => async (values: any, actions: any) => {
            setLoading(true);
            const { name, email, nickname, pin } = values;

            const filteredEmployees = await EmployeeService().getByFilter(
                process.env.NEXT_APP_CLIENT_ID!,
                { name, email, nickname, pin, offset: 0, limit: 50 }
            );

            if (filteredEmployees) setEmployees(filteredEmployees);
            actions.setSubmitting(false);
        },
        []
    );

    useEffect(() => {
        (async () => {
            const filteredEmployees = await EmployeeService().getByFilter(
                process.env.NEXT_APP_CLIENT_ID!,
                { offset: 0, limit: 50 }
            );

            if (filteredEmployees) setEmployees(filteredEmployees);
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

            {!employees || employees.data.length === 0 ? (
                <EmptyResults text="No employees found" />
            ) : (
                <Employees data={employees.data} meta={employees.meta} />
            )}
        </div>
    );
};
