import { Steps } from "@/components/home/Steps";
import { PageWrapper } from "@/components/wrapper/PageWrapper";
import type { IFormField } from "@/types/form";

async function getData() {
    const res = await fetch(`${process.env.NEXT_API_URL}/form-field`);
    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json();
}

export default async function Register() {
    const { formFields } = await getData();

    return (
        <PageWrapper>
            <Steps formFields={formFields as IFormField[]} />
        </PageWrapper>
    );
}
