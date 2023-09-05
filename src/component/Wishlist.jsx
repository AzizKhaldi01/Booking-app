import {React , useEffect, useState} from 'react'
import axios from 'axios'
function Wishlist() {
const [data , setData]=useState()

useEffect(()=>{

  axios.get('/get-favorite').then((response) =>{
    const {data} = response;
    setData(data)
    
  } )
}, [] )
console.log(data)
  return (
    <div className='  flex flex-col pt-16 w-full h-full  justify-center px-3  md:px-12'>
       <div className='  w-full h-full grid md:grid-cols-2 grid-cols-1 gap-3  lg:grid-cols-3 '>
      
       { data?.map((item) =>(
        <div className=' flex flex-row gap-2 w-full    p-2  cursor-pointer h-[240px] '>
<img className=' h-full w-[60%] rounded-l-3xl object-cover  ' src={` http://localhost:4000/uploads/${item?.Place.photos[0] }`} alt="" />

<div className=' gap-2 flex flex-col h-full w-[40%] '>
<img   className=' object-cover  h-full rounded-tr-3xl ' src={` http://localhost:4000/uploads/${item?.Place.photos[1] }`} alt="" />
<img  className=' object-cover   h-full rounded-br-3xl' src={` http://localhost:4000/uploads/${item?.Place.photos[2] }`} alt="" />
</div>
        </div>
       ) ) }

       </div>
    </div>
  )
}

export default Wishlist