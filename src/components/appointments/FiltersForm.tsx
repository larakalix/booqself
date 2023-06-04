"use client";

import { Card } from "@/kit/card/Card";
import { DynamicForm } from "../generic/form/DynamicForm";
import type { IFormField } from "@/types/forms/form";
import type { IFormConfig } from "@/kit/form/types";

type Props = {
    formFields: IFormField[];
    config: IFormConfig;
    isLoading: boolean;
    submit: (values: any, actions: any) => void;
};

export const FiltersForm = ({
    formFields,
    isLoading,
    config,
    submit,
}: Props) => {
    return (
        <Card>
            <DynamicForm
                isLoading={isLoading}
                formFields={formFields}
                config={config}
                submit={submit}
            />
        </Card>
    );
};
