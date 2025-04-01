import { resend } from "@/lib/resend";
import React from "react";
import ResendOtpEmail from "../components/EmailTemplate";
import ApiResponse from "@/lib/apiResponse";
import ApiError from "@/lib/apiError";

export async function sendVerificationEmail(
    email: string,
    username: string,
    otpCode: string,
    timeLimit: number
): Promise<ApiResponse> {
    try {
       const response = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Verification Code",
            react : React.createElement(ResendOtpEmail,{username, otpCode, timeLimit})
        });

        return new ApiResponse(200, response, "Verification email sent successfully");
    } catch (error: any) {
        console.error("Email sending error:", error);
        return new ApiError(500, "Verification email could not be sent.");
    }
}
