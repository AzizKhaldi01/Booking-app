import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
function ExtraInfo({extra,setExtra , data}) {
  return (
    <div   className=  {`   duration-300  ${ extra ?   'top-0  z-50  ' : 'top-[-100%]  -z-10  ' }  text-gray-800 duration-300    flex   fixed h-full w-full relateve `}>
  
    <div onClick={ ()=> setExtra(!extra)  } className= {` flex  fixed h-full w-full    ${extra ? ' opacity-50 top-0  ' : 'opacity-0  top-[100%]   '  }  right-0 bg-black`}></div>
 
 
 
  <div    className={  `  ${ extra ?   ' opacity-100  z-50  top-0' : ' top-[100%]   -z-10 opacity-0 ' }  py-4   duration-300   flex-grow   text-[12px] h-[90vh]       w-[90%] lg:w-[45%] bg-white rounded-lg fixed   top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}>
 
  
  <div className=' right-0  h-10  p-2  absolute top-0 w-full bg-white  rounded-t-2xl'>
<span onClick={ ()=> setExtra(!extra)  } className=' cursor-pointer'>
    <CloseIcon  fontSize='small' />
</span>

  </div>
    
    <div className='  p-10  h-full w-full overflow-auto'>
    <h1 className=' text-2xl font-semibold py-5'>About this space</h1>
       {data.extraInfo}  
    </div>
    
    </div>

  </div>
  )
}

export default ExtraInfo