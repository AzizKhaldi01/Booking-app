import React from 'react'
import ChevronRightIcon from "@mui/icons-material/ChevronRight";






function PlaceDescription({data,extra,setExtra}) {
  return (
    <div> <p className=" md:flex hidden w-full  leading-6    text-gray-800  text-base md:text-[15px] py-3  ">
    {data.description.length >= 300 ? (
      <p>
        {" "}
        {data.description.substring(0, 300) + "..."}{" "}
        <p
          onClick={() => setExtra(!extra)}
          className=" hover:opacity-70 underline cursor-pointer flex items-center    w-[30%] text-black"
        >
          {" "}
          Show More <ChevronRightIcon />{" "}
        </p>{" "}
      </p>
    ) : (
      <p>
        {" "}
        {data.description}{" "}
        <p
          onClick={() => setExtra(!extra)}
          className=" hover:opacity-70 underline cursor-pointer flex items-center    w-[30%] text-black"
        >
          {" "}
          Show More <ChevronRightIcon />{" "}
        </p>{" "}
      </p>
    )}
  </p>

  <p className=" md:hidden flex w-full  leading-6    text-gray-800  text-sm md:text-[15px] py-3  ">
    {data.description.length >= 200 ? (
      <p>
        {" "}
        {data.description.substring(0, 200) + "..."}{" "}
        <p
          onClick={() => setExtra(!extra)}
          className=" hover:opacity-70 underline cursor-pointer flex items-center    w-full  md:w-[30%] text-black"
        >
          {" "}
          Show More <ChevronRightIcon />{" "}
        </p>{" "}
      </p>
    ) : (
      <p>
        {" "}
        {data.description}{" "}
        <p
          onClick={() => setExtra(!extra)}
          className=" hover:opacity-70 underline cursor-pointer flex items-center   w-[30%] text-black"
        >
          {" "}
          Show More <ChevronRightIcon />{" "}
        </p>{" "}
      </p>
    )}
  </p></div>
  )
}

export default PlaceDescription