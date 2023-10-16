import {React , useState} from 'react'
import { addDays } from 'date-fns'
import format from 'date-fns/format'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css fil
 
import { DateRange } from 'react-date-range'
function Datepick({daysStayed,Aopen  , setRange,range }) {
  const [open, setOpen] = useState(false)
 

 console.log('range[0]?.endDate ' + range[0]?.endDate)

  return (
    <div className=" flex  h-full  gap-1  pt-2 justify-between flex-row w-full px-2">
   
   
   
   <div  className=' w-full relative  flex flex-row    h-full' >
 
      <label onClick={ ()=> setOpen(!open)  } className=' w-full   h-full relative ' htmlFor="">

<p className="absolute  top-0 left-3 t text-[10px]  text-gray-500">CHECK-IN</p>
<input className=' bg-white rounded-tl-xl   px-2 border-solid border-[1px] h-16   w-full ' type="text" disabled   value={`${format(range[0].startDate, "MM/dd/yyyy")}  `}/>

</label>
   <span className=' w-full  h-full  relative'>
   <p className="absolute top-0 left-3 t text-[10px]  text-gray-500">CHECK-OUT</p>
<input onClick={ ()=> setOpen(!open)  } className=' bg-white px-2 border-solid border-[1px] border-l-0 rounded-tr-xl  w-full h-16  ' type="text" disabled   value={`${format(range[0].endDate, "MM/dd/yyyy")}  `}/>
   </span>

   </div>
   
    {/* <div className="relative w-full ">
      {Aopen && (
        <span className="absolute top-3 left-3 transform -translate-y-1/2 text-[10px]  text-gray-500">
          CHECK-IN
        </span>
      )}
      <input
        className={`h-14 cursor-pointer  w-full  bg-white px-2 border-[2px] border-solid rounded-lg   ${
          !Aopen ? "hidden" : "flex"
        }`}
        type="date"
        id="dateInput"
        value={formattedCheckInDate}
        onChange={handleCheckInChange}
        name="dateInput"
      />
    </div>
    <div className="relative w-full">
      {Aopen && (
        <span className="absolute top-3 left-3  transform -translate-y-1/2 text-[10px] text-gray-500">
          CHECKOUT
        </span>
      )}
      <input
        className={`h-14  cursor-pointer px-2  bg-white  w-full  border-[2px] border-solid rounded-lg     ${
          !Aopen ? "hidden" : "flex"
        }`}
        type="date"
        onChange={handleCheckOutChange}
        min={formattedCheckInDate}
        value={
          daysStayed <= 0
            ? "Select the Check Out date"
            : formattedCheckOutDate
        }
        id="dateInput"
        name="dateInput"
      />
    </div> */}

    {open  &&  <span className=' absolute top-10 z-30 right-0 h-full w-full bg-slate-100'>
    <span onClick={ ()=> setOpen(!open)  }className=' w-full h-full fixed   top-0  '>

    </span>
    <span  className= '  flex-col fixed      top-0 right-0 bg-white md:absolute w-full h-full flex items-center justify-center z-40'>
      
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
            direction='vertical'
            className="calendarElement"
          /> 
           <span onClick={()=> setOpen(false)} >done</span>
    </span>

           </span> 
           }
    
  </div>
  )
}

export default Datepick