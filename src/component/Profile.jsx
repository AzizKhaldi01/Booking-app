import React from "react";
import { useContext } from "react";
import { Usercontext } from "../context/pagecontext";
import userimage from "../img/user.webp";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

import axios from "axios";
import Topbar from "./Topbar";
function Profile() {
  const { User, setUser } = useContext(Usercontext);

  const navigate = useNavigate();

  async function logout() {
    await axios.post("/logout");
    navigate("/");

    setUser(null);
  }

  return (
    <div className="    w-full relative  flex flex-col   ">
      <Topbar title={"My Profile"} />
      <div className="sticky top-5  md:top-10 ">
        <div className=" w-full   flex flex-row h-32  gap-7  justify-start px-4  md:mt-0 mt-20 items-center     ">
          <img
            className=" p-2    w-[120px]   bg-gray-100  rounded-[50%] "
            src={userimage}
          />
          <div className=" flex flex-col ">
            <h1 className=" text-xl font-semibold ">{User?.name} </h1>
            <p className="  text-gray-700 text-sm  ">Traveler</p>
          </div>
          <span className=" text-gray-600 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </span>
        </div>
        <div className=" w-full px-4 flex flex-row gap-3 mt-5 text-sm   ">
          <Link
            to={"/account/Trips"}
            className="  hover:bg-gray-400  hover:text-white flex flex-col justify-center  items-center   text-gray-500 bg-gray-100 rounded-lg h-24 md:w-[50%]  w-full "
          >
            <span className=" text-gray-700  font-medium text-xl "> 2 </span>
            Trips
          </Link>
          <Link
            to={"/account/Wishlist"}
            className=" hover:bg-gray-400  hover:text-white flex flex-col justify-center  items-center   text-gray-500 bg-gray-100 rounded-lg h-24 md:w-[50%]  w-full "
          >
            <span className=" text-gray-700  font-medium text-xl ">13</span>
            Favorite
          </Link>
          <Link
            to={"/account/housing"}
            className=" hover:bg-gray-400  hover:text-white flex flex-col justify-center  items-center   text-gray-500 bg-gray-100 rounded-lg h-24 md:w-[50%]  w-full "
          >
            <span className=" text-gray-700  font-medium text-xl ">3</span>
            Hosting
          </Link>
        </div>

        <div className=" w-full  flex   pb-4 flex-col gap-5 px-4 mt-5  ">
          <span className=" h-16 w-full rounded-md bg-gray-100  font-medium flex flex-row items-center justify-between px-4 relative">
            <span className=" flex flex-row  gap-2 items-center  text-gray-700 ">
              <span className="   ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </span>
              Account information
            </span>
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>

          <span className=" text-gray-700 h-16 w-full rounded-md bg-gray-100  font-medium flex flex-row items-center justify-between px-4 relative">
            Dark Mode{" "}
            <span className=" flex gap-4 h-full py-2 font-normal">
              <button className="   h-full w-16  text-gray-500 ">On</button>{" "}
              <button className="  shadow-lg  h-full w-16  bg-white rounded-lg ">
                Off
              </button>
            </span>
          </span>

          <span className=" h-16 w-full  rounded-md bg-gray-100 text-red-600  font-medium flex flex-row items-center   gap-2 px-4 relative">
            <span className=" hover:opacity-80 cursor-pointer" onClick={logout}>
              <LogoutIcon className=" rotate-180" /> Log out
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
