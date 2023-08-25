import React, { useEffect , useContext , useState} from 'react'
 
import { BookingContext } from '../context/Bookingconext'
import congrate from '../img/congrate.png'
import axios from 'axios'

function Bookings() {
  const {err , days ,setErr }= useContext(BookingContext)

const [data , setData]= useState(null)


useEffect(()=>{ 
axios.get("/get-bookings" ).then((response)=>{
  const {data} = response
  setData(data)
} )
},[] )

useEffect(()=> {
setTimeout(() => {
  setErr('')
}, 3000);
} , [err] )


  return (
    <div className='  '>
      
      

 
{data.price}




    <div
      style={{
        transform: "translate(-50%, -50%)",
      }}
      className={` ${  err =='successful' ? '    opacity-100 z-10' : '  opacity-0 -z-10 '  }  duration-300   md:font-medium top-[50%]  text-white text-lg   md:text-3xl   left-[50%] flex fixed   text-center  items-center justify-center   w-[80vw] md:w-[40vw]  h-16  md:h-24   flex-col item-center    bg-green-400  rounded-xl `}
    >
       Your Booking Was Seccessful <span className=' flex gap-4 justify-center items-center'>
congratulations   <img className='  w-[30px] md:w-[35px]' src={congrate}  />
         </span>     
    
   
</div>
 
    </div>
  )
}

export default Bookings