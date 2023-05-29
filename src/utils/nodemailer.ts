import nodemailer from "nodemailer";

const email = process.env.NEXT_EMAIL;
const pass = process.env.NEXT_EMAIL_PWD;

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass,
    },
});
