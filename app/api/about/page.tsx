import React from 'react'
import { FaInstagram } from 'react-icons/fa'
const about = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
    <div className="max-w-2xl text-center bg-gray-800 p-8 rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold mb-4 text-red-500">👻 About Ghost Stories</h1>
      <p className="text-lg text-gray-300">
        Welcome to a world of chilling tales, haunted places, and eerie mysteries. 
        Here, you will find stories that will send shivers down your spine and make 
        you question what lurks in the darkness. These are not just stories; they 
        are whispers from the unknown, waiting   to be heard.
      </p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-blue-400">👤 Created By</h2>
        <p className="text-lg font-medium">Harshit Kumbhkar</p>
        <p className="text-gray-400">@mr.harshprajapti</p>
      </div>

      <a
        href="https://www.instagram.com/mr.harshprajapti"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-xl font-semibold text-pink-400 hover:text-pink-500 transition"
      >
        <FaInstagram className="text-3xl" />
        Follow on Instagram
      </a>
    </div>
  </div>
  )
}

export default about
