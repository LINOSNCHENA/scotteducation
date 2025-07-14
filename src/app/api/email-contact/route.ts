// app/api/contact/route.ts

import { ContactFormEmail } from '@/app/components/EmailTemplates/OnBoardingEmail';
import { resend3Key, EMAIL_MASTER } from '@/app/utils/Branding/ApiRoutes';
import { Resend } from 'resend';
const masterEmail = EMAIL_MASTER
const key = resend3Key;
// ==================================================
const idData = { masterEmail, key }
const resend = new Resend(idData.key);

export async function POST(req: Request) {
    const body = await req.json();
    const { username, senderEmail, subject, message } = body;

    console.log("============================|email-Contacts|============1==========")
    const x = ContactFormEmail({ username, subject, senderEmail, message });
    console.log(x);
    console.log(subject)
    console.log(message)
    console.log(body)
    console.log("============================|email-Contacts|============2==========");
    console.log(senderEmail)
    console.log("============================|email-Senders|==============3==========");
    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [idData.masterEmail],
            subject: `Request and Contact Form: ${subject}`,
            reply_to: masterEmail,
            text: `
            Name : ${username}
            EmailSenders  : ${senderEmail}
            EmailReciever : ${masterEmail}
            Subject : ${subject}
            Message : ${message}`,
            react: ContactFormEmail({ username, subject, senderEmail, message }),
        }
        );
        return new Response(JSON.stringify({ success: true, data }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error }), { status: 500 });
    }
}