import React from "react";
import FooterRowOne from "./FooterRowOne";
import FooterRowTwo from "./FooterRowTwo";

const Footer = () => {
  return (
    <main>
      <footer className="flex flex-col justify-center px-[10px] md:px-[30px] md:px-[unset] md:items-center py-[20px] pt-[30px] text-[#434343] bg-[#F4F4F4]">
        {/* Row One */}
        <FooterRowOne />

        {/* Row Two */}
        <FooterRowTwo />
      </footer>
    </main>
  );
};

export default Footer;
