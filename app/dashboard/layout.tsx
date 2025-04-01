import { Html } from "next/document";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function RootLayout({children} : {children : React.ReactNode}){
    return(
        <div className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content area (Takes remaining space) */}
        <main className="flex-1 p-4 overflow-auto pt-[60px] ml-12">{children}</main>
      </div>
    </div>
    )
}
