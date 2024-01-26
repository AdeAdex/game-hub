import React from "react";
import Links from "./links/Links";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import AuthButton from "./AuthButton";

const Navbar = () => {
  return (
    <main>
      <nav className="w-full flex px-5 py-3 shadow-md justify-between gap-8">
        <Logo/>
        <Links/>
        <SearchBox/>
        <div className="flex gap-8">
          <AuthButton title="login"/>
          <AuthButton title="register"/>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
