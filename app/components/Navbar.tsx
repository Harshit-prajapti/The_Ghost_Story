"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { auth } from "@/lib/auth";
import { Input } from "@/components/ui/input";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  // const session = await auth();
  const router = useRouter();
  return (
    <nav className="z-10 fixed top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
          Ghost Stories 👻
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          {session?(<><Input type="text" placeholder="Search"/></>):(<></>)}
          <li className="cursor-pointer hover:text-gray-200" onClick={() => router.push("/")}>
            Home
          </li>
          <li className="cursor-pointer hover:text-gray-200" onClick={() => router.push("/api/about")}>
            About
          </li>
          <li className="cursor-pointer hover:text-gray-200" onClick={() => router.push("/features")}>
            Features
          </li>
          

          {/* Show Dashboard if logged in */}
          {session ? (
            <>
              {/* <Input className="bg-white-500" type="text" placeholder="Search"/> */}
              <li className="cursor-pointer hover:text-gray-200" onClick={() => router.push("/dashboard")}>
                Dashboard
              </li>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600" onClick={() => router.push("/api/login")}>
                Login
              </Button>
              <Button className="bg-white text-purple-600 hover:bg-gray-200" onClick={() => router.push("/api/signup")}>
                Sign Up
              </Button>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-purple-700 p-4 flex flex-col items-center space-y-4">
          <p className="cursor-pointer hover:text-gray-200" onClick={() => router.push("/")}>
            Home
          </p>
          <p className="cursor-pointer hover:text-gray-200" onClick={() => router.push("/about")}>
            About
          </p>
          <p className="cursor-pointer hover:text-gray-200" onClick={() => router.push("/features")}>
            Features
          </p>
          {session ? (
            <>
              <p className="cursor-pointer hover:text-gray-200" onClick={() => router.push("/dashboard")}>
                Dashboard
              </p>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600" onClick={() => router.push("/login")}>
                Login
              </Button>
              <Button className="bg-white text-purple-600 hover:bg-gray-200" onClick={() => router.push("/signup")}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
