import React, { useEffect, useState } from "react";
import PhotoSlider from "../component/Imageslaider";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { motion } from "framer-motion";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/pagecontext";
import { Link } from "react-router-dom";
import Massege from "./Massege";
export default function Places({ _id, photos, address, price, title , Beds,Bedrooms,Bathrooms }) {
  const { User } = useContext(Usercontext);
  const [Favadded, setFavadded] = useState("");
  const [fav, setFav] = useState(true);

  const navigate = useNavigate();

  const item = {
    hidden: { opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  function AddFavorite(e, _id) {
    e.preventDefault();
    if (!User) {
      e.preventDefault();
      navigate("/login");
    }

    axios.post("/add-favorite", { placeID: _id }).then((response) => {
      if (response.data == "liked") {
        e.preventDefault();
        setFav(true);
        setFavadded("added");
      } else {
        e.preventDefault();
        setFav(false);
        setFavadded("removed");
      }
    });
  }

  useEffect(() => {
    const userLikedItems = JSON.parse(localStorage.getItem("favPlaces"));
    console.log("aa11 " + userLikedItems);
    setFav(userLikedItems.includes(_id));
  }, []);

  return (
    <Link
      to={`/placedetails/${_id}  `}  target="_blank"
      className="  gap-2 items-center relative py-1  h-[400px] flex flex-col  border-solid border-[1px] rounded-2xl  w-full "
    >
      <motion.div
        variants={item}
        className="  gap-2 items-center  h-[400px] flex flex-col   w-full "
      >
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className=" relative     mx-2  mt-1 flex justify-center   w-[95%]   h-[70%]  rounded-xl   "
        >
          <div
            
            className="  text-black  cursor-pointer  z-10 absolute flex flex-row w-full justify-between px-3 top-3 right-0"
          >
            <p className=" text-gray-900  text-[14px]  gap-1  bg-white rounded-full bg-opacity-70 px-2 h-8 p-1 flex  items-center justify-center flex-row ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clip-rule="evenodd"
                />
              </svg>
              {address.split(",").slice(0, 2).join(",")  } 
            </p>

            <span onClick={(e) => AddFavorite(e, _id)} className=" p-1  rounded-[50%]  bg-white active:scale-90   bg-opacity-70 ">
              {fav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="red"
                  class="w-6 h-6"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              ) : (
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
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              )}
            </span>
          </div>

          <PhotoSlider nonav={true} photos={photos} hight={false} />
        </div>

        <div className=" h-[15%] w-full px-4 flex flex-row justify-between">
          <div className=" flex flex-col gap-1">
            <p className="   font-medium text-ms ">
              {" "}
              {title.length >= 20 ? title.substring(0, 20) + "..." : title}{" "}
            </p>

            <p className=" text-ms  mt-1"> ${price} night </p>
          </div>
          <div className=" flex flex-row  gap-1 justify-center text-gray-800 text-ms">
            {" "}
            <StarIcon fontSize="small" /> 4.7
          </div>
        </div>

        <div className=" flex flex-row w-full justify-between text-gray-700 px-4 text-sm ">
          <span className=" justify-end items-end h-full  flex flex-row gap-1">
            <BedOutlinedIcon  className="  scale-95" />
            <p> {Beds} beds </p>
          </span>

          <span className=" justify-end items-end h-full  flex flex-row gap-1">
            <BathtubOutlinedIcon  className="  scale-95" />
            <p>  {Bathrooms} baths</p>
          </span>
          <span className=" justify-end items-end h-full  flex flex-row gap-1">
             
 <MeetingRoomIcon/>
            <p> {Bedrooms} rooms</p>
          </span>
        </div>
      </motion.div>

      <Massege img={photos[0]} msg={Favadded} setMsg={setFavadded} />
    </Link>
  );
}
