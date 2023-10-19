import React from "react";
import { Link } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useState } from "react";
import { Usercontext } from "../context/pagecontext";
 

import PersonIcon from "@mui/icons-material/Person";
import Skeleton from "react-loading-skeleton";
import logo from "../img/logo airbnb 1.png";
function Navbar() {
  const { User , ResetFilter    } = useContext(Usercontext);

  return (
    <div className=" hidden md:flex  flex-col w-full">
      <div className=" w-full h-16  items-center  z-50 border-b-[1px]  border-solid bg-white  fixed top-0 right-0 flex flex-row justify-between  px-12 p-10  ">
        <Link   to="/">
          <div className="  text-lg font-medium">
            <img className=" w-[35px] " src={logo} />
          </div>
        </Link>
        <div className="      h-full w-[60px]      bg-black z-20 ">
          <SearchIcon />
        </div>
        <div className="  flex flex-row  justify-center items-center  gap-2 ">
          <Link to={User ? "/account" : "/login"}>
            <PersonIcon />{" "}
          </Link>
          <LanguageIcon className=" cursor-pointer" />
          {!!User && (
            <div className=" "> {User.firstname || <Skeleton count={5} />} </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
