"use client";
import { AlignLeft } from "lucide-react";
import { useState } from "react";
import React from "react";
import Sidebar from "./Sidebar";

const MobileMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log("Sidebar Open?", isSidebarOpen);

  return (
    <>
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
        <AlignLeft className="hover:text-darkColor hoverEffect" />
      </button>

      {/* Sidebar shfaqet vetëm në mobile */}
      <div className="md:hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </>
  );
};

export default MobileMenu;
