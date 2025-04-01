"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'

const errorMessages: Record<string, string> = {
    Configuration: "There is an issue with the authentication configuration.",
    AccessDenied: "You do not have permission to access this resource.",
    Verification: "The verification request is invalid or expired.",
    OAuthSignin: "Error signing in with the OAuth provider.",
    OAuthCallback: "Error during OAuth callback.",
    OAuthCreateAccount: "Could not create an OAuth account.",
    EmailCreateAccount: "Could not create an email account.",
    Callback: "Error during authentication callback.",
    Default: "An unknown error occurred. Please try again.",
  };

const page = () => {
    const searchParams = useSearchParams();
    const error = searchParams.get("error") || "default";
  return (
    <div>
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
      <p className="text-gray-700 mt-2">{error || errorMessages["Default"]}</p>
      <a href="/api/login" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go to Home
      </a>
    </div>
    </div>
  )
}

export default page
