import React from "react";

function Gestes({ title, desc , Geust ,   onClick , dicrementGuests, maxGuests }) {

 

  return (
    <div className=" flex flex-row w-full     ">
      <div className=" flex flex-col w-[80%] ">
        <h1> {title} </h1>
        <p className=" text-[11px] text-gray-500"> {desc} </p>
      </div>

      <div  className=" gap-2 flex  items-center     ">
           
           <button    onClick={(e)=>  dicrementGuests(e , title)} className={ ` ${ Geust === 0 || title === 'Adults' && Geust== 1 ?   'cursor-default border-gray-200 text-gray-200 hover:bg-white  hover:text-gray-200 active:scale-100 ' : ''    }  rounded-[50%] h-7  active:scale-95 hover:bg-[#578280]  hover:text-white w-7 text-[#578280]  border-[1px] border-[#578280] `}>
          -
        </button>
        <input
          className=" rounded-lg h-10 bg-white text-sm font-semibold items-center text-center w-10   "
          disabled
          name={title}
          id="adults"
          value={Geust}
        />
         <button         onClick={(e)=>  onClick(e , title)} className={ `  ${title === "Pets" && Geust >= 2 || Geust >= maxGuests || title === "Infants" && Geust >= 3   ||  Geust.Children + Geust.Adults  >= maxGuests   ?  '  cursor-default border-gray-200 text-gray-200 hover:bg-white  hover:text-gray-200 active:scale-100 ' : ''    }   rounded-[50%] h-7 hover:bg-[#578280]  hover:text-white  active:scale-95 hover:bg-   text-[#578280] w-7 border-[1px]   border-[#578280] `}>
          +
        </button>
      </div>
    </div>
  );
}

export default Gestes;
