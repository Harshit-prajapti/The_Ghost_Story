
import ApiResponse from "@/lib/apiResponse";
import { auth } from "@/lib/auth";
import StoryModel from "@/models/story";
import { Engagement } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:Request){
    const session = await auth();
    const user = session?.user
    console.log(user)
    if(!user){
        throw Response.json(new ApiResponse(400,"User not logged in"))
    }
    try {
        const stories = await StoryModel.aggregate([
            {
                $addFields : {
                    engagementScore : {
                        $add : [
                            {$multiply : ["$likes",2]},
                            "$commentsCount",
                            { $divide: ["$views", 10] } // Lesser weight for views
                        ]
                    }
                }
            },
            {$sort : {engagementScore : -1,createdAt : -1}},
            {$limit : 10}
        ])
        return Response.json(new ApiResponse(200,stories,"Stories find successfully"))
    } catch (error) {
        return NextResponse.json({error : "Failed to fetch stories"},{status : 500})
    }
}