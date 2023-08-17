import { useContext, React, useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { BookingContext } from "../context/Bookingconext";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
 
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import Gestes from "../component/Gestes";
import RemoveIcon from "@mui/icons-material/Remove";
import EditGeusts from "../component/EditGeusts";
import Datepick from "../component/Datepick";
import { DatePicker } from "@mui/x-date-pickers";
function Booking() {
  const { 
    formattedCheckOutDate,
        formattedCheckInDate, 
  } = useContext(BookingContext);

  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(false);
  const [open, setOpen] = useState(true);
  const [Dopen, setDopen] = useState(false);
  const [selectedRange, setSelectedRange] = useState([]);
  const [editGeust , setEditGeust]=useState([])
  const [editCheckOutDate,setEditCheckOutDate]= useState(new Date())
  const [editCheckInDate,seteditCheckInDate]=useState(new Date())

  const navigate = useNavigate();

  const maxgeustes = localStorage.getItem("maxgeustes");
  const storedGuest = localStorage.getItem("guest");
  const geustes = JSON.parse(storedGuest);


  
  const storedCheckInDate = localStorage.getItem("checkInDate");
  const Checkin = new Date (storedCheckInDate) 
 const fromday = Checkin.getDate();
  const frommonth = Checkin.getMonth();


  const storedCheckOutDate = localStorage.getItem("checkOutDate");
const Checkout = new Date (storedCheckOutDate) 
  const today = Checkout.getDate();
  const tomonth = Checkout.getMonth();




  function dicrementGuests(e, title) {
    e.preventDefault();

    setEditGeust((prevGuest) => ({
      ...prevGuest,
      [title]:
        prevGuest[title] > 1
          ? title === "Adults"
            ? prevGuest[title] - 1
            : prevGuest[title] - 1
          : title === "Adults"
          ? 1
          : 0,

         
    }));
    
  }




  const handleDateChange = (newRange) => {
    setSelectedRange(newRange);
 

    console.log( selectedRange[0]?.$d)
  

  };

  function incrementGuests(e, title) {
    //  Guest.Children + Guest.Adults   <  data.maxGuests
   
console.log(maxgeustes)
    setEditGeust((prevGuest) => {
      const totalGuests = prevGuest.Adults + prevGuest.Children;
      

      if (
        totalGuests < maxgeustes ||
        (title === "Infants" && prevGuest.Infants < 3) ||
        (title === "Pets" && prevGuest.Pets < 2)
      ) {

        return {
          ...prevGuest,
          [title]: prevGuest[title] + 1,
        };
      } else {
        return prevGuest;
      }
    });
   
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

 

  useEffect(() => {
    if (frommonth !== tomonth) {
      setMonth(true);
    }
  }, []);
 

      function handelsetdata  (){
 
    localStorage.setItem('guest', JSON.stringify(editGeust));
    setOpen(!open);
   }

  let storeddays = localStorage.getItem("daysStayed");
  let imgUrl = localStorage.getItem("imageUrl");
  const shortMonthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handelCancel = () => {
    setOpen(!open);
    
  };

 
  useEffect(() => {
    const storedCheckInDate = localStorage.getItem("checkInDate");
    const storedCheckOutDate = localStorage.getItem("checkOutDate");
    const storedGuest = localStorage.getItem("guest");

    if (storedCheckInDate) {
       seteditCheckInDate(new Date(storedCheckInDate));
    }

    if (storedCheckOutDate) {
      setEditCheckOutDate(new Date(storedCheckOutDate));
    }
    if (storedGuest) {
      setEditGeust(JSON.parse(storedGuest))
      // setGuest(JSON.parse(storedGuest));
    }
  }, [open]);


  // const handleCheckOutChange = (event) => {
  //   const newDate = new Date(event.target.value);
  //   // Check if the new check-out date is greater than or equal to the check-in date

  //   if (newDate >= checkInDate) {
  //     setCheckOutDate(newDate);
  //   }
  // };


  
  // const handleCheckInChange = (event) => {
  //   const newDate = new Date(event.target.value);
  //   // Check if the new check-in date is less than or equal to the check-out date
  //   const Datenow = new Date();
  //   if (newDate >= Datenow) {
  //     setCheckInDate(newDate);
  //   }
    
  // };



  const Gdata = [
    {
      title: "Adults",
      desc: "Age 13+",
      value: editGeust.Adults,
    },
    {
      title: "Children",
      desc: "Ages 2–12",
      value: editGeust.Children,
    },
    {
      title: "Infants",
      desc: "Under 2",
      value: editGeust.Infants,
    },

    {
      title: "Pets",
      value: editGeust.Pets,
    },
  ];

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className=" relative text-gray-900 px-2 md:px-20   pt-36 flex flex-row  h-full ">
      <div className=" absolute h-full w-[70%]  bg-gray-100 -z-10 top-0 left-0"></div>

      <div className="   w-full  md:w-[70%]  ">
        <h1 className=" w-full    z-10  text-3xl">
          {" "}
          <span
            className="  hover:scale-110 cursor-pointer"
            onClick={handleGoBack}
          >
            <KeyboardArrowLeftIcon className=" scale-150 hover:scale-[1.7] " />{" "}
          </span>{" "}
          Request to book
        </h1>
        <div className=" pt-10  px-10 flex-col flex    w-full">
          <div
            className={` overflow-y-hidden    flex-grow   overflow-x-hidden o relative ${
              isOpen ? " h-[14rem] " : "h-12"
            }  bg-white rounded-lg border-[1px] border-solid transition-all w-full`}
          >
            <h1
              className={` absolute top-3 left-2 flex flex-row justify-between px-2   w-full  `}
            >
              your trip{" "}
              <span onClick={toggleDropdown}>
                <KeyboardArrowDownIcon
                  className={`  cursor-pointer ${
                    isOpen ? " " : " rotate-180"
                  } scale-125    mr-3  `}
                />
              </span>
            </h1>

            <div
              className={`  duration-300 ${
                isOpen ? " opacity-100" : "opacity-0"
              }  absolute top-14 left-5  w-full flex  flex-col gap-4  px-4  `}
            >
              <div className=" flex items-center flex-row w-full justify-between  ">
                <div className=" flex flex-col  gap-1 w-full">
                  <h1 className=" font-semibold">Dates</h1>
                  <span className=" text-sm">
                    {fromday} {month ? shortMonthNames[frommonth] : ""}
                    <RemoveIcon fontSize="small" />
                    {today} {shortMonthNames[tomonth]}
                  </span>
                </div>

                <button onClick={() => setDopen(!Dopen)} className=" flex items-center justify-center h-10  w-10 m-4  hover:bg-gray-100 rounded-[50%] ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
              </div>

              <div className=" flex items-center flex-row w-full justify-between  ">
                <div className=" flex flex-col  gap-1 w-full">
                  <h1 className=" font-semibold">Guests</h1>
                  <span className=" text-sm">
                    {geustes.Adults > 0 && (
                      <span> gests {geustes.Adults + editGeust.Children}</span>
                    )}
                    {geustes.Infants > 0 && (
                      <span>, infants {geustes.Infants}</span>
                    )}
                    {geustes.Pets > 0 && <span>, pets {geustes.Pets}</span>}
                  </span>
                </div>
                <button
                  onClick={() => setOpen(!open)}
                  className=" flex items-center justify-center h-10  w-10 m-4  hover:bg-gray-100 rounded-[50%] "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="  w-full h-96 bg-white mt-4"></div>
        </div>
      </div>
      <div className=" w-full  md:w-[30%]  "></div>
 
 
      <div
    className={` duration-300  ${
      !Dopen ? "top-[50%]" : "top-[-100%] "
    }  flex  z-50 fixed h-full w-full relateve `}
  >
    <div
      onClick={() => setDopen(!Dopen)}
      className={`  flex  fixed h-full w-full absulet ${
        !Dopen ? " opacity-50 top-0  " : "opacity-0  top-[-100%]   "
      }  right-0 bg-black `}
    ></div>

    <div
      style={{
        transform: "translate(-50%, -50%)",
      }}
      className={`  duration-300     left-[50%] flex fixed   h-[85%] w-[90%]  md:w-[50%]  pt-3   flex-col item-center   bg-white rounded-xl `}
    >
      <div className=" h-16 w-full absolute top-0   flex flex-col justify-between items-start px-3 pt-5   right-0">
        <span
          onClick={() => setDopen(!Dopen)}
          className=" cursor-pointer absolute top-1 left-2   "
        >
          x
        </span>
        <h1 className=" text-2xl   pt-5   text-gray-900 font-semibold">
          Date
        </h1>
      </div>
      <div className="  items-center h-16 w-full flex flex-row justify-between px-5 absolute bottom-0  z-    right-0">
       
      <button onClick={ handelCancel} className=" border-[1px] border-solid  px-8 rounded-lg p-2">
          Cancel
        </button>
        <button className="  text-white bg-[#578280]  px-8 rounded-lg p-2"  onClick={handelsetdata}>
          Save
        </button>
   
      </div>
      <div className="  items-center justify-center   py-20  w-full h-full  flex  flex-col">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangeCalendar']}>
        <DateRangeCalendar    onChange={handleDateChange} />
      </DemoContainer>
    </LocalizationProvider>
       
      </div>

      </div>
     
      </div>
       


 
      <EditGeusts open={open}  setOpen={setOpen}  handelsetdata={handelsetdata}  handelCancel={handelCancel} Gdata={Gdata}   maxgeustes={maxgeustes}  incrementGuests={incrementGuests}  dicrementGuests={dicrementGuests} />
    </div>
  );
}

export default Booking;
