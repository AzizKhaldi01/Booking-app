import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Usercontext } from "../context/pagecontext";
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WindowIcon from "@mui/icons-material/Window";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import axios from "axios";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import Bookings from "../component/Bookings";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Wishlist from "../component/Wishlist";
import Accommodation from "../component/Accommodation";
import NewAccommodation from "../component/NewAccommodation";
import Carteskelaton from "../component/Carteskelaton";
import LuggageIcon from '@mui/icons-material/Luggage';
import AddIcon from "@mui/icons-material/Add";
import { motion, AnimatePresence } from "framer-motion";
import AccommSkelaton from "../component/AccommSkelaton";

function Account() {
  const navigate = useNavigate();
  const {
    User,
    ready,
    setUser,
    add,
    setAdd,
    setPlacedata,
    setLink,
    isLoading ,
    
    list,
    setList,
    places,
  } = useContext(Usercontext);

  const { subpages } = useParams(null);
 

  if (ready && !User) {
    return <Navigate to={"/login"} />;
  }

  function btntheme(type = null) {
    let clases = "py-2 h-10   p-3 rounded-full      w-28  flex justify-center items-center gap-1   h-full";
    if (subpages === type || (subpages === undefined && type === "profile")) {
      return clases + "  bg-main  text-white  ";
    } else {
      return clases;
    }
  }

  async function logout() {
    await axios.post("/logout");
    navigate("/");

    setUser(null);
  }

  function addnewplace() {
    navigate("/account/housing/");
    setLink("");
    setPlacedata(null);
    setAdd(!add);
  }

  return (
    <div className="    w-full flex  flex-col md:flex-row h-full     pt-0 md:pt-32 justify-between">
      <div className="flex   flex-col h-full justify-center   w-full item-center">
     
        <nav className="    z-20    top-4   md:top-24   justify-center    items-center  flex  h-14    sticky        text-base md:text-lg    ">
        <div className=" px-2 text-sm  md:px-5 flex flex-row items-center justify-between   w-[96%]     py-2  bg-white shadow-lg  rounded-full   ">
          
        <Link className={btntheme("profile")} to={"/account"}>
            {" "}
           <PersonIcon/> Profile
          </Link>
            <Link className={btntheme("Wishlist")} to={"/account/Wishlist"}>
            {" "}
            <FavoriteIcon/> Wishlist
          </Link>
          <Link className={btntheme("Trips")} to={"/account/Trips"}>
            {" "}
          <LuggageIcon/>   Trips
          </Link>
          <Link
            className={btntheme("housing")}
            to={"/account/housing"}
          >
           <HomeIcon/> Housing
          </Link>
        </div>
        
        </nav>
        {subpages === "Wishlist" && <Wishlist />}

        {subpages === "Trips" && <Bookings />}

        {subpages === "housing" && (
          <div className=" flex flex-col item-center justify-center w-full      ">
            <div className=" w-full h-20  pt-3    flex justify-between  px-6  md:px-10 items-end  ">
              <div className=" flex   h-8 w-16 rounded-md   flex-row items-center justify-center   border-solid border-[1px]  border-main ">
                <span
                  onClick={() => setList(false)}
                  className={`   ${
                    !list ? "text-white bg-main" : " text-main"
                  } w-full rounded-l   h-full   flex items-center justify-center `}
                >
                  <FormatListBulletedIcon className=" cursor-pointer" /> 
                </span>
                <span
                  onClick={() => setList(true)}
                  className={` ${
                    list ? "text-white bg-main" : " text-main"
                  }  w-full rounded-r h-full flex items-center justify-center `}
                >
                  {" "}
                  <WindowIcon className=" cursor-pointer" />
                </span>
              </div>

              <div
                onClick={addnewplace}
                className=" cursor-pointer  text-main border-main flex items-center justify-center  gap-2   text-sm  border-solid border-[2px]  px-3 p-2 rounded-xl     "
              >
                Add
                <AddIcon fontSize="small" />
              </div>

            </div>
            <div className=" w-full my-2 flex items-center justify-center">
              <div className=" h-[1px]  w-[86%] md:w-[94%] bg-gray-300 "></div>
            </div>
            <div
              className={` mx-2  md:mx-9  gap-5  grid   pt-5  ${
                !list
                  ? "grid-cols-1 lg:grid-cols-1"
                  : " grid-cols-1 lg:grid-cols-2"
              }      h-full `}
            >
              <AnimatePresence>

                {  isLoading ?
                
                places?.map((i) => (
                  <Accommodation
                    key={i.id}
                    list={list}
                    id={i._id}
                    address={i.address}
                    photos={i.photos}
                    title={i.title}
                    description={i.description}
                  />
                )) 
                :  <AccommSkelaton cards={3} bookingC={false} />
                }
              </AnimatePresence>

              <div className=" "> </div>
            </div>
          </div>
        )}
      </div>
      <NewAccommodation setAdd={setAdd} add={add} />
    </div>
  );
}

export default Account;
