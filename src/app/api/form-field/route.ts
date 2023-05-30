import { NextResponse } from "next/server";
import { GraphQLClient } from "graphql-request";
import type { Form } from "@/types/strapi/forms";
import type { IFormField } from "@/types/form";
import { getFormById } from "@/queries/getFormById";

export async function GET(request: Request) {
    // const formFields: IFormField[] =  [
    //     { type: "text", label: "Name", name: "name", required: true },
    //     { type: "text", label: "Last Name", name: "lastName", required: true },
    //     { type: "text", label: "Email", name: "email", required: true },
    //     { type: "text", label: "Phone", name: "phone", required: true },
    //     // {
    //     //     type: "checkbox",
    //     //     label: "Services",
    //     //     name: "services",
    //     //     options: [
    //     //         { label: "Service 1", value: "service1" },
    //     //         { label: "Service 2", value: "service2" },
    //     //         { label: "Service 3", value: "service3" },
    //     //     ],
    //     // },
    //     {
    //         type: "radio",
    //         label: "Services",
    //         name: "services",
    //         required: true,
    //         options: [
    //             {
    //                 label: "Facial",
    //                 value: "service1",
    //             },
    //             {
    //                 label: "Botox",
    //                 value: "service2",
    //             },
    //             {
    //                 label: "Eyebrows",
    //                 value: "service3",
    //             },
    //         ],
    //     },
    //     {
    //         type: "dropdown",
    //         label: "Store Branch",
    //         name: "storeBranch",
    //         required: true,
    //         options: [
    //             { label: "Pompano Beach", value: "pBbranch" },
    //             { label: "Fort Lauderdale", value: "ftlBranch" },
    //             { label: "Miami", value: "mmBranch" },
    //         ],
    //     },
    //     {
    //         type: "switch",
    //         label: "Enable Notifications",
    //         name: "notifications",
    //     },
    // ];

    try {
        const id = 1;
        const client = new GraphQLClient(
            `${process.env.NEXT_STRAPI_URL}/graphql`
        );
        const form: Form = await client.request(getFormById, { id });
        // const response = await fetch(`${process.env.NEXT_STRAPI_URL}/graphql`);
        // const form: Form = await response.json();

        console.log("Form: ", form);

        const formFields: IFormField[] = [];
        // form.data.attributes.form_fields.data.map(({ id, attributes }) => {
        //     const { label, name, isRequired } = attributes;
        //     return {
        //         id,
        //         type: "text",
        //         label,
        //         name,
        //         required: isRequired,
        //     };
        // });

        return NextResponse.json({ formFields });
    } catch (err: any) {
        console.log("Error: ", err);
        return new Response("Bad Request: data not found.", {
            status: 500,
        });
    }
}
