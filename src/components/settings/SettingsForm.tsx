import { Children } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { useRegisterForm } from "../register/hooks/useRegisterForm";
import { FormField } from "@/kit/form/FormField";
import type { IFormField } from "@/types/forms/form";
import type { ITenantAttributes } from "@/types/models/tenant";
import { TenantService } from "@/services/tenant/TenantService";

type Props = {
    loading: boolean;
    formFields: IFormField[];
    tenant: ITenantAttributes | null;
};

export const SettingsForm = ({ loading, tenant, formFields }: Props) => {
    const { initialValues, validationSchema } = useRegisterForm({ formFields });

    return (
        <div className="flex flex-col w-full p-4 md:p-14 xl:max-w-4xl">
            <Formik
                enableReinitialize
                validationSchema={yup.object(validationSchema)}
                initialValues={tenant ?? initialValues}
                onSubmit={async (values, actions) => {
                    if (!tenant) return;

                    const {
                        name,
                        email,
                        cloverMerchantId,
                        minutesInterval,
                        openingTime,
                        closingTime,
                        isActive,
                    } = values;

                    console.log(values);

                    // const response = await TenantService().update(
                    //     {
                    //         id: tenant.id,
                    //         tenantId: tenant.tenantId,
                    //         name,
                    //         email,
                    //         cloverMerchantId,
                    //         minutesInterval,
                    //         openingTime,
                    //         closingTime,
                    //         isActive,
                    //     },
                    //     tenant?.id
                    // );

                    // if (response?.id) {
                    //     //actions.resetForm();
                    //     console.log(response);
                    // }

                    actions.setSubmitting(false);
                }}
            >
                {({ values, errors, isSubmitting }) => (
                    <Form className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
                        {Children.toArray(
                            formFields.map((field) => (
                                <FormField formField={field} />
                            ))
                        )}

                        <button
                            disabled={isSubmitting || loading}
                            className="col-span-1 lg:col-span-2 bg-blue-400 text-white rounded-md py-4 px-8"
                            type="submit"
                        >
                            Save settings
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
