import React from 'react'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PetsIcon from '@mui/icons-material/Pets';
<<<<<<< HEAD
import CountertopsIcon from '@mui/icons-material/Countertops';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
=======

>>>>>>> origin/main
export default function  Perks({selected , onChange}) {

  function hendlchekbox(e){
     

    const {name , checked } = e.target

    if(checked){
      onChange([...selected , name ])
    }else{
       onChange([...selected.filter(selectedName=> selectedName !== name )])
    }
     

    
  }
 
  return (
    < > 
    <label className='   border-2 p-2 rounded-lg flex justify-start items-center flex-row gap-3 text-xs cursor-pointer'  htmlFor="Wifi">
  <input onChange={  hendlchekbox   }  checked={ selected?.includes('wifi')} type="checkbox" name="wifi" id="Wifi" />
  <span className=' w-full flex   items-center gap-2'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
</svg>
 Wifi</span>
</label>
<label  className='   border-2 p-2 rounded-lg flex justify-start items-center flex-row gap-3 text-xs cursor-pointer'  htmlFor="parking">
  <input onChange={  hendlchekbox   } checked={ selected?.includes('parking')} type="checkbox" name="parking" id="parking" />
  <span className=' w-full flex   items-center gap-2'> <DirectionsCarIcon/>
 Free parking</span>
</label>
<label className='   border-2 p-2 rounded-lg flex justify-start items-center flex-row gap-3 text-xs cursor-pointer'  htmlFor="TV">
  <input onChange={  hendlchekbox   } checked={ selected?.includes('tv')} type="checkbox" name="tv" id="TV" />
  <span className=' w-full flex   items-center gap-2'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
</svg>
 TV </span>
</label>
<label className='   border-2 p-2 rounded-lg flex justify-start items-center flex-row gap-3 text-xs cursor-pointer'  htmlFor="entrance">
  <input onChange={  hendlchekbox   } checked={ selected?.includes('entrance')} type="checkbox" name="entrance" id="entrance" />
  <span className=' w-full flex   items-center gap-2'> <MeetingRoomIcon/> Privet entrance</span>
</label>
<label className='   border-2 p-2 rounded-lg flex justify-start items-center flex-row gap-3 text-xs cursor-pointer'  htmlFor="Pets">
  <input onChange={  hendlchekbox   } checked={ selected?.includes('Pets')} type="checkbox" name="Pets" id="Pets" />
  <span className=' w-full flex   items-center gap-2'> <PetsIcon/> Pets</span>
</label>

<label className='   border-2 p-2 rounded-lg flex justify-start items-center flex-row gap-3 text-xs cursor-pointer'  htmlFor="Radio">
  <input onChange={  hendlchekbox   } checked={ selected?.includes('Radio')} type="checkbox" name="Radio" id="Radio" />
  <span className=' w-full flex   items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z" />
</svg>
 Radio</span>
</label>
<<<<<<< HEAD
<label className='   border-2 p-2 rounded-lg flex justify-start items-center flex-row gap-3 text-xs cursor-pointer'  htmlFor="Kitchen">
  <input onChange={  hendlchekbox   } checked={ selected?.includes('Kitchen')} type="checkbox" name="Kitchen" id="Kitchen" />
  <span className=' w-full flex   items-center gap-2'> <CountertopsIcon/>
Kitchen</span>
</label>
    <label className='   border-2 p-2 rounded-lg flex justify-start items-center flex-row gap-3 text-xs cursor-pointer'  htmlFor="Washing machine">
  <input onChange={  hendlchekbox   } checked={ selected?.includes('Washing machine')} type="checkbox" name="Washing machine" id="Washing machine" />
  <span className=' w-full flex   items-center gap-2'> <LocalLaundryServiceIcon/>
  Washing machine</span>
</label>

 <label className='   border-2 p-2 rounded-lg flex justify-start items-center flex-row gap-3 text-xs cursor-pointer'  htmlFor="Gym">
  <input onChange={  hendlchekbox   } checked={ selected?.includes('Gym')} type="checkbox" name="Gym" id="Gym" />
  <span className=' w-full flex   items-center gap-2'> <FitnessCenterIcon/>
  Gym</span>
</label>

<label className='   border-2 p-2 rounded-lg flex justify-start items-center flex-row gap-3 text-xs cursor-pointer'  htmlFor="Pool">
  <input onChange={  hendlchekbox   } checked={ selected?.includes('Pool')} type="checkbox" name="Pool" id="Pool" />
  <span className=' w-full flex   items-center gap-2'> <PoolIcon/>
  Pool</span>
</label>
</ >
=======
    </ >
>>>>>>> origin/main
  )
}
