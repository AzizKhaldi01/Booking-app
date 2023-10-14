import { React, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";

function Massege({ msg, img, setMsg }) {
  useEffect(() => {
    if (msg !== "") {
      const timer = setTimeout(() => {
        setMsg("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [msg]);

  return (
    <div
      className={` transform  z-20    bottom-16 md:bottom-12  md:left-10  flex flex-row h-16      left-[50%]  md:translate-x-0  -translate-x-1/2  md:translate-y-0 -translate-y-1/2   border-solid text-sm border-[1px]  border-opacity-30 border-main    rounded-xl shadow-xl fixed  ${
        msg == "" ? " opacity-0 -z-10" : " opacity-100 z-40"
      }  left-5 w-[86%]   sm:w-[270px] bg-white  duration-100  items-center gap-3 justify-start px-1 `}
    >
      <img
        className=" w-[50px] h-[50px] rounded-md  object-cover "
        src={`http://192.168.1.7:4000/uploads/${img}`}
        alt="img"
      />
      <div className=" flex items-center justify-between w-full">
        <h1>
          {msg === "added"
            ? "Added to the wishlist"
            : msg === "removed"
            ? "Removed from the wishlist"
            : ""}
        </h1>
        <span
          onClick={(e) => {setMsg("") ; e.preventDefault() } }
          className="  scale-90 cursor-pointer text-gray-800  hover:opacity-70"
        >
          <ClearIcon />
        </span>
      </div>
    </div>
  );
}

export default Massege;
