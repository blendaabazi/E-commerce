"use client";

import React from "react";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import Container from "./Container";
import CartIcon from "./CartIcon";
import SearchBar from "./SearchBar";
import { useUser } from "@clerk/nextjs";
import { SignInButton, ClerkLoaded } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { ListOrdered } from "lucide-react";
import Link from "next/link";
import MobileMenu from "./MobileMenu"; // Importo MobileMenu

const Header = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <header className="border-b border-b-gray-400 py-5 sticky top-0 z-50 bg-white">
      <Container className="flex items-center justify-between gap-7 py-6">
        <div className="flex items-center gap-4">
          <MobileMenu /> {/* Këtu vendoset ikona e hamburger menu */}
          <HeaderMenu />
        </div>

        <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
          <Logo>NOVA</Logo>
        </div>

        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <ClerkLoaded>
            <SignedIn>
              <Link href={"/orders"} className="group relative">
                <ListOrdered className="w-5 h-5 group-hover:text-darkColor hoverEffect" />
                <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center" />
              </Link>
              <UserButton />
            </SignedIn>

            {!user && (
              <SignInButton mode="modal">
                <button className="text-sm font-semibold hover:text-darkColor hoverEffect">
                  Login
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
