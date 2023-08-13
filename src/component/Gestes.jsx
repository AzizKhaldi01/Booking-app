import React from "react";

function Gestes({ title, desc, name , Geust , setGeust , onClick }) {
  return (
    <div className=" flex flex-row w-full     ">
      <div className=" flex flex-col w-[80%] ">
        <h1> {title} </h1>
        <p className=" text-[11px] text-gray-500"> {desc} </p>
      </div>

      <div className=" gap-2 flex  items-center     ">
           
           <button className=" rounded-[50%] h-7   w-7 text-[#578280]  border-[1px] border-[#578280] ">
          -
        </button>
        <input
          className=" rounded-lg h-10 bg-white text-sm font-semibold items-center text-center w-10   "
          disabled
          name={name}
          id="adults"
          value={Geust}
        />
         <button onClick={onClick} className=" rounded-[50%] h-7    text-[#578280] w-7 border-[1px]   border-[#578280] ">
          +
        </button>
      </div>
    </div>
  );
}

export default Gestes;
