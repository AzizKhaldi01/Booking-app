import React from "react";
import { Link } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useState } from "react";
import { Usercontext } from "../context/pagecontext";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import logo from "../img/logo airbnb 1.png";
import GrayLine from "./GrayLine";
function Navbar() {
  const { User, setUser, setIsLogin, setLoginOpen } = useContext(Usercontext);

  const [Tab , setTab] = useState();

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    localStorage.clear();
  }

  return (
    <div className=" hidden md:flex  flex-col w-full">
      <div className=" w-full h-16  items-center  z-50 border-b-[1px]  border-solid bg-white  fixed top-0 right-0 flex flex-row justify-between  px-12 p-10  ">
        <Link to="/">
          <div className=" text-main   flex flex-row gap-2 items-center  text-xl font-semibold  ">
            <img className=" w-[34px]  h-[35px] " src={logo} />
            <h>Reservado</h>
          </div>
        </Link>
        <div className=" h-full w-[60px] bg-black z-20 ">
          <SearchIcon />
        </div>
        <div  onClick={ ()=> setTab(!Tab) } className=" hover:shadow-lg duration-200  cursor-pointer p-2 px-3 rounded-full border-solid border-[1px] relative  flex flex-row  justify-center items-center  gap-3">
          <MenuIcon className=" text-gray-600 scale-90" /> 
          <span 
            className={`  ${
              User ? " bg-gray-700" : " bg-gray-400"
            }     font-normal text-xl  rounded-[50%] flex items-center justify-center text-white  h-8 w-8 `}
          >
            {!User ? <PersonIcon /> : User?.firstname[0]  }
          </span>
          {!User ? (
          
          Tab &&  <div
              className={` absolute flex flex-col top-14 shadow-2xl right-0 font-light  rounded-lg w-[14rem] bg-white h-[14rem] `}
            >
              <div className=" w-full h-full  top-0 right-0 fixed -z-10    "></div>
              <Link
                onClick={() => {
                  setLoginOpen(false);
                  setIsLogin(false);
                }}
                className=" px-2 items-center flex w-full py-3 my-1  hover:bg-slate-100  rounded-t-lg   cursor-pointer "
              >
                Log in
              </Link>
              <Link
                onClick={() => {
                  setLoginOpen(false);
                  setIsLogin(true);
                }}
                className=" px-2 items-center flex w-full py-3 my-1   hover:bg-slate-100   cursor-pointer "
              >
                Sign up
              </Link>
              <Link className=" px-2 items-center flex w-full py-3 my-1  hover:bg-slate-100    cursor-pointer ">
                Housing your home
              </Link>

              <Link className=" px-2 items-center flex w-full   py-3 my-1   rounded-lg  hover:bg-slate-100    cursor-pointer ">
                Help Center
              </Link>
            </div>

          ) : (Tab && 
            <div
              className={`  absolute flex flex-col top-14 shadow-2xl right-0 font-light  rounded-lg w-[14rem] bg-white h-[20 rem] `}
            >
               <div className=" w-full h-full  top-0 right-0 fixed -z-10    "></div>
              <Link to={'account/Trips'}  className=" px-2 items-center flex w-full py-3 my-1  hover:bg-slate-100  rounded-t-lg   cursor-pointer "
              >
                Trips
              </Link>
              <Link to={'account/Wishlist'} className=" px-2 items-center flex w-full py-3 my-1   hover:bg-slate-100   cursor-pointer "
              >
                Wishlist
              </Link>
              <Link
                to={"/account/housing"}
                className=" px-2 items-center flex w-full py-3 my-1  hover:bg-slate-100    cursor-pointer "
              >
                Housing your home
              </Link>

              <Link
                to={"Account"}
                className=" px-2 items-center flex w-full   py-3 my-1   rounded-lg  hover:bg-slate-100    cursor-pointer "
              >
                Account
              </Link>
              <GrayLine />
              <Link
                onClick={logout}
                className=" px-2 items-center flex w-full   py-3 my-1   rounded-lg  hover:bg-slate-100    cursor-pointer "
              >
                Log out
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
