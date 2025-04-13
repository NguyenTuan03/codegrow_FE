'use client'
import React, { useState } from 'react'
import {
  Calendar,
  Home,
  MessagesSquare,
  Settings,
  ThumbsUp,
  Users,
  ClipboardList
} from "lucide-react";
const menuItems = [
  { label: "Home", icon: <Home className="w-5 h-5" /> },
  { label: "Calendar", icon: <Calendar className="w-5 h-5" /> },
  { label: "Mentor Manage", icon: <ClipboardList className="w-5 h-5" /> },
  { label: "Feedbacks", icon: <ThumbsUp className="w-5 h-5" /> },
  { label: "Services", icon: <Users className="w-5 h-5" /> },
  { label: "Message", icon: <MessagesSquare className="w-5 h-5" /> },
  { label: "Setting", icon: <Settings className="w-5 h-5" /> }
];
const QAQCSidebar = () => {
  const [activeItem, setActiveItem] = useState("Home");
  return (
    <>
      <aside className="w-64 h-screen bg-white border-r flex flex-col">      
      <div className="flex items-center justify-between px-6 py-4 border-b">        
        <h1 className="text-xl font-bold">CODEGROW</h1>
      </div>
      
      <nav className="flex flex-col px-2 py-6 gap-2">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={activeItem === item.label}
            onClick={() => setActiveItem(item.label)}
          />
        ))}
      </nav>
    </aside>
    </>
  )
}
function SidebarItem({ icon, label, active = false,onClick }: { icon: React.ReactNode; label: string; active?: boolean;onClick?: () => void; }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 text-sm font-medium px-3 py-2 rounded-md cursor-pointer ${
        active ? "text-blue-600 font-semibold" : "text-black"
      } hover:bg-gray-100`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
export default QAQCSidebar