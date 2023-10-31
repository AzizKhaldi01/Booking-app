import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BookingContext } from "../context/Bookingconext";
import congrate from "../img/congrate.png";
import axios from "axios";
import AccommSkelaton from "./Skelatons/AccommSkelaton";
import { Usercontext } from "../context/pagecontext";
import { format } from "date-fns";
import Topbar from "./Topbar";
import { useNavigate } from "react-router-dom";

function Bookings({  Popen}) {

  const { err, days, setErr  } = useContext(BookingContext);
  const { User ,ready  } = useContext(Usercontext);


  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [BookingDetails, setBookingDetails] = useState(null);
  useEffect(() => {
    axios.get("/get-bookings").then((response) => {
      const { data } = response;
      setBookingDetails(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErr("");
    }, 3000);
  }, [err]);

  if (ready && !User) {
    return navigate("/login");
  }
  return (
    <div className= {` md:mt-6   mt-10 h-full w-full grid grid-cols-1 xl:grid-cols-2  ${  Popen ? ' px-2 md:px-12 ' :' px-5 '  }    p-4   gap-3 items-center `} >
    
     <Topbar title={'Trips'}/>
      {!isLoading ? (
        BookingDetails?.map((item) => (
          <div className=" relative   w-full h-full  md:h-[26vh] rounded-xl  bg-slate-50 shadow   p-3 flex  flex-col   gap-0 md:gap-2  md:flex-row">
           <Link to={`/account/Trips/${item?._id}`}> 
            <span className=" bg-white  p-1 bg-opacity-70 rounded-md   absolute  top-4 md:top-2  right-4 md:right-2  cursor-pointer ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </span>
               </Link>
            
            <img
              className=" w-full  md:w-[32%] object-cover rounded-xl  md:h-full"
              src={` http://192.168.1.7:4000/uploads/${item?.Place?.photos[1]} `}
              alt=""
            />
<div  className=" w-full flex flex-col h-full justify-between  ">


            <div className=" flex  gap-1  flex-col w-full md:py-0 py-2  px-0 md:px-4 h-full ">
              <p className=" text-xs gap-1 flex flex-row items-end text-gray-700">
                {" "}
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
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                {item?.Place?.address}{" "}
              </p>

              <h1 className=" text-lg"> {item?.Place?.title?.length >= 20  ?  item?.Place?.title?.slice(0, 22) + '..' : item?.Place?.title     } </h1>
              <div className=" text-white flex flex-row  gap-1 text-xs w-full  py-3">
                <span className=" flex flex-row gap-1 p-1 px-1 items-end bg-main rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>{" "}
                  {item?.days} Night
                </span>

                <span className=" flex flex-row gap-1 p-1 px-1 items-end bg-main rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>
                  {format(new Date(item?.checkIn), "yyyy-MM-dd")}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>
                  {format(new Date(item?.checkOut), "yyyy-MM-dd")}
                </span>
              </div>

             
            </div>
 <div className=" flex flex-row items-center   w-full h-3  justify-between   text-lg  py-5  md:py-3  px-1 md:px-4 pb-1 text-gray-800   ">
                <span className=" flex flex-row items-center  text-bace font-medium  md:text-lg ">
                  total: ${item?.price / 100}
                </span>
              </div>
              </div>
          </div>
        ))
      ) : (
        <AccommSkelaton cards={4} bookingC={true} />
      )}

      <div
        style={{
          transform: "translate(-50%, -50%)",
        }}
        className={` ${
          err == "successful" ? "    opacity-100 z-10" : "  opacity-0 -z-10 "
        }  duration-300   md:font-medium top-[50%]  text-white text-lg   md:text-3xl   left-[50%] flex fixed   text-center  items-center justify-center   w-[80vw] md:w-[40vw]  h-16  md:h-24   flex-col item-center    bg-green-400  rounded-xl `}
      >
        Your Booking Was Seccessful{" "}
        <span className=" flex gap-4 justify-center items-center">
          congratulations{" "}
          <img className="  w-[30px] md:w-[35px]" src={congrate} />
        </span>
      </div>
    </div>
  );
}

export default Bookings;
