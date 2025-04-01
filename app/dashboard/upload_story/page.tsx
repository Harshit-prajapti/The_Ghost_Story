"use client";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";
const countWords = (text: string) => text.trim().split(/\s+/).length;
import Image from "next/image";
import { FaHeart, FaEye, FaComment } from "react-icons/fa";
import { title } from "process";
const storySchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(30, "Title too long"),

  content: z
    .string()
    .refine((text) => countWords(text) >= 10, {
      message: "Story must be at least 500 words long",
    })
    .refine((text) => countWords(text) <= 4000, {
      message: "Story is too long",
    }),

  thumbnail: z.instanceof(File, { message: "Thumbnail must be an image file" }),

  images: z.instanceof(File).optional(),
  publish: z.boolean().default(false),
});

interface Data{
  title : string,
  content : string,
  likes : number,
  views : number,
  thumbnail : string,
  comments : [{}],
  images : [string],
  isPublished : boolean,
  owner : string,
  ownerId : string,

}
type StoryFormValue = z.infer<typeof storySchema>;
const UploadStory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [flage, setFlage] = useState<boolean>(false)
  const [res,setRes] = useState<Data>()
  const form = useForm<StoryFormValue>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: undefined,
      publish: false, // Default value for the checkbox
    },
  });

  
  const onSubmit = async (data: StoryFormValue) => {
    setLoading(true);
    setMessage("Please wait it will tack some time");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("thumbnail", data.thumbnail);
    formData.append("publish", String(data.publish));
    if (data.images) {
      formData.append("images", data.images);
    }

    try {
      const res = await axios.post("/api/upload_story", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response from the API",res)
      if (res.data.statusCode === 200) {
        setRes(res.data.data)
        setFlage(true)
        console.log(res)
        setMessage("Story uploaded successfully");
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error("Error occuring via upload file ",error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {!flage ? (<div className="mt-16  p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload a New Story</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter story title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content Field */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Story</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your story here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thumbnail Field */}
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Upload Thumbnail</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="mt-4 text-left text-green-700">
            We will upload your image according to the flow of the story
          </p>

          {/* Images Field */}
          <FormField
            control={form.control}
            name="images"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Upload Images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => onChange([...e.target.files!])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publish"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Publish Story</FormLabel>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Submit"}
          </Button>
        </form>
      </Form>

      {message && <p className="mt-4 text-center font-bold">{message}</p>}
    </div>) : (<>
      <div className="mt-18 bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto border border-gray-700 overflow-hidden relative">
      {res?.thumbnail && (
        <div className="w-full h-72 relative mb-6 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={res?.thumbnail}
            alt={res?.title}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
      )}
      <h2 className="text-4xl font-extrabold mb-4 text-indigo-400 drop-shadow-lg">{res?.title}</h2>
      <p className="text-gray-300 mb-6 text-lg leading-relaxed">{res?.content}</p>
      <div className="flex justify-between items-center text-gray-400 text-md mb-6">
        <span className="flex items-center gap-2">
          <FaEye className="text-yellow-400 text-xl" /> {res?.views}
        </span>
        <span className="flex items-center gap-2">
          <FaHeart className="text-red-500 text-xl" /> {res?.likes}
        </span>
        <span className="flex items-center gap-2">
          <FaComment className="text-blue-400 text-xl" /> {res?.comments.length}
        </span>
      </div>
      <div className="flex justify-between items-center border-t border-gray-700 pt-4">
        <span
          className={`px-4 py-2 rounded-lg text-lg font-semibold tracking-wide shadow-md transition-all ${
            res?.isPublished ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {res?.isPublished ? "Published" : "Unpublished"}
        </span>
        <span className="text-md text-gray-400 font-medium">📅 24/03/2005</span>
      </div>
    </div>
    </>)}
    </>
  );
};

export default UploadStory;
