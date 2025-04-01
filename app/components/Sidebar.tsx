"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, User, BookOpen, History, Upload, Bookmark, Menu} from "lucide-react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`fixed rounded-2xl top-14 left-0 h-screen dark:bg-black bg-pink-200 text-black shadow-lg p-4 flex flex-col items-center transition-all ${isExpanded ? "w-40" : "w-16"}`}>
      
      {/* Menu Button */}
      <button onClick={() => setIsExpanded(!isExpanded)} className="dark:text-white cursor-pointer mb-6 p-2 text-black rounded-md">
        <Menu size={24} />
      </button>

      {/* Sidebar Links */}
      <nav className="flex flex-col space-y-6">
        <SidebarItem href="/dashboard" icon={<Home size={24} />} label="Home" isExpanded={isExpanded} />
        <SidebarItem href="/dashboard/profile" icon={<User size={24} />} label="My Profile" isExpanded={isExpanded} />
        <SidebarItem href="/dashboard/my_story" icon={<BookOpen size={24} />} label="My Story" isExpanded={isExpanded} />
        <SidebarItem href="/dashboard/history" icon={<History size={24} />} label="History" isExpanded={isExpanded} />
        <SidebarItem href="/dashboard/upload_story" icon={<Upload size={24} />} label="Upload" isExpanded={isExpanded} />
        <SidebarItem href="/dashboard/read-later" icon={<Bookmark size={24} />} label="Read Later" isExpanded={isExpanded} />
      </nav>
    </div>
  );
};

const SidebarItem = ({ href, icon, label, isExpanded }: { href: string; icon: React.ReactNode; label: string; isExpanded: boolean }) => (
  <Link href={href} className="flex dark:text-white flex-col text-black items-center space-y-1 p-2 transision-all hover:bg-gray-100 rounded-md">
    {icon} 
    {isExpanded && <span className="text-xs">{label}</span>}
  </Link>
);

export default Sidebar;
