import {React , useState } from "react";

 
 
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css fil
import { useMediaQuery } from 'react-responsive'
import { DateRange } from 'react-date-range'
function EditDate({
  setDopen,
  Dopen,
  Savedate,
  range,
  setRange,
}) {

  
  

  const isMobileView = useMediaQuery({ maxWidth: 768 });
  return (
    <div
      className={` duration-300  ${
        !Dopen ? "top-[50%]" : " top-[-100%] "
      }  flex  z-50 fixed h-full w-full relateve `}
    >
      <div
        onClick={() => setDopen(!Dopen)}
        className={`  flex  fixed h-full w-full absulet ${
          !Dopen ? " opacity-50 top-0  " : "opacity-0  top-[-100%]   "
        }  right-0 bg-black `}
      ></div>

      <div
    
        className={` ${
          Dopen ? "  md:top-[-100%] bottom-[-100%] " : "  bottom-0 md:top-[50%] "
        }   duration-300    transform  md:translate-x-[-50%]  md:translate-y-[-50%]   left-0   md:left-[50%] flex fixed   h-[92%]  md:h-[80%]   lg:w-[66%]  xl:w-[55%]   w-full  md:w-[80%]  pt-3   flex-col item-center   bg-white rounded-xl `}
      >
        <div className="  rounded-t-xl  h-16 w-full  md:shadow-none  shadow-md bg-white absolute top-0 z-10   flex flex-col   gap-2 items-start px-3 pt-5   right-0">
          <span
            onClick={() => setDopen(!Dopen)}
            className=" cursor-pointer absolute top-1 left-2   "  
          >
            x
          </span>
          <h1 className=" text-2xl     p-2   text-gray-900 font-semibold">
            Date
          </h1>
        </div>
        <div className="  border-solid border-t-[1px]  md:rounded-b-xl   items-center h-16 w-full flex flex-row justify-between px-5 absolute bottom-0  z-10  bg-white   right-0">
          <button
            onClick={() => setDopen(!Dopen)}
            className=" border-[1px] border-solid  px-8 rounded-lg p-2"
          >
            Cancel
          </button>
          <button
            className="  text-white bg-[#578280]  px-8 rounded-lg p-2"
            onClick={Savedate}
          >
            Save
          </button>
        </div>
        <div className="    md:overflow-hidden  overflow-y-auto items-center justify-center  md:py-0  py-24  md:pt-0   pt-44  w-full h-full  flex  flex-row">
        <DateRange
            rangeColors={'#578280'}
            onChange={item => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
          
            color='#578280'
            minDate={new Date()}
             fixedHeight
            direction= {isMobileView  ?   'vertical':'horizontal'}
            className="calendarElement "
          /> 
        </div>
      </div>
    </div>
  );
}

export default EditDate;
