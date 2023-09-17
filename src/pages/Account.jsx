import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Usercontext } from "../context/pagecontext";
import HomeIcon from "@mui/icons-material/Home";
import Bookings from "../component/Bookings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Wishlist from "../component/Wishlist";

import LuggageIcon from "@mui/icons-material/Luggage";

import Profile from "../component/Profile";

import Hosting from "../component/Hosting";
import AccountDitalis from "../component/AccountDitalis";

function Account() {
  const { subpages } = useParams(null);
const [Popen  , setPopen ]= useState(false)
  const { User } = useContext(Usercontext);

  function btntheme(type = null) {
    let clases =
      "py-2 h-10   p-2  md:p-3 rounded-full      w-28  flex justify-center items-center gap-1   h-full";
    if (subpages === type || (subpages === undefined && type === "profile")) {
      return clases + "  bg-main  text-white  ";
    } else {
      return clases;
    }
  }

  return (
    <div className="    w-full flex  flex-col md:flex-row h-full     md:pb-2 pb-20   pt-0 md:pt-28 justify-between">
      <span
        className={`  ${
          subpages === null || subpages === undefined ? "w-[100%] " : "w-0 h-0"
        } flex     overflow-auto duration-100 md:hidden`}
      >
        <Profile />
      </span>
      <div className="flex   flex-row h-full justify-center   w-full item-center">
        <span
          className={`    ${ Popen ? " w-16    " :   "w-[32%]" }   sticky top-0  overflow-hidden  ${!User  ? '  md:hidden ' : '  hidden md:flex '  }  duration-200   `}
        >
          <Profile setPopen={setPopen} Popen={Popen} />
        </span>

        <div className="  flex flex-row  md:flex-col w-full h-full justify-center items-center">
          <nav className="    w-[95%]  hidden    z-20    top-4   md:top-24   justify-center    items-center   md:flex  h-14             text-base md:text-lg    ">
            <div className=" px-2 text-sm  md:px-5 flex flex-row items-center justify-between   w-[96%]     py-2  bg-white shadow-lg  rounded-full   ">
              <Link className={btntheme("Wishlist")} to={"/account/Wishlist"}>
                {" "}
                <FavoriteIcon /> Wishlist
              </Link>
              <Link className={btntheme("Trips")} to={"/account/Trips"}>
                {" "}
                <LuggageIcon /> Trips
              </Link>
              <Link className={btntheme("housing")} to={"/account/housing"}>
                <HomeIcon /> Housing
              </Link>
            </div>
          </nav>
          {subpages === undefined && <AccountDitalis    />    }
          
          {subpages === "Wishlist" && <Wishlist  Popen={Popen} />}

          {subpages === "Trips" && <Bookings Popen={Popen}/>}

          {subpages === "housing" && <Hosting Popen={Popen}/>}
        </div>
      </div>
    </div>
  );
}

export default Account;
