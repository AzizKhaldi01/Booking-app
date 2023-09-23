import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext  } from 'react';
import { Usercontext } from '../context/pagecontext';
import WindowIcon from "@mui/icons-material/Window";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {    AnimatePresence } from "framer-motion";
import Accommodation from "../component/Accommodation";
 import NewAccommodation from './NewAccommodation';
import AddIcon from "@mui/icons-material/Add";
import AccommSkelaton from "../component/Skelatons/AccommSkelaton";  
  
function Hosting({Popen} ) {
    const {
        User,
        ready,
        setUser,
        add,
        setAdd,
        setPlacedata,
        setLink,
        isLoading,
    
        list,
        setList,
        places,
      } = useContext(Usercontext);
    const navigate = useNavigate();

    if (ready && !User) {
        return navigate("/login");
      }
    function addnewplace() {
        navigate("/account/housing/");
        setLink("");
        setPlacedata(null);
        setAdd(!add);
      }
    

  return (
    <div className=  {`flex flex-col item-center  justify-center w-full  ${ Popen ? 'px-0': '  md:x-10' }    md:py-0      py-10 `}  >
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
        {isLoading ? (
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
        ) : (
          <AccommSkelaton cards={3} bookingC={false} />
        )}
      </AnimatePresence>

      <div className=" "> </div>
    </div>
    <NewAccommodation setAdd={setAdd} add={add} />
  </div>
  )
}

export default Hosting