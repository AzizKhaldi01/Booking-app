import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Usercontext } from "../context/pagecontext";
import HolidayVillageOutlinedIcon from '@mui/icons-material/HolidayVillageOutlined';
import Bookings from "../component/Bookings";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Wishlist from "../component/Wishlist";
import userimage from "../img/user.webp";
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';

import Profile from "../component/Profile";

import Hosting from "../component/Hosting";
import AccountDitalis from "../component/AccountDitalis";

function Account() {
  const { subpages } = useParams(null);
  const [Popen, setPopen] = useState(false);
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
    <div className="    w-full flex  flex-col md:flex-row h-full     md:pb-2 pb-20   pt-0 md:pt-16 justify-between">
      <span
        className={`  ${
          subpages === null || subpages === undefined ? "w-[100%] " : "w-0 h-0"
        } flex     overflow-auto duration-100 md:hidden`}
      >
        <Profile />
      </span>
      <div className="flex   flex-row h-full justify-center   w-full item-center">
        <span
          className={`   sticky top-10 ${
            Popen ? " w-28     " : "w-[32%]"
          }   sticky top-0  overflow-hidden  ${
            !User ? "  md:hidden " : "  hidden md:flex "
          }  duration-200   `}
        >
         { !Popen ?  <Profile setPopen={setPopen} Popen={Popen} />  : <div className="   top-22 h-[90vh] sticky  w-full  flex flex-col items-center  p-3  ">
         <span onClick={()=>  setPopen(!Popen)  } className= {` ${Popen ? ' rotate-180  text-main'  : 'rotate-0   ' } duration-100  cursor-pointer  hidden md:flex   absolute top-12  z-10 right-8 rounded-[50%] p-2 `} >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
<div className=" h-[80%]   w-full pt-24 flex flex-col justify-between items-center ">
 
<img
            className="      w-[100px]     rounded-[50%] "
            src={userimage}
          />
   <span className=" p-4 mt-8">
 <FavoriteBorderOutlinedIcon />
 </span>


 <span className=" p-4">
 <LuggageOutlinedIcon />
 </span>
 
 <span className=" p-4">
 <HolidayVillageOutlinedIcon />
 </span>
 

 
</div>

 

         </div> }
        </span>

        <div className="  flex flex-row  md:flex-col w-full h-full justify-center items-center">
          {/* <nav className="    w-[95%]  hidden    z-20    top-4   md:top-24   justify-center    items-center   md:flex  h-14             text-base md:text-lg    ">
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
            </nav> */}
          {subpages === undefined && <AccountDitalis />}

          {subpages === "Wishlist" && <Wishlist Popen={Popen} />}

          {subpages === "Trips" && <Bookings Popen={Popen} />}

          {subpages === "housing" && <Hosting Popen={Popen} />}
        </div>
      </div>
    </div>
  );
}

export default Account;
