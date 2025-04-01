"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  const {data:session,status} = useSession();
  useEffect(()=>{
    if(session){
      router.push("/dashboard")
    }
  },[session,status,router])
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google Login */}
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </Button>

          {/* GitHub Login */}
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => signIn("github")}
          >
            <FaGithub className="text-xl" />
            Continue with GitHub
          </Button>

          {/* <Separator /> */}
          <div className="flex items-center my-3">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-500">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>
          {/* Credential Login Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn("credentials", { username, password });
            }}
            className="space-y-3"
          >
            <Input
              type="username"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="flex items-center my-3">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-500">or</span>
                <hr className="flex-grow border-gray-300" />
        </div>
        <Link href="/api/signup">Don't have an account</Link>
        </CardContent>
      </Card>
    </div>
  );
}
