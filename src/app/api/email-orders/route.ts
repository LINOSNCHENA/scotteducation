import { Resend } from "resend";
import { NextResponse } from "next/server";
import { resend3Key, EMAIL_MASTER } from "@/app/utils/ApiRoutes";
import { IOrderRequest, IResendSendEmailResult } from "@/app/types/Models.subscriptions";
import { createClient } from "@/app/composables/supabaseClient";
import EmailTemplate from "@/app/components/EmailTemplates/OrderEmail";
const supabase = createClient();
const masterEmail = EMAIL_MASTER;
const key = resend3Key;
const resend = new Resend(key);
const TableName = 'ordersv2';

// export async function POST(request: Request) {
// To:
export const POST = async (request: Request) => {
    try {
        console.log("Parsing order data from request...");
        const orderData: IOrderRequest = await request.json();
        const {
            plan_title,
            plan_price,
            plan_features,
            customer_name,
            customer_email,
            customer_phone,
            requirements,
        } = orderData;
        // Generate email content (React component)
        let emailContent;
        try {
            emailContent = EmailTemplate({
                username: customer_name,
                subject: `Order Confirmation: ${plan_title}`,
                message: `Thank you for your order of ${plan_title} (${plan_price}). I will contact you shortly.`,
                senderEmail: customer_email,
            });
            console.log("Email content generated successfully.");
        } catch (err) {
            console.error("Error generating email template:", err);
            throw new Error("Email template generation failed");
        }

        // Send email via Resend
        let emailResponse: IResendSendEmailResult;
        try {
            console.log("Sending email...");
            emailResponse = await resend.emails.send({
                from: "onboarding@resend.dev",
                to: [masterEmail],
                subject: `New Order: ${plan_title}`,
                react: emailContent,
            });
            console.log("Email send response:", emailResponse);
        } catch (err) {
            console.error("Error sending email:", err);
            throw new Error("Email sending failed");
        }

        const emailId = emailResponse.data?.id;
        const emailError = emailResponse.error;
        if (emailError || !emailId) {
            console.error("Email sending returned error or no ID:", emailError);
            throw new Error(emailError?.message || "Email sending failed - no email ID returned");
        }

        // Prepare order object to save
        const orderObject = {
            plan_title,
            plan_price,
            customer_name,
            customer_email,
            customer_phone,
            requirements,
            plan_features,
            status: "confirmed",
            email_id: emailId,
        };

        // Insert order into Supabase
        try {
            console.log("Saving order to Supabase...");
            const { data: supabaseData, error: supabaseError } = await supabase
                .from(TableName)
                .insert([orderObject])
                .select();

            if (supabaseError) {
                console.error("Supabase insert error:", supabaseError);
                // Return partial success because email succeeded
                return NextResponse.json(
                    {
                        success: true,
                        warning: "Order received but failed to save to database",
                        emailId,
                    },
                    { status: 200 }
                );
            }

            console.log("Order saved to Supabase with ID:", supabaseData[0].id);

            return NextResponse.json(
                {
                    success: true,
                    orderId: supabaseData[0].id,
                    emailId,
                    message: "Order processed successfully",
                },
                { status: 200 }
            );
        } catch (err) {
            console.error("Unexpected Supabase error:", err);
            throw err;
        }
    } catch (error) {
        console.error("Order processing error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Order processing failed",
            },
            { status: 500 }
        );
    }
}
