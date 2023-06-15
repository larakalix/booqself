"use client";

import { CiCircleInfo } from "react-icons/ci";
import { Card, CardContent } from "@/kit/card/Card";
import { DynamicForm } from "../generic/form/DynamicForm";
import { useMemo } from "react";

type Props = {
    id?: string;
};

export const MembershipForm = ({ id }: Props) => {
    const handleClick = useMemo(() => () => {}, []);

    return (
        <Card className="p-6">
            <header className="flex items-center gap-2 mb-4">
                <CiCircleInfo className="text-yellow-400 text-xl" />
                <p className="text-gray-400 text-sm">
                    Here you can create a new membership. A membership is a
                    service that you can sell to your regular customers.
                </p>
            </header>

            <DynamicForm
                formFields={[
                    {
                        name: "name",
                        label: "Name",
                        type: "text",
                        placeholder: "ex: Deluxe service",
                    },
                    {
                        name: "price",
                        label: "Price",
                        type: "text",
                        placeholder: "ex: 100",
                    },
                ]}
                isLoading={false}
                config={{
                    areFilters: false,
                    buttonLabel: "Create new membership",
                }}
                onSubmit={handleClick}
            />
        </Card>
    );
};
