'use client'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
const page = () => {
    const fetchData = async() => {
        const res = await axios.get("/api/myStory")
        console.log(res)
    }
    fetchData()
  return (
    <div>
      This is the my story page
    </div>
  )
}

export default page
