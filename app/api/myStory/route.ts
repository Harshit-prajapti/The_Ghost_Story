import ApiResponse from "@/lib/apiResponse";
import { auth } from "@/lib/auth";
import StoryModel from "@/models/story";
import UserModel from "@/models/user";
import { ObjectId } from "mongoose";
export async function GET(req:Request){
    interface UserWithStories extends Document {
        _id: ObjectId;
        email: string;
        username: string;
        my_stories: {
            _id: ObjectId;
            title: string;
            content: string;
            images: string[];
            thumbnail: string;
            owner: string;
            ownerId: ObjectId;
            categories: string[];
            views: number;
            likes: number;
            comments: {
                userId: ObjectId;
                username: string;
                comment: string;
                likes: number;
            }[];
            isPublished: boolean;
        }[];
    }
    const session = await auth();
    if(!session){
        return Response.json(new ApiResponse(400,"Please login first"))
    }
    const user = session?.user
    // console.log(user)
    const res =  await UserModel.aggregate<UserWithStories>([
        {
            $match : {email : user?.email}
        },
        {
            $lookup : {
                from : "stories",
                localField : "_id",
                foreignField : "ownerId",
                as : "my_stories"
            }
        },
        {
            $project : {my_stories : 1, _id : 0}
        }
    ])
    console.log("This is the response ",res)
    return Response.json(new ApiResponse(200,res,"stories find successfully"))
}