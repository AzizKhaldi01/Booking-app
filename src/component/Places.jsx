import React, { useEffect , useState } from 'react'
import PhotoSlider from "../component/Imageslaider";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {  motion} from 'framer-motion';
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
 import { Usercontext } from '../context/pagecontext';
import { Link } from 'react-router-dom';
import Massege from './Massege';
export default function Places({  _id ,photos,address ,price,title }) {
const {User} = useContext(Usercontext);
const [Favadded, setFavadded] = useState('');
const [fav, setFav] = useState(true);

const navigate = useNavigate();

    const item = {

        hidden: {  opacity: 0 },
        visible: {
          y: 0,
          opacity: 1
        }
      };



      function AddFavorite(e , _id) {
        e.preventDefault();
        if (!User) {
          e.preventDefault();
          navigate("/login");
        }
    
        axios.post("/add-favorite", { placeID: _id }).then((response) => {
          if (response.data == "liked") {
            e.preventDefault();
            setFav(true);
            setFavadded('added')
          } else {
            e.preventDefault();
            setFav(false);
            setFavadded('removed')
          }
        });
      }

 

     useEffect(() => {
      const userLikedItems = JSON.parse(localStorage.getItem("favPlaces"));
      console.log("aa11 " + userLikedItems);
      setFav(userLikedItems.includes(_id));
    }, []);

     console.log(fav)

  return (  
    
   
    <Link

  
          to={`/placedetails/${_id}  `}
          className="  gap-2 items-center  h-[400px] flex flex-col   w-full "
        >
            
             <motion.div
             variants={item}
             className="  gap-2 items-center  h-[400px] flex flex-col   w-full "
             >
          <div 
           initial={{ opacity: 0     }}
           animate={{ opacity: 1  }}
           transition={{ duration: 1 }}
          className=" relative     mx-2  mt-1 flex justify-center   w-[95%]   h-[70%]  rounded-xl   ">
            <div onClick={(e) => AddFavorite(e, _id) } className="  text-white  cursor-pointer hover:opacity-70 z-10 absolute top-3 right-3">
             
             { fav ?    <FavoriteIcon className="  text-red-600 scale-90" /> :<FavoriteBorderOutlinedIcon />} 
            </div>

            <PhotoSlider nonav={true} photos={photos} hight={false} />
          </div>

          <div className=" h-[20%] w-full px-4 flex flex-row justify-between">
            <div className=" flex flex-col gap-1">
              <p className="   font-medium text-ms ">
                {" "}
                {title.length >= 25
                  ? title.substring(0, 25) + "..."
                  : title}{" "}
              </p>
              <p className=" text-gray-700  text-[14px] underline ">
                {" "}
                {address.split(",").slice(0, 2).join(",")  }{" "}
              </p>
              <p className=" text-ms  mt-2"> ${price} night </p>
            </div>
            <div className=" flex flex-row  gap-1 justify-center text-gray-800 text-ms">
              {" "}
              <StarIcon fontSize="small" /> 4.7
            </div>
          </div>
          </motion.div>

          <Massege img={ photos[0]} msg={Favadded} setMsg={setFavadded} />
        </Link>
  )
}
