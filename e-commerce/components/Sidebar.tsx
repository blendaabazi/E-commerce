"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import Link from "next/link";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import SocialMedia from "./SocialMedia";
import { headerData } from "@/constants";
import { Category } from "@/sanity.types"; // sigurohu që e ke këtë import
import { useUserRole } from "@/context/UserRoleContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, categories }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  const { isAdmin } = useUserRole();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-black shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-hidden={!isOpen}
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
        ref={sidebarRef}
        className="flex flex-col h-full p-8 text-white border-r border-gray-800 shadow-xl"
        role="navigation"
        aria-label="Primary"
      >
        <div className="flex items-center justify-between mb-8">
          <button onClick={onClose} aria-label="Close sidebar" className="focus:outline-none focus:ring-2 focus:ring-red-500 rounded">
            <Logo className="text-white font-bold text-2xl select-none cursor-pointer" />
          </button>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="text-white hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 rounded transition"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-lg font-medium tracking-wide">
          {/* Home */}
          <Link
            href="/"
            onClick={onClose}
            className={`block px-4 py-2 rounded-md transition-colors duration-200 ${
              pathname === "/" ? "bg-blue-600 font-semibold" : "hover:bg-blue-500"
            }`}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>

          {/* Kategoritë */}
          {categories?.map((category) => {
            const categoryPath = `/category/${category.slug?.current}`;
            return (
              <Link
                key={category._id}
                href={categoryPath}
                onClick={onClose}
                className={`block px-4 py-2 rounded-md transition-colors duration-200 ${
                  pathname === categoryPath ? "bg-blue-600 font-semibold" : "hover:bg-blue-500"
                }`}
                aria-current={pathname === categoryPath ? "page" : undefined}
              >
                {category.title}
              </Link>
            );
          })}

          {/* Dashboard */}
          <Link
            href="/dashboard"
            onClick={onClose}
            className={`block px-4 py-2 rounded-md transition-colors duration-200 ${
              pathname === "/dashboard" ? "bg-blue-600 font-semibold" : "hover:bg-blue-500"
            }`}
            aria-current={pathname === "/dashboard" ? "page" : undefined}
          >
            Dashboard
          </Link>

          {/* AdminPanel */}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={onClose}
              className={`block px-4 py-2 rounded-md transition-colors duration-200 ${
                pathname === "/admin" ? "bg-blue-600 font-semibold" : "hover:bg-blue-500"
              }`}
              aria-current={pathname === "/admin" ? "page" : undefined}
            >
              AdminPanel
            </Link>
          )}

          {/* Shop */}
         
        </nav>

        <div className="flex-grow" />

        <div className="mt-6">
          <SocialMedia />
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
