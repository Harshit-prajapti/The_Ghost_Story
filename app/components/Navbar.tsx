"use client";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Search,Bell } from 'lucide-react';
import { Input } from "@/components/ui/input";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="z-10 bg-pink-200 dark:bg-black fixed top-0 left-0 w-full text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <h1 className="text-2xl dark:text-white font-bold cursor-pointer text-black" onClick={() => router.push("/")}>
          Ghost Stories 👻
        </h1>
        <ul className="md:flex space-x-6 text-lg">
          {session ? (
            <>
              <li className="flex gap-2 flex-row justify-center text-center">
                  <Input className="w-100  dark:text-white  rounded-2xl text-black" type="text" placeholder="Search"/>
                  <div className="cursor-pointer  dark:text-white p-1.5 w-12 border-xl shadow-sm rounded-2xl hover:bg-gray-100"><Search/></div>                  
              </li>              
              <li className="cursor-pointer dark:text-white text-black hover:text-white" onClick={() => router.push("/dashboard")}>
                Harshit
              </li>
                
              <li className="cursor-pointer mt-1 dark:text-white text-black hover:text-gray-200" onClick={() => router.push("/dashboard")}>
                <Bell/>
              </li>
              <Button variant="outline" className="text-black dark:text-white border-white hover:text-purple-600" onClick={() => signOut()}>
                Logout
              </Button>
              
            </>
          ) : (
            <>
              <Button variant="outline" className="text-white dark:text-white border-white hover:bg-white hover:text-purple-600" onClick={() => router.push("/api/login")}>
                Login
              </Button>
              <Button className="bg-white dark:text-white text-purple-600 hover:bg-gray-200" onClick={() => router.push("/api/signup")}>
                Sign Up
              </Button>
            </>
          )}
          <button onClick={toggleTheme} className="p-2 bg-gray-300 dark:bg-gray-700 rounded">
                  {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
        </ul>
        <button className=" dark:text-white md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden dark:text-white bg-purple-700 p-4 flex flex-col items-center space-y-4">
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
