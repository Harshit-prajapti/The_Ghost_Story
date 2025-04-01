'use client'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import ApiResponse from '@/lib/apiResponse'
import { useEffect } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { FileText, Mail, Phone } from 'lucide-react'
interface User {
  avatar: string;
  username : string;
  email : string;
  bio:string;
  fullname : string;
  password : string;
  mobileNumber : number
}
const Profile = () => {
  const [data, setData] = useState<User>()
  const {data:session,status} = useSession()
  if(status === "loading"){
    return <p>Loading...</p>
  }
  if(!session){
    return <p>Login first</p>
  }
  const getDetails = async() => {
    const res = await axios.get("/api/test-session")
    if(!res){
      return Response.json(new ApiResponse(200,"user not found"))
    }
    setData(res.data.data)
    console.log(data)
    console.log("data from api",data)
    return Response.json(new ApiResponse(200,res,"user found successfully"))
  }
  useEffect(()=>{
    getDetails();
  },[])
  return (
    <Card className="mt-28 max-w-md mx-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
    <CardContent className="flex flex-col items-center space-y-4">
      {/* Avatar */}
      <Avatar className="w-24 h-24 border-4 border-white shadow-md">
        <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User Avatar" />
        <AvatarFallback>HK</AvatarFallback>
      </Avatar>

      {/* User Info */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">{data?.fullname}</h2>
        <p className="text-gray-200">@{data?.username}</p>
      </div>

      {/* Details */}
      <div className="space-y-2 w-full text-sm">
        <div className="flex items-center space-x-3 bg-white/20 p-2 rounded-lg">
          <Mail size={20} className="text-yellow-300" />
          <span>{data?.email}</span>
        </div>
        <div className="flex items-center space-x-3 bg-white/20 p-2 rounded-lg">
          <Phone size={20} className="text-green-300" />
          <span>{data?.mobileNumber}</span>
        </div>
        <div className="flex items-center space-x-3 bg-white/20 p-2 rounded-lg">
          <FileText size={20} className="text-pink-300" />
          <span>{data?.bio}</span>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}

export default Profile
