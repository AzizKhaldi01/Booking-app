import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import RoomIcon from "@mui/icons-material/Room";
import { useNavigate } from "react-router-dom";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import EastIcon from "@mui/icons-material/East";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import TripSkelaton from "../component/Skelatons/TripSkelaton";
function BookedPlaceDetails() {
  const { _id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

const navigate = useNavigate();
  useEffect(() => {
    axios.get("/get-bookingDetails/" + _id).then((response) => {
      const { data } = response;
      setData(data);
      setLoading(false)
    });
  }, []);

const handelGoback = ()=>{
  navigate(-1)
}

  const fees =   ( data?.price / 100) / 13  ;

  return (

    
    <div className=" mt-0   md:mt-24 w-full h-full flex flex-col    px-2  lg:px-14 ">
     
     
      <div className="  w-full bg-white h-14 md:hidden flex  justify-center items-center sticky  top-0 z-20 text-lg font-medium  "> <span onClick={handelGoback}><KeyboardArrowLeftIcon   className=" cursor-pointer absolute top-4 left-2"/></span>  Bookings </div>
    
    
    
     {loading ?   <TripSkelaton/> :    <div className=" gap-3 flex w-full  flex-col  md:flex-row ">
        <div className="">
          <div className=" relative w-full  md:h-[50vh] h-[300px]  cursor-pointer    lg:h-[80vh] rounded-xl ">
            <img
              className=" w-full h-full rounded-3xl  object-cover object-center"
              src={` http://localhost:4000/uploads/${data?.Place?.photos[1]}`}
              alt=""
            />

            <div className=" z-10 absolute bottom-[10%]   w-full  px-4 text-xl  md:text-5xl text-white  ">
              <h1 className=" max-w-[70%] font-medium ">
                {data?.Place?.title}
              </h1>
            </div>

            <div
              style={{
                background: "rgb(0,0,0)",
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0.9472163865546218) 29%, rgba(5,5,5,0.8603816526610644) 46%, rgba(10,10,10,0.7147233893557423) 62%, rgba(28,28,28,0.5186449579831933) 77%, rgba(67,67,67,0.02007352941176472) 96%)",
              }}
              className=" rounded-b-3xl  absolute bottom-0 h-[40%]  md:h-[60%]  opacity-95 w-full   "
            ></div>

            <div className=" absolute top-3 w-full   px-2 md:px-3 justify-between  flex flex-row  ">
              <span className="   bg-main  text-sm    p-2 text-white  relative  px-2  md:px-3 h-full rounded-full">
                <span className="  ">
                  <RoomIcon fontSize="small" />
                  {data?.Place?.address}
                </span>
              </span>

              <Link to={`/placedetails/${data?.Place?._id}`}>
                <span className=" cursor-pointer text-white bg-main  p-1 md:p-2 rounded-xl flex items-center justify-center">
                  <ArrowOutwardIcon />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className=" mx-0  md:mx-4   p-0  md:p-2  py-2 flex flex-col w-full  md:w-[40%] h-full gap-3">
          <div className=" p-4  flex flex-col    border-solid border-[1px] rounded-lg   w-full h-full  ">
           <h1 className=" text-xl">Date Details</h1>
           <div className=" w-full flex flex-col  md:flex-row justify-between   "> 
            <div className=" md:text-base text-sm   h-8  items-center rounded-full   my-3  flex flex-row    gap-3 ">
              <span className=" flex flex-row items-center justify-center gap-1 ">
                {" "}
                From:{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
                {data?.checkIn.split("T")[0]}
              </span>
              <EastIcon className="  " />
              <span className=" flex flex-row items-center justify-center gap-1 ">
                To:
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
                {data?.checkOut.split("T")[0]}
              </span>
             



            </div>

            <span className=" text-sm flex     flex-row items-center   font-medium gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
                {data?.days + " Nights"}
              </span>
</div>

          </div>

          <div className=" flex w-full h-full  p-4   flex-col border-solid border-[1px] rounded-lg ">
           
      
            <div className="   flex flex-col w-full">
              <h1 className=" text-lg  md:text-xl   pb-2   ">Price details</h1>

              <div className="  gap-4 text-gray-600 py-3  text-sm md:text-base  justify-between flex flex-col h-20 w-full">
                <span className=" flex flex-row justify-between w-full">
                  ${data?.Place?.price} x {data?.days} night{" "}
                  <span>${data?.Place?.price * data?.days}</span>
                </span>
                <span className=" flex flex-row justify-between w-full">
                  Reservado service fee
                  <span className="  "> ${fees.toFixed(0)} </span>
                </span>
              </div>
            </div>
            <div className=" w-full flex items-center justify-center">
              <div className=" w-[100%] my-4 h-[1px] bg-gray-200  "> </div>
            </div>

            <div className="  py-3 font-semibold   justify-between w-full flex">
              <span>Total (USD)</span> $
              {(data?.price) / 100   }
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default BookedPlaceDetails;
