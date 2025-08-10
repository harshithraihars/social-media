import React from "react";
import Image from "next/image";
import SearchInput from "./SearchInput";
import NavItem from "./NavItems";
import UserProfile from "./UserProfile";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-50 shadow-md">
      <div className="flex items-center max-w-6xl justify-between h-14 mx-auto px-3">
        <div className="flex items-center gap-1 md:gap-4">
          <Image src={`/logo.png`} alt="logo" width={100} height={100} />
          {/* <div className="md:block hidden"> */}
          <div className="block">
            <SearchInput />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="md:block hidden">
            <NavItem />
          </div>
          <UserProfile/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
