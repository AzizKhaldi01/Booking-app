import React from 'react'
import { useNavigate } from "react-router-dom";


function Topbar({title}) {

    const navigate = useNavigate();


    const GoBack = () => {
        navigate(-1);
      };

  return (
<div className="   sm:hidden text-gray-700 flex text-base  z-10  h-16 items-center justify-center  fixed bg-white top-0  right-0  w-full">
        <span className=" cursor-pointer  absolute top-5 left-3" onClick={GoBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
       {title}
      </div>
  )
}

export default Topbar