import React, { useContext, useEffect } from 'react'
import { differenceInDays } from "date-fns";
 
import { BookingContext } from '../context/Bookingconext';
import StarIcon from "@mui/icons-material/Star";
function BookingDetails({range }) {

  const { setDays , days }= useContext(BookingContext)
      const price = localStorage.getItem("price");
    let title = localStorage.getItem("title");
    let address = localStorage.getItem("address");
  
    const daysStayed = differenceInDays(range[0]?.endDate  ,  range[0]?.startDate);
useEffect(()=>{

  localStorage.setItem('daysStayed',  daysStayed.toString() );
  const days = localStorage.getItem('daysStayed')
  setDays(days)
      

}  , [range] )

    const fees = (price * daysStayed) / 12
    let imgUrl = localStorage.getItem("imageUrl");
  
  return (
     
    <div className=" w-full  flex justify-center items-start  md:w-[50%]      mt-0 md:mt-40  ">
    <div className="  bg-white border-solid border-[1px]    p-[24px]  w-[100%] flex flex-col   relative rounded-xl   md:sticky top-28 md:w-[90%]   h-[400px] ">
      <div className="  gap-2   flex w-full   h-36 justify-between   ">
        <img
          className=" h-[100px] object-cover rounded-lg w-[150px]"
          src={` http://192.168.1.7:4000/uploads/${imgUrl}  `}
          alt=""
        />
        <div className=" w-full flex flex-col  justify-between  text-left py-1   h-[100px]">
          <div className=" flex flex-col w-full">
            <p className="  text-[10px]">
              
              {address?.split(",").slice(0, 4).join(",")}
            </p>
            <h1 className="  text-sm">
              {title?.length >= 25 ? title.slice(0, 25) + "..." : title}
            </h1>
          </div>
          <div className="   w-full flex items-end  text-[11px] h-[50%]   ">
            <span className="  gap-1 flex items-center">
              <span className="  scale-75">
                <StarIcon fontSize="small" />
              </span>
              4,68
            </span>
          </div>
        </div>
      </div>
      <div className=" w-full flex items-center justify-center">
        
        <div className=" w-[100%] my-4 h-[1px] bg-gray-200  "> </div>
      </div>

      <div className="   flex flex-col w-full">
        <h1 className=" text-lg  md:text-xl   pb-2   ">Price details</h1>

        <div className="  gap-4 text-gray-600 py-3  text-sm md:text-base  justify-between flex flex-col h-20 w-full">
          <span className=" flex flex-row justify-between w-full">
            ${price} x {daysStayed} night <span>${price * daysStayed}</span>
          </span>
          <span className=" flex flex-row justify-between w-full">
            
          Reservado service fee
            <span className="  "> ${ fees.toFixed(0)} </span>
          </span>
        </div>
      </div>
      <div className=" w-full flex items-center justify-center">
        
        <div className=" w-[100%] my-4 h-[1px] bg-gray-200  "> </div>
      </div>

      <div className="  py-3 font-semibold   justify-between w-full flex">
        <span>Total (USD)</span> $
        {(fees   + price * daysStayed).toFixed(0)}
      </div>
    </div>
  </div>

  )
}

export default BookingDetails