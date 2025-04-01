"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function SignOut() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Skeleton className="h-40 w-80 rounded-lg" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl">Not Signed In</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-500">Please log in to continue.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src={session.user?.image || ""} />
            <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-center text-xl mt-2">{session.user?.name}</CardTitle>
          <p className="text-sm text-gray-500">{session.user?.email}</p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => signOut()} className="w-full">
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
