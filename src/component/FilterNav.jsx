import React, { useEffect } from 'react'
  

function FilterNav({img , text ,type ,FilterType}) {

 
  return (
    <div onClick={() => FilterType(text) }  className= {` flex flex-col gap-[.4rem] items-center justify-start    cursor-pointer  ${type == text ? ' opacity-100  border-solid border-b-4 border-gray-600' : ' opacity-60'  }    text-black `}  >
        <img className='  w-[28px]  md:w-[31px] ' src={img}   />
        <p className=   {` ${ type == text ?  'text-black' : '' }  text-gray-700 text-[14px] `} >{text} </p>
    </div>
  )
}

export default FilterNav