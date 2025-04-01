import ApiResponse from "@/lib/apiResponse";
import { auth } from "@/lib/auth";
import UserModel from "@/models/user";
export async function GET() {
  const session = await auth();
  const email = session?.user?.email
  if(!session){
    return Response.json(new ApiResponse(400,"Please login first"))
  }
  const user = await UserModel.findOne({email})
  console.log(user);

  return Response.json(new ApiResponse(200,user,"User found successfully"));
}