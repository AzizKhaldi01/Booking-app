import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useParams } from "react-router-dom";
import PhotoSlider from "./Imageslaider";
import axios from "axios";
import { useContext } from "react";
import { Usercontext } from "../context/pagecontext";
import { motion, AnimatePresence } from "framer-motion";

function Accommodation({ title, photos, description, id }) {
  var { _id } = useParams();

  const { add, setAdd, link, setLink, setReload, reload } =
    useContext(Usercontext);
  const [deletee, setDelete] = useState(false);

  useEffect(() => {
    setLink(_id);
  }, [_id]);

  async function hendldelete(e, _id) {
    e.preventDefault();
    await axios.delete(`/place-delete/${id}`);
    setReload(!reload);

    setDelete(!deletee);
  }

  return (
    <>
      <Link
        className=" justify-center flex flex-col  items-center"
        to={`/account/accommodation/${id}`}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 1 }}
          className="  overflow-hidden relative  cursor-pointer gap-0 lg:gap-5  group  w-[90%]  md:w-full     justify-start       md:flex-row    md:items-start items-center flex-col   flex  h-[50vh] lg:h-[40vh]  rounded-xl   shadow-md  bg-[#f7fcf9] "
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
            <p className="  text-[12px] lg:text-xs">
              {description.length >= 200
                ? description.substring(0, 200) + "..."
                : description}
            </p>
          </div>
          <div className=" z-10 flex flex-col gap-5  absolute    -right-10   opacity-0   group-hover:opacity-100   group-hover:right-3  md:group-hover:right-5 duration-200 ease-in top-5">
            <div
              onClick={() => {
                setAdd(!add);
              }}
              className=" h-8  md:h-10  w-8 md:w-10 cursor-pointer    bg-[#578280]   flex items-center justify-center text-white rounded-xl "
            >
              <EditIcon />
            </div>

            <div
              onClick={() => setDelete(!deletee)}
              className="  h-8  md:h-10  w-8 md:w-10 cursor-pointer  bg-[#578280]   flex items-center justify-center text-white rounded-xl  "
            >
              <DeleteForeverIcon />
            </div>
          </div>
          <div
            className={`   ${
              deletee ? "  top-[50%] " : "top-[-100%]"
            }   flex-col  justify-between p-4 items-center flex  top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2   fixed h-[20%] w-[20%] bg-white shadow-2xl z-[60] rounded-2xl `}
          >
            {" "}
            <span className=" pt-4">
            Are You Sure!
              
            </span>
            <div className= " items-center justify-center w-full flex flex-row gap-7 h-[40%] ">
              <button onClick={hendldelete} className=" rounded-lg  p-2 px-8  bg-red-500   ">
                yes
              </button>
              <button
                onClick={() => setDelete(!deletee)}
                className=" rounded-lg  p-2 px-8    bg-gray-200 "
              >
                no
              </button>
            </div>
          </div>
        </motion.div>
      </Link>
    </>
  );
}

export default Accommodation;
