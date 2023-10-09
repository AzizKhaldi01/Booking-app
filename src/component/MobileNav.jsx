import React from "react";
import { Link, useLocation } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LuggageOutlinedIcon from "@mui/icons-material/LuggageOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useContext } from "react";
import { Usercontext } from "../context/pagecontext";

function MobileNav() {
const {User} = useContext(Usercontext);

  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-full md:hidden bg-white z-30 flex flex-row items-center justify-around h-16 border-solid border-[1px] fixed bottom-0 right-0">
     { User ?   <> <Link
        to={"/"}
        className={`flex flex-col items-center justify-center text-xs ${
          isActive("/") ? "text-black" : "text-gray-400"
        }`}
      >
        <HomeOutlinedIcon
          className={isActive("/") ? "text-main" : `text-gray-400`}
          
        />{" "}
        Home
      </Link>
      <Link
        to={"/account/Wishlist"}
        className={`flex flex-col items-center justify-center text-xs ${
          isActive("/account/Wishlist") ? "text-black" : "text-gray-400"
        }`}
      >
        <FavoriteBorderOutlinedIcon
          className={
            isActive("/account/Wishlist") ? "text-main" : `text-gray-400`
          }
          
        />{" "}
        Favorite
      </Link>
      <Link
        to={"/account/Trips"}
        className={`flex flex-col items-center justify-center text-xs ${
          isActive("/account/Trips") ? "text-black" : "text-gray-400"
        }`}
      >
        <LuggageOutlinedIcon
          className={isActive("/account/Trips") ? "text-main" : `text-gray-400`}
         
        />{" "}
        Trips
      </Link>
      <Link
        to={"/account"}
        className={`flex flex-col items-center justify-center text-xs ${
          isActive("/account") ? "text-black" : "text-gray-400"
        }`}
      >
        <PersonOutlineOutlinedIcon
          className={isActive("/account") ? "text-main " : `text-gray-400`}
          
        />{" "}
        Profile
      </Link></> 
      
      :


      <>
      <Link
        to={"/"}
        className={`flex flex-col items-center justify-center text-xs ${
          isActive("/") ? "text-black" : "text-gray-400"
        }`}
      >
        <SearchOutlinedIcon
          className={isActive("/") ? "text-main" : `text-gray-400`}
         
        />{" "}
        Search
      </Link>
      <Link
        to={"/account/Wishlist"}
        className={`flex flex-col items-center justify-center text-xs ${
          isActive("/account/Wishlist") ? "text-black" : "text-gray-400"
        }`}
      >
        <FavoriteBorderOutlinedIcon
          className={
            isActive("/account/Wishlist") ? "text-main" : `text-gray-400`
          }
        
        />{" "}
        Favorite
      </Link>
       
      <Link
        to={"/login"}
        className={`flex flex-col items-center justify-center text-xs ${
          isActive("/login") ? "text-black" : "text-gray-400"
        }`}
      >
        <PersonOutlineOutlinedIcon
          className={isActive("/login") ? "text-main" : `text-gray-400`}
           
        />{" "}
        Log in
      </Link></>
      }
    </div>
  );
}

export default MobileNav;
