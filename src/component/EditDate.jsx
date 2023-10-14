import React from "react";
import { useMediaQuery } from "react-responsive";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
function EditDate({
  setDopen,
  Dopen,
  handelCancel,
  Savedate,
  handleDateChange,
}) {
  const isMobileView = useMediaQuery({ maxWidth: 768 });
  return (
    <div
      className={` duration-300  ${
        !Dopen ? "top-[50%]" : "top-[-100%] "
      }  flex  z-50 fixed h-full w-full relateve `}
    >
      <div
        onClick={() => setDopen(!Dopen)}
        className={`  flex  fixed h-full w-full absulet ${
          !Dopen ? " opacity-50 top-0  " : "opacity-0  top-[-100%]   "
        }  right-0 bg-black `}
      ></div>

      <div
        style={{
          transform: "translate(-50%, -50%)",
        }}
        className={`  duration-300     left-[50%] flex fixed   h-[84%]  md:h-[75%]   lg:w-[50%]    w-full  md:w-[80%]  pt-3   flex-col item-center   bg-white rounded-xl `}
      >
        <div className=" rounded-lg h-16 w-full bg-white absolute top-0 z-10   flex flex-col   gap-2 items-start px-3 pt-5   right-0">
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
        <div className="  rounded-lg items-center h-16 w-full flex flex-row justify-between px-5 absolute bottom-0  z-10  bg-white   right-0">
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
        <div className="   md:overflow-hidden  overflow-y-auto items-center justify-center  md:py-0  py-20 md:pt-0   pt-44  w-full h-full  flex  flex-row">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateRangeCalendar"]}>
              <DateRangeCalendar
                style={{
                  display: "flex",
                  flexDirection: isMobileView ? "column" : "row",
                }}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
}

export default EditDate;
