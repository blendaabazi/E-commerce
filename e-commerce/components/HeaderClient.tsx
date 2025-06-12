"use client";

import Link from "next/link";
import { ClerkLoaded, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import CartIcon from "./CartIcon";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import { ListOrdered } from "lucide-react";

interface HeaderClientProps {
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string;
    email?: string;
  } | null;
  categories: any[];
  orders: any[] | null;
}

const HeaderClient = ({ user, categories, orders }: HeaderClientProps) => {
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
          
          <SignedIn>
            <Link href="/orders" className="group relative">
              <ListOrdered className="group-hover:text-darkColor hoverEffect" />
              <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                {orders?.length || 0}
              </span>
            </Link>
          </SignedIn>

          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link
                href="/signin"
                className="text-sm font-semibold hover:text-darkColor hoverEffect"
              >
                Login
              </Link>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default HeaderClient;