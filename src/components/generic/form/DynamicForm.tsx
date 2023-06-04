import { Children } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { AiOutlineLoading } from "react-icons/ai";
import { useDyForm } from "./hooks/useDyForm";
import { FormField } from "@/kit/form/FormField";
import { Card, CardContent } from "@/kit/card/Card";
import type { IFormField } from "@/types/forms/form";
import type { IFormConfig } from "@/kit/form/types";

type Props = {
    formFields: IFormField[];
    config: IFormConfig;
    isLoading: boolean;
    submit: (values: any, actions: any) => void;
};

export const DynamicForm = ({
    formFields,
    isLoading,
    config,
    submit,
}: Props) => {
    const { initialValues, validationSchema } = useDyForm({ formFields });

    return (
        <Card>
            <CardContent className="p-6">
                <Formik
                    enableReinitialize
                    validationSchema={yup.object(validationSchema)}
                    initialValues={initialValues}
                    onSubmit={submit}
                >
                    {({ errors, isSubmitting, resetForm }) => (
                        <Form
                            // className={`grid grid-cols-1 md:grid-cols-${formFields.length + 1} gap-2 md:gap-4`}
                            className="flex flex-wrap items-stretch justify-start gap-2 md:gap-4 w-full"
                        >
                            {Children.toArray(
                                formFields.map((field) => (
                                    <FormField formField={field} />
                                ))
                            )}

                            <div className="flex flex-col items-center justify-end">
                                <button
                                    className="bg-yellow-400 text-white text-sm rounded-md py-[0.6rem] px-6"
                                    type="button"
                                    onClick={() => {
                                        resetForm();
                                    }}
                                >
                                    Clear filters
                                </button>
                            </div>
                            <div className="flex flex-col items-center justify-end">
                                <button
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 bg-blue-400 text-white text-sm rounded-md py-[0.6rem] px-6"
                                    type="submit"
                                >
                                    {isLoading && (
                                        <AiOutlineLoading className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                    )}
                                    {config?.buttonLabel ?? "Submit"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
};
