'use client'
import getServerSission from 'next-auth/react';
import { useSession, signIn, signOut } from 'next-auth/react';
export default function AuthComponent(){
    const {data : session} = useSession()

    if(session){
        return(
            <>
            <div>
                <h1>Welocome,{session.user?.name}</h1>
                <button onClick={()=>{signOut()}}>Sign Out</button>
            </div>
            </>
        )
    }
    return <button onClick={()=>{signIn()}}>Sign In</button>
}