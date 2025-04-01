// "use clien   t"
import dbConnect from "@/lib/db"
// import { POST } from "./send-otp/route"
import fs from "fs"
import ApiError from "@/lib/apiError";
import OtpModel from "@/models/otpModel";
import ApiResponse from "@/lib/apiResponse";
import { NextResponse } from "next/server";
import UserModel from "@/models/user";
// import bcrypt from "bcrypt";
import bcrypt from "bcrypt"
// import { useState } from "react";
// import Email from "next-auth/providers/email"


export async function POST(req:Request){
    // const[error,setError] = useState("")
    // setError("")
    try {
        console.log("db connected , now verifying otp code")
        const formData = await req.formData();
        console.log(formData)
        const username = formData.get('formData[username]') as string;
        const fullname = formData.get('formData[fullname]') as string;
        const email = formData.get('formData[email]') as string;
        const password = formData.get('formData[password]') as string;
        const bio = formData.get('formData[bio]') as string;
        const mobileNumber = formData.get('formData[mobileNumber]') as unknown as number;
        const otpCode = formData.get('formData[otpCode]') as string;
        
        console.log(username,fullname,email,password,bio,mobileNumber,otpCode)  
        const otp = await OtpModel.findOneAndDelete({email})
        console.log(otp)
        if(!otp){
            // setError("Invalid otp code")
            return Response.json(new ApiResponse(500,"Invalid otp code!"))
        }
        if(otp.otpCode !== otpCode){
            console.log("Invalid otp code")
            // setError("Invalid otp code")
            return Response.json(new ApiResponse(400,"Invalid otp code"))
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user =  await UserModel.create({username,fullname,password : hashedPassword,email,bio,mobileNumber})
        if(!user){
            console.log("User not created")
            return Response.json(new ApiError(500,"User not created"))
        }
        return Response.json(new ApiResponse(200,user,"User created Successfully"))
    } catch (error) {
        console.error("Error in verifying otp code:", error);
        return Response.json(new ApiError(500,"We are unable to verify your otp code! Please try again"))
    }
}





