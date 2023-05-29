import { NextResponse } from "next/server";
import type { IFormField } from "@/types/form";

export async function GET(request: Request) {
    const formFields: IFormField[] = [
        { type: "text", label: "Name", name: "name", required: true },
        { type: "text", label: "Last Name", name: "lastName", required: true },
        { type: "text", label: "Email", name: "email", required: true },
        { type: "text", label: "Phone", name: "phone", required: true },
        // {
        //     type: "checkbox",
        //     label: "Services",
        //     name: "services",
        //     options: [
        //         { label: "Service 1", value: "service1" },
        //         { label: "Service 2", value: "service2" },
        //         { label: "Service 3", value: "service3" },
        //     ],
        // },
        {
            type: "radio",
            label: "Services",
            name: "services",
            required: true,
            options: [
                {
                    label: "Facial",
                    value: "service1",
                },
                {
                    label: "Botox",
                    value: "service2",
                },
                {
                    label: "Eyebrows",
                    value: "service3",
                },
            ],
        },
        {
            type: "dropdown",
            label: "Store Branch",
            name: "storeBranch",
            required: true,
            options: [
                { label: "Pompano Beach", value: "pBbranch" },
                { label: "Fort Lauderdale", value: "ftlBranch" },
                { label: "Miami", value: "mmBranch" },
            ],
        },
        {
            type: "switch",
            label: "Enable Notifications",
            name: "notifications",
        },
    ];

    try {
        return NextResponse.json({ formFields });
    } catch (err: any) {
        return new Response("Bad Request: data not found.", {
            status: 500,
        });
    }
}
