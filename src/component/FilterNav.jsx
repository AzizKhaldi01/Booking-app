import React, { useEffect } from 'react'
  

function FilterNav({img , text ,type ,FilterType , setIslowding}) {

 
  return (
    <div onClick={() =>{ FilterType(text) ; setIslowding(false) }  }  className= {` flex flex-col gap-[.4rem] items-center justify-start    cursor-pointer  ${type == text ? ' opacity-100  border-solid border-b-4 border-gray-600' : ' opacity-70'  }    text-black `}  >
        <img className='  w-[24px]  md:w-[25px] ' src={img}   />
        <p className=   {` ${ type == text ?  'text-black' : '' }  text-gray-700 text-[13px] `} >{text} </p>
    </div>
  )
}

export default FilterNav