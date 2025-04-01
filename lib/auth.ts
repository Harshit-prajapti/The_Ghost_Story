
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { cookies } from "next/headers"; // ⬅️ Ensure session cookies are available
export async function auth(){
    const session = await getServerSession(options);
    return session;
}   