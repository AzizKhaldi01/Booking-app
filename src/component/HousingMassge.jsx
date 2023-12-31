import { React, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
 
function HousingMassge({ msg, setMsg }) {
  useEffect(() => {
    if (msg.text !== "") {
      const timer = setTimeout(() => {
        setMsg({ text: '', color: '' });
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [msg]);

  return (
    <div
      className={` transform   ${msg?.color}      justify-between px-3 text-base         md:bottom-10  bottom-[86%]      md:left-8   left-0   flex flex-row h-16  border-solid   border-l-[3px]    rounded-xl shadow-lg fixed  ${
        msg?.text == ''  && msg?.color == '' ? " opacity-0 -z-10  " : " opacity-100 z-[100]"
      }  left-5 w-[90%]  md:w-[300px]      duration-100  items-center gap-3 justify-start px-1 `}
    >
      <h1 className=" w-full">{msg?.text}</h1>

      <span onClick={()=> setMsg({ text: '', color: '' }) } className=" cursor-pointer  hover:opacity-70">
        <ClearIcon />
      </span>
    </div>
  );
}

export default HousingMassge;
