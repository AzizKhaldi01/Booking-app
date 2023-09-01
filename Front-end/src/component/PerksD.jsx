import React from 'react'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PetsIcon from '@mui/icons-material/Pets';

import CountertopsIcon from '@mui/icons-material/Countertops';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';

export default function PerksD({perk}) {
  return (
    <div>
       
            <>
              {perk === "wifi" && ( <div className= ' items-center  flex gap-2'>   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
</svg> <span>Wifi</span> </div> )}

              {perk === "tv" && ( <div className= ' items-center  flex gap-2'>    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
</svg> <span>TV</span></div> )}

              {perk === "parking" && ( <div className= ' items-center  flex gap-2'> <DirectionsCarIcon /> <span>Free parking</span>  </div> )}

              {perk === "entrance" && ( <div className='   items-center flex gap-2'> <MeetingRoomIcon/> <span>Privet entrance</span>  </div> )}

              {perk === "Pets" && ( <div className= ' items-center  flex gap-2'> <PetsIcon/> <span>Pets</span>  </div> )}

               {perk === "Radio" && ( <div className=' flex gap-2'>   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z" />
</svg><span>Radio</span></div> )}

{perk === "Kitchen" && ( <div className= ' items-center  flex gap-2'> <CountertopsIcon /> <span>Kitchen</span>  </div> )}
               {perk === "Gym" && ( <div className= ' items-center  flex gap-2'> <FitnessCenterIcon /> <span>Gym</span>  </div> )}      
                        {perk === "Pool" && ( <div className= ' items-center  flex gap-2'> <PoolIcon /> <span>Pool</span>  </div> )}
                        {perk === "Washing machine" && ( <div className= ' items-center  flex gap-2'> <LocalLaundryServiceIcon /> <span>Washing machine</span>  </div> )}
            </>
       
    </div>
  )
}
