"use client";
import React from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

interface MenuIconProps {
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileMenuOpen: boolean;
}

const MenuIcon: React.FC<MenuIconProps> = ({
  setMobileMenuOpen,
  isMobileMenuOpen,
}) => {
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevOpen) => !prevOpen);
  };
  return (
    <div
      className={`md:hidden my-auto cursor-pointer ${
        isMobileMenuOpen ? "menu-open" : ""
      }`}
      onClick={toggleMobileMenu}
    >
      {isMobileMenuOpen ? (
        <AiOutlineClose size={32} />
      ) : (
        <AiOutlineMenu size={32} />
      )}
    </div>
  );
};

export default MenuIcon;
