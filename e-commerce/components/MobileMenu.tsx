"use client";
import { AlignLeft } from "lucide-react";
import { useState } from "react";
import React from "react";
import Sidebar from "./Sidebar";
import { Category } from "@/sanity.types";

interface MobileMenuProps {
  categories: Category[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ categories }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          categories={categories}
        />
      </div>
    </>
  );
};

export default MobileMenu;
