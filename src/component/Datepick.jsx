import {React , useState} from 'react'
import { addDays } from 'date-fns'
import format from 'date-fns/format'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css fil
 
import { DateRange } from 'react-date-range'
function Datepick({daysStayed,Aopen ,formattedCheckInDate ,handleCheckInChange ,handleCheckOutChange,formattedCheckOutDate}) {
  const [open, setOpen] = useState(false)
 
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),  
      key: 'selection'
    }
  ])
 
 

  return (
    <div className=" flex  h-full  gap-1 p-2 justify-between flex-row w-full px-2">
   
   
   
   <div onClick={ ()=> setOpen(!open)  } className=' w-full relative    h-full' >
 
      <label onClick={ ()=> setOpen(!open)  } className=' w-full h-20  relative ' htmlFor="">

<p className="absolute top-0 left-3 t text-[10px]  text-gray-500">CHECK-IN</p>
<input className='   h-20   bg-slate-100' type="text" disabled   value={`${format(range[0].startDate, "MM/dd/yyyy")}  `}/>

</label>
   


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

    {open  &&  <span className=' absolute top-10 z-40 right-0 h-full w-full bg-slate-100'>
    <span onClick={ ()=> setOpen(!open)  }className=' w-full h-full fixed   top-0  '>

    </span>
    <span  className=' absolute z-40'>
        <DateRange
            rangeColors={'#578280'}
            onChange={item => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            color='#578280'
            minDate={new Date()}
            direction="horizontal"
            className="calendarElement"
          /> 
    </span>

           </span> 
           }
    
  </div>
  )
}

export default Datepick