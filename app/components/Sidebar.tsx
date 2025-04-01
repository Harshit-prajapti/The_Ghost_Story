"use client";

import Link from "next/link";
import { Home, User, BookOpen, History, Upload, Bookmark } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="fixed top-15 absolute z-10 w-42 h-screen bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg text-white p-4 flex flex-col space-y-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <SidebarItem href="/dashboard" icon={<Home size={20} />} label="Home" />
        <SidebarItem href="/dashboard/profile" icon={<User size={20} />} label="My Profile" />
        <SidebarItem href="/dashboard/my_story" icon={<BookOpen size={20} />} label="My Story" />
        <SidebarItem href="/dashboard/history" icon={<History size={20} />} label="History" />
        <SidebarItem href="/dashboard/upload_story" icon={<Upload size={20} />} label="Upload
         Story" />
        <SidebarItem href="/dashboard/read-later" icon={<Bookmark size={20} />} label="Read Later" />
      </nav>
    </div>
  );
};

const SidebarItem = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Link href={href} className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-md">
    {icon}
    <span>{label}</span>
  </Link>
);

export default Sidebar;
