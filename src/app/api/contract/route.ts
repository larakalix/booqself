import { NextRequest, NextResponse } from "next/server";
import { ApiClient, EnvelopesApi } from "docusign-esign";
import { transporter } from "@/utils/nodemailer";
import path from "path";
import fs from "fs";
import { PDFDocument } from "pdf-lib";

async function convertBase64ToPDF(base64String: string, fileName: string) {
    // Remove the "data:image/png;base64," prefix from the base64 string
    const base64Data = base64String.replace(/^data:image\/png;base64,/, "");

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Decode the base64 data and add it as an image to the PDF document
    const imageBytes = Uint8Array.from(Buffer.from(base64Data, "base64"));
    const image = await pdfDoc.embedPng(imageBytes);
    const page = pdfDoc.addPage();
    page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
    });

    // Generate a buffer containing the PDF document
    const pdfBytes = await pdfDoc.save();

    // Generate a unique file name for the PDF
    const filePath = path.join(__dirname, fileName);

    // Write the PDF buffer to a file
    fs.writeFileSync(filePath, pdfBytes);

    // Return an object that can be used as an attachment with Nodemailer
    return {
        filename: fileName,
        path: filePath,
        contentType: "application/pdf",
    };
}

export async function GET(request: Request) {
    // const jsonDirectory = path.join(process.cwd(), "public");
    // const rsaKey = await fs.readFileSync(
    //     jsonDirectory + "/private.key",
    //     "utf8"
    // );
    // const dsPath = process.env.NEXT_DOCUSIGN_API!;

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

export async function POST(request: NextRequest) {
    const { assignee, contract } = await request.json();

    if (
        !assignee ||
        !assignee.name ||
        !assignee.lastName ||
        !assignee.email ||
        !contract
    ) {
        return NextResponse.json({
            status: 400,
            body: { message: "Error, missing data" },
        });
    }

    try {
        const filename = `Contract-${new Date()
            .toLocaleDateString()
            .replace(/\//g, "")}.pdf`;
        const attachment = await convertBase64ToPDF(contract, filename);

        const jsonDirectory = path.join(process.cwd(), "public");
        const htmlPath = await fs.readFileSync(
            jsonDirectory + "/contract.html",
            "utf8"
        );

        const html = htmlPath
            .replace(/{{name}}/g, assignee.name)
            .replace(/{{last_name}}/g, assignee.lastName);

        await transporter.sendMail({
            from: process.env.NEXT_EMAIL!,
            to: assignee.email,
            subject: `${assignee.name} ${
                assignee.lastName
            } - Contract ${new Date().toLocaleDateString()}`,
            html,
            attachments: [attachment],
        });

        return NextResponse.json({
            status: 200,
            body: {
                message: `Contract sent to ${assignee.name} ${assignee.lastName}`,
            },
        });
    } catch (error) {
        console.log("error", error);
        return NextResponse.json({
            status: 400,
            body: { message: "Bad Request" },
        });
    }
}
