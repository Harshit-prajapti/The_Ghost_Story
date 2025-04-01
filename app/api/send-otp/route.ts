import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import uploadLocalFile from "@/lib/cloudinary";
import UserModel from "@/models/user";
import dbConnect from "@/lib/db";
import ApiError from "@/lib/apiError";
import ApiResponse from "@/lib/apiResponse";
import OtpModel from "@/models/otpModel";
import { sendVerificationEmail } from "@/app/helpers/sendVarificationEmail";
import axios from "axios";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const formDataToSend = await req.formData();
        const username = formDataToSend.get("formData[username]") as string;
        const email = formDataToSend.get("formData[email]") as string; 
        // Check for missing fields
        if ([email,username].some(field => !field || field.trim() === "")) {
            return Response.json(new ApiError(400,"Required fields are missing").toJSON());
        } 
        const existedUser = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (existedUser) {
            console.log("User already exists")
            return Response.json(new ApiError(400,"User already exists").toJSON());
        }
        const otpCode = Math.floor(100000 + Math.random()*900000).toString()
        const otp = await OtpModel.create({email,otpCode})
        if(!otp){
            console.log("Otp code not created")
            return Response.json(new ApiError(500,"Otp code not created").toJSON());            
          }
           
        const emailResponse = await sendVerificationEmail(email,username,otpCode,5)
        if(emailResponse.statusCode !== 200){
            return Response.json(new ApiError(500,emailResponse.message ||"Email for varification cant send").toJSON())            
        }
        console.log(emailResponse)
        return Response.json(new ApiResponse(200,"Otp send successfully"))
    } catch (error: any) {
        console.error("Error in user registration:", error); 
        return Response.json(new ApiError(error.message || "Server error", error.statusCode || 500));
           
    }
}
