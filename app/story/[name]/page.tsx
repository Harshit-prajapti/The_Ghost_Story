'use client'
import { useParams } from "next/navigation";

export default function StoryName() {
    const param = useParams()
    return <h1 className="bg-gray-700 font-bold">{param.name}</h1>
}   