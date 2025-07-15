// app/api/subscribe/route.ts

import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { resend3Key, EMAIL_MASTER } from "@/app/utils/Branding/ApiRoutes";
import SubscriptionEmail from "@/app/components/EmailTemplates/SubscriptionEmail";
import { ISubscription, IResendSendEmailResult } from "@/types/Models.subscriptions";
const resend = new Resend(resend3Key);
const MASTER_EMAIL = EMAIL_MASTER;
const TABLE = "subscriptions_pascal";

// export async function POST(request: Request) {
export const POST = async (request: Request) => {
    try {
        // 1. Parse incoming subscription data
        const incoming = (await request.json()) as Partial<ISubscription>;
        const {
            name,
            email,
            location = null,
            address = null,
            district = "xxx",
            compound = "xxx",
        } = incoming;

        // 2. Basic validation
        if (!name || !email) {
            return NextResponse.json(
                { success: false, error: "Missing required fields: name and email." },
                { status: 400 }
            );
        }

        // 3. Build subscription record
        const newSub: ISubscription = {
            name,
            email,
            location,
            address,
            district,
            compound,
            unsubscribed: "xxx",
            subscribed_at: new Date().toISOString(),
        };

        // 4. Insert into Supabase
        const { data, error: dbError } = await supabase
            .from(TABLE)
            .insert([newSub])
            .select("id");

        if (dbError) {
            console.error("Supabase insert error:", dbError);
            return NextResponse.json(
                { success: false, error: "Database insert failed." },
                { status: 500 }
            );
        }

        const subscriberId = data?.[0].id;

        // 5. Send notification email via Resend
        try {
            console.log("Sending notification email...");
            const emailResponse: IResendSendEmailResult = await resend.emails.send({
                from: "onboarding@resend.dev",       // Must be a verified sender
                to: [MASTER_EMAIL],
                subject: `New Subscription: ${name}`,
                reply_to: email,
                text: `
                Name: ${name}
                Email: ${email}
                Subject: ${district}
                Message: ${address}`,
                react: SubscriptionEmail({ name, email, district, compound, location }),
            });
            console.log("Email send response:", emailResponse);
        } catch (err) {
            console.error("Error sending email:", err);
        }

        // 6. Return success with the new subscriber ID
        return NextResponse.json(
            { success: true, subscriberId },
            { status: 201 }
        );
    } catch (err) {
        console.error("Subscribe API error:", err);
        return NextResponse.json(
            { success: false, error: (err as Error).message || "Unknown error." },
            { status: 500 }
        );
    }
}
