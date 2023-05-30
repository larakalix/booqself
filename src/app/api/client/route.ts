import { NextResponse } from "next/server";
import { Client, ClientAttributes } from "@/types/strapi/clients";
import { IClient } from "@/types/models/clients";
import { IEntity } from "@/types/strapi/generic";

export async function GET(request: Request) {
    try {
        const response = await fetch(`${process.env.NEXT_STRAPI_URL}/clients`);
        const { data, meta } = await response.json();

        const clients: IClient[] = data.map(
            ({ id, attributes }: IEntity<ClientAttributes>) => ({
                id,
                ...attributes,
            })
        );

        return NextResponse.json({ clients, meta });
    } catch (err: any) {
        console.log("Error: ", err);
        return new Response("Bad Request: data not found.", {
            status: 500,
        });
    }
}
