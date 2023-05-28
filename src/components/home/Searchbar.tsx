import { Formik, Form, FormikHelpers } from "formik";
import * as yup from "yup";
import { AiOutlineSearch } from "react-icons/ai";
import { FormField } from "@/kit/form/FormField";

import type { IFormField } from "@/types/form";

type FormProps = {
    search: string;
};

const initialValues: FormProps = {
    search: "",
};

const validationSchema = yup.object().shape({
    search: yup
        .string()
        .required("Search param is required")
        .min(3, "Too Short!"),
});

export const Searchbar = () => {
    return (
        <div className="mb-8">
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(false);
                }}
            >
                {({ errors, isSubmitting }) => (
                    <Form className="flex relative">
                        {/* <FormField
                            label="Search"
                            name="search"
                            disabled={false}
                            isSubmitting={isSubmitting}
                            hideLabel
                        /> */}

                        <button
                            disabled={isSubmitting}
                            className="text-black rounded-md px-4"
                            type="submit"
                        >
                            <AiOutlineSearch className="text-xl" />
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
