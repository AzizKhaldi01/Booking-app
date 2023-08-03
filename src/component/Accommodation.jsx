import React, { useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useParams } from "react-router-dom";
import PhotoSlider from "./Imageslaider";
import { useContext } from "react";
import { Usercontext } from "../context/pagecontext";

function Accommodation({ title, photos, description, id }) {
  const { _id } = useParams();

  const { add, setAdd, link, setLink } = useContext(Usercontext);

  useEffect(() => {
    setLink(_id);
  }, [_id]);

  return (
    <>
      <Link className=" justify-center flex flex-col  items-center" to={`/account/accommodation/${id}`}>
        <div
          
          className="  overflow-hidden relative  cursor-pointer gap-0 lg:gap-5  group  w-[90%]  md:w-full     justify-center       md:flex-row    md:items-start items-center flex-col   flex  h-[50vh] lg:h-[40vh]  rounded-xl   bg-gray-100 "
        >
          <div className=" relative  group mx-2 my-3 flex justify-center   w-[95%] md:w-[50%]  md:h-[90%] h-[200px]   rounded-xl   ">
            <PhotoSlider photos={photos} />
          </div>
          <div className=" flex  pr-3 w-[95%] px-2 pb-2  md:w-[50%]  pt-4  gap-5  lg:gap-10  flex-col items-start justify-start  ">
            <h1 className=" md:hidden text-xs  font-semibold md:text-sm ">
              {title.length >= 20 ? title.substring(0, 20) + "..." : title}
            </h1>
            <h1 className="  hidden md:flex text-xs  font-semibold md:text-sm ">
              {title}
            </h1>
            <p className="  text-[10px] lg:text-xs">
              {description.length >= 200
                ? description.substring(0, 200) + "..."
                : description}
            </p>
          </div>
          <div className=" z-10 flex flex-col gap-5  absolute    -right-10   opacity-0   group-hover:opacity-100   group-hover:right-3  md:group-hover:right-5 duration-200 ease-in top-5">
            <div onClick={() => { setAdd(!add); }} className=" h-8  md:h-10  w-8 md:w-10 cursor-pointer   bg-black  flex items-center justify-center text-white rounded-xl ">
              <EditIcon />
            </div>

            <div className="  h-8  md:h-10  w-8 md:w-10 cursor-pointer   bg-black  flex items-center justify-center text-white rounded-xl  ">
              <DeleteForeverIcon />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Accommodation;
