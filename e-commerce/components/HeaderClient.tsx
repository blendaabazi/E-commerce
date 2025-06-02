"use client";

import Link from "next/link";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import CartIcon from "./CartIcon";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";

interface HeaderClientProps {
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string;
    email?: string;
  } | null;
  categories: any[];
}

const HeaderClient = ({ user, categories }: HeaderClientProps) => {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-b-gray-200 py-5">
      <Container className="flex items-center justify-between gap-7 text-lightColor">
        <HeaderMenu categories={categories} />
        <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
          <MobileMenu />
          <Logo>Tulos</Logo>
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {!user && (
              <Link
                href="/signin"
                className="text-sm font-semibold hover:text-darkColor hoverEffect"
              >
                Login
              </Link>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default HeaderClient;
