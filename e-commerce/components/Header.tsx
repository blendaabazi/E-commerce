import React from "react";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import Container from "./Container";
const Header = () => {
  return (
    <header className=" border-b border-b-gray-400">
      <Container className="flex items-center justify-between gap-7 py-6">
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-center">
             <Logo>Shop</Logo>
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-between gap-5">right</div>
      </Container>
    </header>
  );
};
export default Header;
