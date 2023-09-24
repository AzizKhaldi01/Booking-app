import React from 'react'
import { Link } from 'react-router-dom'

function FilterNav({img , text ,setUrlFilter}) {
  return (
    <Link onClick={setUrlFilter(text)} className=' flex flex-col gap-[.4rem] items-center justify-start   cursor-pointer  opacity-70 hover:opacity-100  text-black   '>
        <img className='  w-[28px]  md:w-[31px] ' src={img}   />
        <p className=' text-gray-700 text-[14px] '>{text} </p>
    </Link>
  )
}

export default FilterNav