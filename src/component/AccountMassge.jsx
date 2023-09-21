import React from 'react'
import  Checkmarke  from '../img/checkmark.svg'
function AccountMassge({Msg}) {


  return (
    <div className=  { `   ${ Msg == 'saved' ? ' opacity-100 z-20' :  ' opacity-0 -z-10'  }   gap-5 absolute  justify-end pb-2 items-center top-1/2 flex-col    flex left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[200px] w-[300px] bg-white  rounded-lg shadow-xl `} >
 <img className=' w-[30%] ' src={Checkmarke} alt="Checkmarke" />



<h1 className='  text-center text-lg  text-[#6bbe66] '>Account update saved <br /> successfully</h1>
 
  </div>
  
  )
}

export default AccountMassge