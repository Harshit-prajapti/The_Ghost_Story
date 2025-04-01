import StoryModel from "@/models/story";
import dbConnect from "@/lib/db";
import UserModel from "@/models/user";
import ApiResponse from "@/lib/apiResponse";
import { auth } from "@/lib/auth";
import { writeFile, unlink } from "fs/promises";
import path, { join } from "path";
import ApiError from "@/lib/apiError";
import uploadLocalFile from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import fs from "fs"
export async function POST(req:Request){
    try {
        const session = await auth();
        const user = session?.user
        if(!session){
            console.log("Please login first")
            return Response.json(new ApiError(400,"Please login first to upload story").toJSON())
        }
        const formData = req.formData();
        const title = (await formData).get("title") as string
        const content = (await formData).get("content") as string
        const thumbnail = (await formData).get("thumbnail") as File
        const images = (await formData).get("images") as string
        const publish = (await formData).get("publish") as unknown as boolean
        console.log(publish, title, content, thumbnail, images)
        
        await dbConnect()
        const User =  await UserModel.findOne({email : user?.email})
        if(!User){
            return Response.json(new ApiResponse(500,"User is not found in database"))
        }
        let imageUrl = ""
        console.log("This is the user from database",User)
        try {
            if(thumbnail){
                const arrayBuffer = await thumbnail.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
    
                const tempDir = path.join(process.cwd(),"tmp");
                if(!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

                const tempFilePath = path.join(tempDir,`${Date.now()}-${File.name}`)
                await writeFile(tempFilePath,buffer)

                const response = await uploadLocalFile(tempFilePath)
                fs.unlinkSync(tempFilePath)

                if(!response){
                    return Response.json(new ApiError(400,"thumbnail not uploaded to the cloudinary"))
                }
                imageUrl = response.secure_url
            }
        } catch (error) {
            return NextResponse.json(new ApiError(400,"Error occuring create path for the file",error))
        }
        const story = await new StoryModel({
            title,
            content,
            images : images,
            thumbnail : imageUrl,
            ownerId : User._id,
            owner : User.username,
            isPublished : publish
        })
        story.save();
        return Response.json(new ApiResponse(200,story,"story uploaded successfully"))
    } catch (error) {
        return Response.json(new ApiError(400,"some error occured",error))
    }
}
