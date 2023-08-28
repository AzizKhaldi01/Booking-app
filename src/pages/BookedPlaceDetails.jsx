import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import RoomIcon from "@mui/icons-material/Room";
import { format } from "date-fns";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import EastIcon from '@mui/icons-material/East';
function BookedPlaceDetails() {
  const { _id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/get-bookingDetails/" + _id).then((response) => {
      const { data } = response;
      setData(data);
    });
  }, []);

 
  return (
    <div className="  mt-24 w-full h-full flex flex-col    px-2  lg:px-14 ">
      <div className=" gap-3 flex w-full  flex-col  md:flex-row ">

      <div className=""> 
       
      <div className=" relative w-full  md:h-[50vh] h-[300px]  lg:h-[80vh] rounded-xl ">
        
        <img
          className=" w-full h-full rounded-3xl  object-cover object-center"
          src={` http://localhost:4000/uploads/${data?.Place?.photos[1]}`}
          alt=""
        />

<div className=" z-10 absolute bottom-[10%]   w-full  px-4 text-2xl  md:text-5xl text-white  ">
<h1 className=" max-w-[70%] font-medium ">{data?.Place?.title}</h1>
</div>

<div style={{
  background: 'rgb(0,0,0)',
  background: 'linear-gradient(0deg, rgba(0,0,0,0.9472163865546218) 29%, rgba(5,5,5,0.8603816526610644) 46%, rgba(10,10,10,0.7147233893557423) 62%, rgba(28,28,28,0.5186449579831933) 77%, rgba(67,67,67,0.02007352941176472) 96%)',
}} className=" rounded-b-3xl  absolute bottom-0 h-[60%]  opacity-95 w-full   ">

</div>

        <div className=" absolute top-3 w-full   px-2 md:px-3 justify-between  flex flex-row  ">
          <span className="   bg-main  text-sm    p-2 text-white  relative  px-2  md:px-3 h-full rounded-full">
            <span className="  ">
              <RoomIcon fontSize="small" />
              {data?.Place?.address}
            </span>
          </span>

          <Link to={`/placedetails/${data?.Place?._id}` }>
            <span className=" cursor-pointer text-white bg-main  p-1 md:p-2 rounded-xl flex items-center justify-center">
              <ArrowOutwardIcon />
            </span>
          </Link>
        </div>
      </div>
    </div>
    
     
      <div className="     py-2 flex flex-col w-full  md:w-[40%] h-full  ">
        <h1 className=" text-xl">Trip Details</h1>
 <div className=" h-8 bg-slate-200 items-center rounded-full p-4  text-base md:text-xl my-3 font-medium flex flex-row w-full justify-between ">
<span className="  ">From: {data?.checkIn.split('T')[0]}     </span>
<EastIcon  className=" scale-100  md:scale-150"/>
<span className=" ">To:{data?.checkOut.split('T')[0]} </span>

 </div>

         </div>
</div>
     
    </div>
  );
}

export default BookedPlaceDetails;
