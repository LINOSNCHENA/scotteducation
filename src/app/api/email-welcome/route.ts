// 
// Data
//
import { resend3Key, EMAIL_MASTER } from "@/app/utils/Branding/ApiRoutes";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailResponse } from "./types";
import EmailTemplate from "@/app/components/EmailTemplates/OrderEmail";

const masterEmail = EMAIL_MASTER
const key = resend3Key
// ==================================================
const idData = { masterEmail, key }
const resend = new Resend(idData.key);

// export async function POST(request: Request) {

export const POST = async (request: Request) => {
    try {
        const { username, message, subject, senderEmail } = await request.json();
        const react = EmailTemplate({ username, subject, message, senderEmail });
        const x = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [idData.masterEmail],
            subject: String('Welcome Package : ' + masterEmail),
            react: react,// EmailTemplate({ username, message }),
        });
        const emailData: EmailResponse = {
            id: String(x.id),
            from: 'onboarding@resend.dev',
            to: [idData.masterEmail],
            subject: String('Welcome Package : ' + masterEmail),
            html: String(react),
        };
        console.log("=========================|Welcomes-API|============32================")
        console.log(emailData);
        console.log(x);
        console.log("=========================|wELCOME-keys|============35================")
        return NextResponse.json(emailData);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}

