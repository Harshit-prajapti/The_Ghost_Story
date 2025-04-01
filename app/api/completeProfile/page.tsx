"use client";
import { useState, useRef } from "react";
import { UploadCloud } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import UserModel from "@/models/user";
import { exit } from "process";
import { useForm } from "react-hook-form";
interface User {
  avatar: string;
  username : string;
  email : string;
  bio:string;
  fullname : string;
  mobileNumber : number
}
export default function AvatarUploader() {
  const [image, setImage] = useState<string | null>(null);
  const [data,setData] = useState<User>()
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {data : session} = useSession();
  const user = session?.user
    async function findUser(){
      const myUser = await UserModel.findOne({email : user?.email})
      if(!myUser){ 
        window.alert("Something went wrong")
        return
      }
      setData(myUser)
      return myUser
    }
    const myUser = findUser();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex flex-col mt-24 border-2xl shadow-2xl h-80 items-center">
        <div>
            <h1 className="text-gray-500 m-5">Avatar Image</h1>
        </div>
      <div
        className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer bg-gray-100 overflow-hidden"
        onClick={() => fileInputRef.current?.click()}
      >
       <div>
            <h3>{user?.name}</h3>
        </div>
        {image ? (
          <img src={image} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <UploadCloud className="text-gray-500 w-10 h-10" />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <p>{}</p>
    </div>
  );
}

