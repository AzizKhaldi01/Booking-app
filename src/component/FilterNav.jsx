import React from 'react'
import { Link } from 'react-router-dom'

function FilterNav({img , text ,setUrlFilter}) {
  return (
    <Link to={ `/${setUrlFilter}` }  className=' flex flex-col gap-1 items-center justify-start   cursor-pointer  opacity-70 hover:opacity-100  text-black   '>
        <img className='  w-[28px] ' src={img}   />
        <p className=' text-gray-700 text-xs'>{text} </p>
    </Link>
  )
}

export default FilterNav