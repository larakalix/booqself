import { ApiClient, EnvelopesApi } from "docusign-esign";
import path from "path";
import fs from "fs";

export async function GET(request: Request) {
    const jsonDirectory = path.join(process.cwd(), "public");
    const rsaKey = await fs.readFileSync(
        jsonDirectory + "/private.key",
        "utf8"
    );
    const dsPath = process.env.NEXT_DOCUSIGN_API!;

    // const apiClient = new ApiClient({
    //     basePath: dsPath,
    //     oAuthBasePath: "https://account-d.docusign.com",
    // });

    // const results = await apiClient.requestJWTUserToken(
    //     process.env.INTEGRATION_KEY!,
    //     process.env.USER_ID!,
    //     ["signature"],
    //     Buffer.from(rsaKey),
    //     3600
    // );

    return new Response("Ok", {
        status: 400,
    });
}

// export async function POST(request: Request) {
//     const body = await request.json();

// return new Response("Ok", {
//     status: 400,
// });
// }
