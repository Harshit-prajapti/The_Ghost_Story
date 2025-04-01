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
import fs from "fs";
import axios from "axios";
export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = session?.user;
    if (!session) {
      console.log("Please login first");
      return Response.json(
        new ApiError(400, "Please login first to upload story").toJSON()
      );
    }
    const formData = req.formData();
    const title = (await formData).get("title") as string;
    const content = (await formData).get("content") as string;
    const thumbnail = (await formData).get("thumbnail") as File;
    const images = (await formData).get("images") as string;
    const publish = (await formData).get("publish") as unknown as boolean;
    console.log(content);
    let categories = []
    await dbConnect();
    const User = await UserModel.findOne({ email: user?.email });
    if (!User) {
      return Response.json(
        new ApiResponse(500, "User is not found in database")
      );
    }
    let imageUrl = "";
    // console.log("This is the user from database", User);
    try {
      if (thumbnail) {
        const arrayBuffer = await thumbnail.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const tempDir = path.join(process.cwd(), "tmp");
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

        const tempFilePath = path.join(tempDir, `${Date.now()}-${File.name}`);
        await writeFile(tempFilePath, buffer);

        const response = await uploadLocalFile(tempFilePath);
        fs.unlinkSync(tempFilePath);

        if (!response) {
          return Response.json(
            new ApiError(400, "thumbnail not uploaded to the cloudinary")
          );
        }
        imageUrl = response.secure_url;
      }
    } catch (error) {
      return NextResponse.json(
        new ApiError(400, "Error occuring create path for the file", error)
      );
    }
    const message = `You are an intelligent assistant trained to categorize ghost stories based on their content. 
Here is a list of valid categories:
1. Haunted Houses
2. Urban Legends
3. Cursed Places
4. Paranormal Encounters
5. Dark Folklore
6. Possession & Exorcism
7. Ghostly Revenge
8. Mysterious Disappearances
9. Creepy Dolls & Objects
10. True Crime Horror
11. Afterlife & Spirits
12. Horror Short Stories
Your task:
- Read the given ghost story.
- Analyze the theme, setting, and supernatural elements.
- if it is not a ghost story just send only NO - you can select multiple categories from the list above that best matches the story.
- Do not generate any categories outside this list.
- Respond with only the categories name, nothing else.
Here is the story:
${content}
            Now, choose the most appropriate category and return them as an array:`;

    const formData2 = new FormData();
    formData2.append("content", message);
    // console.log(formData2)
    try {
        const res = await axios.post("http://localhost:3000/api/ai", formData2, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        if(res.status !== 200){
            console.log(res)
            throw Response.json(new ApiResponse(200,"Ai is not working"))
        }
        categories = res.data.data
        console.log(categories)
        if(categories === "NO"){
          console.log("This is not a ghost story check it first")
          throw Response.json(new ApiResponse(400,"This is NOT a Ghost Story Please check out your story and try"))
        }        
    } catch (error) {
        // console.log(error)
        throw Response.json(new ApiError(400,"Ai is not working here"))
    }
    const story = await new StoryModel({
      title,
      content,
      images: images,
      thumbnail: imageUrl,
      ownerId: User._id,
      owner: User.username,
      isPublished: publish,
      categories : categories
    });
    story.save();
    return Response.json(
      new ApiResponse(200, story, "story uploaded successfully")
    );
  } catch (error) {
    console.log(error)
    return Response.json(new ApiError(400, "some error occured", error));
  }
}
// You are an intelligent assistant trained to categorize ghost stories based on their content.
// Here is a list of valid categories:
// 1. Haunted Houses
// 2. Urban Legends
// 3. Cursed Places
// 4. Paranormal Encounters
// 5. Dark Folklore
// 6. Possession & Exorcism
// 7. Ghostly Revenge
// 8. Mysterious Disappearances
// 9. Creepy Dolls & Objects
// 10. True Crime Horror
// 11. Afterlife & Spirits
// 12. Horror Short Stories
// Your task:
// - Read the given ghost story.
// - Analyze the theme, setting, and supernatural elements.
// - if it is not a ghost story just send only NO - you can select multiple categories from the list above that best matches the story.
// - Do not generate any categories outside this list.
// - Respond with only the categories name, nothing else.
// Here is the story:
// cricke is a very interesting game and very popular in india i play cricket daily.
// Now, choose the most appropriate category:
