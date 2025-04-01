'use client'
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { ObjectId } from 'mongoose'
interface Story {
  _id: string;
  title: string;
  content: string;
  images: string | null;
  thumbnail: string;
  isPublished: boolean;
  likes: number;
  views: number;
  owner: string;
  ownerId: string;
  comments : []
}
const page = () => {
  const [stories, setStories] = useState<Story[]>([])
  useEffect(()=>{
    const fetchData = async() => {
      try {
        const res = await axios.get("/api/myStory")
        const data = res.data.data[0].my_stories || []
        setStories(data)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
  }
  fetchData()
  },[])



  return (
    <>
     <div className="bg-gray-30 min-h-screen w-full p-6">
            {/* <h1 className="text-white text-2xl font-bold mb-4">Top Ghost Stories</h1> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-7">
                {stories?.map((story) => (
                    <div key={story._id} className="bg-white rounded-lg p-4 shadow-lg hover:shadow-2xl transition">
                      <img className='w-full h-60 mb-5 rounded-xl shadow-lg border-2-transparent relative overflow-hidden' src={story.thumbnail} alt="" />
                        <h2 className="text-gray-900 text-lg font-semibold">{story.title}</h2>
                        <p className="text-gray-800 text-sm mt-2">
                            {story.content.slice(0, 100)}...
                        </p>
                        <div className="flex justify-between text-gray-500 text-xs mt-3">
                            <span>👍 {story.likes}</span>
                            <span>💬 {story.comments.length}</span>
                            <span>👁️ {story.views}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  </>
  )
}

export default page
