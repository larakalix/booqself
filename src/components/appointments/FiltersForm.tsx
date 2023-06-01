"use client";

import { Card } from "@tremor/react";
import type { IFormField } from "@/types/forms/form";
import { DynamicForm } from "../generic/form/DynamicForm";
import type { IFormConfig } from "@/kit/form/types";

type Props = {
    formFields: IFormField[];
    config: IFormConfig;
    submit: (values: any, actions: any) => void;
};

export const FiltersForm = ({ formFields, config, submit }: Props) => {
    return (
        <Card>
            <DynamicForm
                formFields={formFields}
                config={config}
                submit={submit}
            />
        </Card>
    );
};
