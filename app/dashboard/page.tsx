'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
interface Story{
  _id : string,
  title : string,
  content : string,
  thumbnail : string,
  likes : number,
  commentCount : number,
  views : number,
  comments : [],
}
export default function HomePage(){
  const [stories, setStories] = useState<Story[]>()
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(()=>{
    
      async function fetchStories() {
        try {
          const res = await axios.get("/api/stories");
          console.log(res)
          setStories(res.data.data)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
    fetchStories();
  }, []);
  if(loading === true) return <p className='text-white text-center'>Loading Stories...</p>
  return (
    <div className="min-h-screen dark:bg-warmstone-900 w-full p-6">
            {/* <h1 className="text-white text-2xl font-bold mb-4">Top Ghost Stories</h1> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-7">
                {stories?.map((story) => (
                    <div key={story._id} className="rounded-lg dark:bg-black p-4 shadow-lg hover:shadow-2xl transition">
                      <img className='w-full h-60 mb-5 rounded-xl shadow-lg border-2-transparent relative overflow-hidden' src={story.thumbnail} alt="" />
                        <h2 className="text-gray-900 dark:text-white text-lg font-semibold">{story.title}</h2>
                        <p className="text-gray-800 dark:text-white text-sm mt-2">
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
  )
}
