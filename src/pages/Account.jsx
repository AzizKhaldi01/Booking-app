import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Usercontext } from "../context/pagecontext";
import HolidayVillageOutlinedIcon from "@mui/icons-material/HolidayVillageOutlined";
import Bookings from "../component/Bookings";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Wishlist from "../component/Wishlist";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LuggageOutlinedIcon from "@mui/icons-material/LuggageOutlined";
import collapse from "../img/collapse.svg";
import Profile from "../component/Profile";

import Hosting from "../component/Hosting";
import AccountDitalis from "../component/AccountDitalis";

function Account() {
  const { subpages } = useParams(null);
  const [Popen, setPopen] = useState(true);
  const { User } = useContext(Usercontext);

  function btntheme(type = null) {
    let clases =
      " p-2 m-4  group relative  rounded-md  hover:bg-main hover:bg-opacity-20  cursor-pointer ";
    if (subpages === type || (subpages === undefined && type === "profile")) {
      return    "  p-2 m-4  bg-main  text-white  group relative rounded-md  cursor-pointer";
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
          className={` h-[89vh]   sticky top-10 flex flex-col ${
            Popen ? " w-28     " : "w-[32%]"
          }   sticky top-0     ${
            !User ? "  md:hidden " : "  hidden md:flex "
          }  duration-200   `}
        >
          {!Popen ? (
            <Profile setPopen={setPopen} Popen={Popen} />
          ) : (
            <div className=" top-22 h-full sticky  w-full  flex flex-col items-center z-50  p-3   ">
              <div className=" h-[70%]   w-full pt-24 flex flex-col justify-between items-center    ">
                <Link  to={"/account"}   className={btntheme('profile')} >
                  <PersonOutlineOutlinedIcon />
                  <span className=" text-sm absolute top-1 left-12 p-1 px-2 text-white bg-main bg-opacity-80 rounded-md    group-hover:opacity-100 opacity-0 -z-10 group-hover:z-10 ">
                    Account
                  </span>
                </Link>
                <Link  to={"/account/Wishlist"}  className={btntheme('Wishlist')}>
                  <FavoriteBorderOutlinedIcon />
                  <span className=" text-sm absolute top-1 left-12 p-1 px-2 text-white bg-main bg-opacity-80 rounded-md   group-hover:opacity-100 opacity-0 -z-10 group-hover:z-10 ">
                    WishList
                  </span>
                </Link>

                <Link  to={"/account/Trips"}  className={btntheme('Trips')}  >
                  <LuggageOutlinedIcon />
                  <span className=" text-sm absolute top-1 left-12 p-1 px-2 text-white bg-main bg-opacity-80 rounded-md   group-hover:opacity-100 opacity-0 -z-10 group-hover:z-10 ">
                    Trips
                  </span>
                </Link>

                <Link  to={"/account/housing"} className={btntheme('housing')} >
                  <HolidayVillageOutlinedIcon />
                  <span className=" text-sm absolute top-1 left-12 p-1 px-2 text-white bg-main bg-opacity-80 rounded-md   group-hover:opacity-100 opacity-0 -z-10 group-hover:z-10 ">
                    Housing
                  </span>
                </Link>
              </div>
            </div>
          )}

          <span
            className={` ${
              !Popen ? "      justify-start  " : "  justify-center  "
            } h-[15%] hidden  md:flex  flex-row   px-5 text-gray-800   items-center   `}
          >
            <div
              className=" flex flex-row gap-2"
              onClick={() => setPopen(!Popen)}
            >
              <img
                className={` ${
                  Popen ? "   rotate-180  " : "   "
                } cursor-pointer w-[19px] `}
                src={collapse}
                alt=""
              />
              <p
                className={`  ${
                  Popen ? " hidden   " : " flex "
                }   cursor-pointer text-sm`}
              >
                 
                Collapse 
              </p>
            </div>
          </span>
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
