import ApiResponse from "@/lib/apiResponse";
import { auth } from "@/lib/auth";
import StoryModel from "@/models/story";
import UserModel from "@/models/user";
export async function GET(req:Request){
    const session = await auth();
    if(!session){
        return Response.json(new ApiResponse(400,"Please login first"))
    }
    const user = session?.user
    // console.log(user)
    const res =  await UserModel.aggregate([
        {
            $match : {email : user?.email}
        },
        {
            $lookup : {
                from : "storymodels",
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