import React from 'react'
import PhotoSlider from "../component/Imageslaider";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {  motion} from 'framer-motion';
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { Link } from 'react-router-dom';
export default function Places({  _id ,photos,address ,price,title    }) {

    const item = {

        hidden: {  opacity: 0 },
        visible: {
          y: 0,
          opacity: 1
        }
      };
  return (  
    
   
    <Link

  
          to={`/placedetails/${_id}  `}
          className="  gap-2 items-center  h-[300px] flex flex-col   w-full "
        >
            
             <motion.div
             variants={item}
             className="  gap-2 items-center  h-[300px] flex flex-col   w-full "
             >
          <div 
           initial={{ opacity: 0     }}
           animate={{ opacity: 1  }}
           transition={{ duration: 1 }}
          className=" relative     mx-2  mt-1 flex justify-center   w-[95%]   h-[70%]  rounded-xl   ">
            <div className="  text-white  cursor-pointer hover:opacity-70 z-10 absolute top-3 right-3">
              <FavoriteBorderOutlinedIcon />
            </div>
            <PhotoSlider photos={photos} />
          </div>

          <div className=" h-[20%] w-full px-4 flex flex-row justify-between">
            <div className=" flex flex-col gap-1">
              <p className=" text-xs">
                {" "}
                {title.length >= 25
                  ? title.substring(0, 25) + "..."
                  : title}{" "}
              </p>
              <p className=" text-gray-700  text-[9px] underline ">
                {" "}
                {address.split(",").slice(0, 2).join(",")  }{" "}
              </p>
              <p className=" text-xs mt-2"> ${price} night </p>
            </div>
            <div className=" flex flex-row  gap-1 justify-center text-gray-800 text-xs">
              {" "}
              <StarIcon fontSize="small" /> 4.7
            </div>
          </div>
          </motion.div>
        </Link>
  )
}
