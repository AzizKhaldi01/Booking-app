import React from 'react'



function Propertytype({icon , title, onClick,isSelected}) { 
    
  return (
   
    <div
    className={`${
      isSelected ? "border-blue-500" : "border-gray-300"
    } bg-white border-solid border-2  duration-150 cursor-pointer h-[100px] md:h-[150px] w-[80%] md:w-full rounded-xl`}
    onClick={onClick}
  >


    {icon}
    <h1>{title} </h1>
  </div>
     
  )
}

export default Propertytype