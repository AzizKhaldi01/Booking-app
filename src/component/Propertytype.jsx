import React from 'react'



function Propertytype({icon , title, onClick,isSelected}) { 
    
  return (
   
    <div
    className={`${
      isSelected ? "border-gray-700   " : "border-gray-300"
    } bg-white text-sm items-start flex flex-col  px-3 justify-between py-5 text-black border-solid border-2 relative  duration-150 cursor-pointer h-[100px] md:h-[150px] w-[80%] md:w-full rounded-xl`}
    onClick={onClick}
  >

<span className=' scale-[1.6]'> 

{icon}
</span>
<h1 className='     '> {title}</h1>
    
   
  </div>
     
  )
}

export default Propertytype