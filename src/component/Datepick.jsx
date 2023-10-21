import {React , useState} from 'react'
import { addDays } from 'date-fns'
import { useMediaQuery } from 'react-responsive'
import format from 'date-fns/format'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css fil
 
import { DateRange } from 'react-date-range'
function Datepick({daysStayed,Aopen  , setRange,range }) {
  const [open, setOpen] = useState(false)
 
  const isMobile = useMediaQuery({ maxWidth: 767 });
 console.log('daysStayed  '  + daysStayed)

  return (
    <div className=" flex  relative   gap-1  pt-2 justify-between flex-row w-full px-2">
   
   
   
   <div  className='   relative  flex flex-row   w-full  h-full' >
 
      <label  className=' w-full     relative ' htmlFor="">

<p className="absolute  top-0 left-3 t text-[10px]  text-gray-500">CHECK-IN</p>
<input onClick={ ()=> setOpen(!open)  }  className=' bg-white rounded-tl-xl  cursor-pointer     px-2 border-solid border-[1px] h-16   w-full ' type="text"   readOnly   value={`${format(range[0].startDate, "MM/dd/yyyy")} `}/>

</label>
   <span   className=' w-full  h-full  relative'>
   <p className="absolute top-0 left-3 t text-[10px]  text-gray-500">CHECK-OUT</p>
<input onClick={ ()=> setOpen(!open)  } className=' bg-white px-2   cursor-pointer  border-solid border-[1px] border-l-0 rounded-tr-xl  w-full  h-16  ' type="text"  readOnly   value={`${format(range[0].endDate, "MM/dd/yyyy")}  `}/>
   </span>


   {open  &&  <span className=' fixed  md:absolute  top-0    z-40 right-0 h-full w-full  md:items-start items-center       md:justify-start justify-center gap-3 flex flex-col  bg-slate-100'>
   
    <span onClick=  { ()=> setOpen(!open)  }className=' w-full h-full fixed   -z-10   top-0  '>

    </span>
     
        <DateRange
            rangeColors={'#578280'}
            onChange={item => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
             
            color='#578280'
            minDate={new Date()}
             fixedHeight
            direction= {isMobile  ?   'vertical':'horizontal'}
            className="calendarElement "
          /> 
           <span className=' p-2 px-3 bg-main text-white rounded-lg md:hidden flex ' onClick={()=> setOpen(false)} >done</span>  </span> 
          
      
           }

   </div>
   
  


    
  </div>
  )
}

export default Datepick