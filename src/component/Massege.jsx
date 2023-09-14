import {React ,useEffect} from 'react'


function Massege({msg , img , setMsg  }) {
 
 
    useEffect(() => {
        if (msg !== '') {
          const timer = setTimeout(() => {
             
            setMsg('');
          }, 1000);
    
          return () => clearTimeout(timer);
        }
      }, [msg]);
  

    return (
    <div className= {` transform  bottom-32 md:bottom-12 -left-20 translate-x-1/2  translate-y-1/2 flex flex-row h-16  border-solid text-sm border-b-[1px]  border-main   rounded-xl shadow-lg fixed  ${ msg =='' ? ' opacity-0' : ' opacity-100' }  left-5 w-[270px] bg-white  duration-200  items-center gap-3 justify-start px-1 `} >      
       <img className=' w-[50px] h-[50px] rounded-md  object-cover ' src={`http://localhost:4000/uploads/${img}`} alt="img" />
       {msg =="added"   ?  'Added to the wishlist'  :  'Removed from the wishlist'}
    </div>
  )
}

export default Massege