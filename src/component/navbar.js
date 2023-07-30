import React from 'react'
import { Link } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { Usercontext } from '../context/pagecontext';
import PersonIcon from '@mui/icons-material/Person';
function Navbar() {

  const {User} = useContext(Usercontext);
 
  return (
    <div className=' w-full h-16   z-20  bg-white  fixed top-0 right-0 flex flex-row justify-between  p-10  '>
        
         <Link to= '/'><div className='  text-lg font-medium'>airbnb</div></Link>
         <div className='      h-full w-[60px]      bg-black z-20 '>
            <SearchIcon/>
            i
         </div>
         <div className='  flex flex-row  gap-2 '>
         <Link to= { User ?  '/account' : '/login'}><PersonIcon/> </Link>
         <LanguageIcon className=' cursor-pointer'/>
         {!! User && (<div className=' '> {User.name} </div>)}
              </div>
    </div>  
  )
}

export default Navbar