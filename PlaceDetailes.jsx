import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExtraInfo from "../component/ExtraInfo";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import PerksD from "../component/PerksD";
import PhotoSlider from "../component/Imageslaider";
import PlaceIcon from "@mui/icons-material/Place";
import Gestes from "../component/Gestes";
import Datepicker from "react-tailwindcss-datepicker";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { format, differenceInDays } from "date-fns";

function PlaceDetailes() {
  const [morephotos, setMorephotos] = useState(false);
  const [extra, setExtra] = useState(false);
  const [data, setData] = useState({}); // Initialize data as an empty object
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [Aopen, setAopen] = useState(false);
  const [Gopen, setGopen] = useState(false);
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [checkInDate, setCheckInDate] = useState(new Date());

  const [Guest, setGuest] = useState({
    Adults: 1,
    Children: 0,
    Infants: 0,
    Pets: 0,
  });
 
  const { _id } = useParams();
  const daysStayed = differenceInDays(checkOutDate, checkInDate);
 

  function handelBooking (){
    axios.post('/booking-add' , {checkInDate ,checkOutDate,Guest ,daysStayed ,_id  , price:data.price * daysStayed })
  }

  useEffect(() => {
    const nextDay = new Date(checkInDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCheckOutDate(nextDay);
  }, [checkInDate]);

  const handleCheckOutChange = (event) => {
    const newDate = new Date(event.target.value);
    // Check if the new check-out date is greater than or equal to the check-in date

    if (newDate >= checkInDate) {
      setCheckOutDate(newDate);
    }
  };

  const handleCheckInChange = (event) => {
    const newDate = new Date(event.target.value);
    // Check if the new check-in date is less than or equal to the check-out date
    const Datenow = new Date();
    if (newDate >= Datenow) {
      setCheckInDate(newDate);
    }
  };

  const formattedCheckOutDate = format(checkOutDate, "yyyy-MM-dd");
  const formattedCheckInDate = format(checkInDate, "yyyy-MM-dd");



  useEffect(() => {
    axios.get("/place-details/" + _id).then((response) => {
      const { data } = response;
      setData(data);
      setIsLoading(false); // Once data is fetched, set isLoading to false
    });
  }, [_id]);



  

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading message or spinner while waiting for data
  }

  function hendelmorephotos() {
    setMorephotos(!morephotos);
    document.body.style.overflow = !morephotos ? " hidden" : "auto";
  }

    function dicrementGuests(e , title) {
      e.preventDefault();
     
    
    
    setGuest((prevGuest) => ({
      ...prevGuest,
      [title]: prevGuest[title] >  1 ? (title === "Adults" ? prevGuest[title] - 1 : prevGuest[title] - 1) : (title === "Adults" ? 1 : 0),
    }));
  }

  function incrementGuests(e , title) {
  //  Guest.Children + Guest.Adults   <  data.maxGuests 
    
  setGuest((prevGuest) => {
    const totalGuests = prevGuest.Adults + prevGuest.Children ;
    const maxGuests = data.maxGuests;

    if ( (totalGuests < maxGuests) ||
        (title === 'Infants' && prevGuest.Infants < 3) ||
        (title === 'Pets' && prevGuest.Pets < 2)) {
      return {
        ...prevGuest,
        [title]: prevGuest[title] + 1   
      };
    } else {
      return prevGuest;
    }
  });
    


  
  }


  const Gdata = [
    {
      title: "Adults",
      desc: "Age 13+",
      value: Guest.Adults,
    },
    {
      title: "Children",
      desc: "Ages 2–12",
      value: Guest.Children,
    },
    {
      title: "Infants",
      desc: "Under 2",
      value: Guest.Infants,
    },

    {
      title: "Pets",
      value: Guest.Pets,
    },
  ];

  return (
    <div className="  overflow-hidden   px-3 lg:px-12 w-full h-full  gap-12  mt-40 justify-between flex   flex-col-reverse md:flex-row">
      <div className="  w-full md:w-[40%] flex flex-col     ">
        <div className="  text-2xl md:text-3xl font-bold max-w-[80%] ">
          {data.title}
        </div>
        <p className="  text-xs py-3 text-gray-600">
          {" "}
          <PlaceIcon fontSize="small" /> {data.address}
        </p>
        <div
          onClick={hendelmorephotos}
          className="md:hidden  scale-110  py-7 cursor-pointer block   relative w-full    "
        >
          <PhotoSlider nonav={false} photos={data.photos} />
        </div>

        <div className=" flex flex-row gap-1 my-4 text-2xl  items-center  font-semibold">
          {" "}
          ${data.price}{" "}
          <span className=" font-normal  text-gray-700 text-sm  ">/ night</span>{" "}
        </div>

        <div className="        flex-row    justify-between    text-sm items-center relative  w-full lg:w-[70%] h-20 border-[#6d9c9a] border-[1px] border-solid rounded-full my-10 flex ">
          <p className=" font-semibold px-8">Check Availability</p>
          <span
            onClick={() => setAopen(!Aopen)}
            className="bg-[#578280] cursor-pointer rounded-full flex items-center justify-center text-white      h-20 w-20  "
          >
            <CalendarMonthIcon />
          </span>

          <div
            className={`    absolute   max-w-[450px]     shadow-2xl  duration-150 bg-white rounded-xl   ${
              Aopen ? "h-[300px]" : " h-0"
            }   z-20   top-20  left-0   `}
          >
            <div className=" flex   gap-1 pt-2 justify-between flex-row w-full px-2">
              <div className="relative">
                {Aopen && (
                  <span className="absolute top-3 left-3 transform -translate-y-1/2 text-[10px]  text-gray-500">
                    CHECK-IN
                  </span>
                )}
                <input
                  className={`h-14 cursor-pointer   px-2 border-[2px] border-solid rounded-lg   ${
                    !Aopen ? "hidden" : "flex"
                  }`}
                  type="date"
                  id="dateInput"
                  value={formattedCheckInDate}
                  onChange={handleCheckInChange}
                  name="dateInput"
                />
              </div>
              <div className="relative">
                {Aopen && (
                  <span className="absolute top-3 left-3  transform -translate-y-1/2 text-[10px] text-gray-500">
                    CHECKOUT
                  </span>
                )}
                <input
                  className={`h-14  cursor-pointer px-2    border-[2px] border-solid rounded-lg     ${
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
              </div>
            </div>

            <div
              className={` ${
                !Aopen ? "hidden" : "flex"
              }  flex  relative  max-w-full  flex-col  `}
            >
              <div className=" w-full flex items-center justify-center">
                <h1
                  onClick={() => setGopen(!Gopen)}
                  className="    border-2  justify-between    mt-1 rounded-lg cursor-pointer mb-5  w-[95%] px-4 flex flex-row items-center  h-16  gap-2  text-sm      md:text-[15px]    font-normal      "
                >
                  {" "}
                  <span className="   flex flex-row gap-3">
                    {Guest.Adults + Guest.Children    } Geusts {     Guest.Infants   <    1   ?  '' : ' ,' +     (Guest.Infants == 1 ?   Guest.Infants + ' infant' :Guest.Infants + ' infants' ) } {     Guest.Pets <     1   ?  '' : ' ,' +     (Guest.Pets == 1 ?   Guest.Pets + ' Pet' :Guest.Pets + ' Pets' )   }
                  </span> 
 <KeyboardArrowDownIcon  className= {`  duration-150 transition-all ${ !Gopen ?  'rotate-180' : ' rotate-0'}    `} />
                </h1>
              </div>

              {Gopen && (
                <div
                  className={` gap-4      w-full  top-12  shadow-xl   ${
                    Gopen ? "h-[250px] opacity-100" : "h-0 opacity-0"
                  } duration-150 rounded-3xl bg-white absolute gap-5   flex flex-col max-w-full px-4   `}
                >
                  {Gdata.map((item) => (
                    <Gestes
                
                      onClick={incrementGuests} // Fix the function name here
                      dicrementGuests = {dicrementGuests}
                      Geust={item.value} // Change this to item.value
                      title={item.title}
                      name={item.title}
                      desc={item.desc}
                      maxGuests={data.maxGuests}
                    />
                  ))}
                </div>
              )}

              <div className={`  w-full flex items-center justify-center `}>
                <button onClick={handelBooking} className=" h-12 text-lg  font-medium text-white w-[95%]  bg-[#578280] rounded-lg">
                  Reserve
                </button>
              </div>

              <div className=" w-full flex   flex-col   items-center    text-lg pt-16 px-4">
                <div className=" flex w-full justify-between items-center">
                  <span className="text-sm ">
                    ${data.price} x {daysStayed <= 0 ? 0 : daysStayed} nights
                  </span>
                  {daysStayed <= 0 ? 0 : "$" + data.price * daysStayed  }
                </div>

                <span>{}</span>
              </div>
            </div>
          </div>
        </div>

        <p className=" w-full  leading-6    text-gray-800 text-[13px] py-3  ">
          {data.description.length >= 420 ? (
            <p>
              {" "}
              {data.description.substring(0, 420) + "..."}{" "}
              <p
                onClick={() => setExtra(!extra)}
                className=" hover:opacity-70 underline cursor-pointer flex items-center    w-[30%] text-black"
              >
                {" "}
                Show More <ChevronRightIcon />{" "}
              </p>{" "}
            </p>
          ) : (
            <p>
              {" "}
              {data.description}{" "}
              <p
                onClick={() => setExtra(!extra)}
                className=" hover:opacity-70 underline cursor-pointer flex items-center    w-[30%] text-black"
              >
                {" "}
                Show More <ChevronRightIcon />{" "}
              </p>{" "}
            </p>
          )}
        </p>

        <div
          className={`  duration-300 ease-out      overflow-hidden    flex flex-col items-center  bg-white fixed h-full  ${
            morephotos ? " top-0 opacity-[100%] " : " opacity-0 top-[100%]"
          } w-full right-0    z-50  `}
        >
          <div className="  p-3 w-full absolute h-16 bg-white">
            {" "}
            <span onClick={hendelmorephotos} className=" cursor-pointer">
              <CloseIcon fontSize="small" />{" "}
            </span>{" "}
          </div>

          <div
            className={` ${
              !morephotos ? "  opacity-0  " : " opacity-100  "
            }   duration-1000 rounded-md  flex flex-col items-center      h-full  w-full    overflow-auto   `}
          >
            {data.photos.map((photo) => (
              <img
                className="  rounded-lg p-2  w-full md:w-[60%]   "
                src={"http://localhost:4000/uploads/" + photo}
                alt=""
              />
            ))}
          </div>
        </div>

        <ExtraInfo setExtra={setExtra} extra={extra} data={data} />

        <div className="   pt-14 flex-row gap-8 grid grid-cols-2   text-xs items-start justify-start w-full">
          {data.perks.map((perk) => (
            <PerksD perk={perk} />
          ))}
        </div>
      </div>

      <div
        onClick={hendelmorephotos}
        className=" w-full hidden  md:block gap-10 md:w-[60%]  cursor-pointer "
      >
        <img
          className=" rounded-[4rem]  h-[75vh] object-cover w-full "
          src={"http://localhost:4000/uploads/" + data?.photos[0]}
          alt=""
        />
        <div className=" w-full  items-center justify-center flex flex-row  gap-3">
          <div
            className="  h-[200px] rounded-[3rem] my-5 bg-cover "
            style={{
              backgroundImage: `url(http://localhost:4000/uploads/${data?.photos[1]})`,

              backgroundPosition: "center",
              width: "100%",
            }}
          />
          <div
            className="  h-[200px] rounded-[3rem] my-5 bg-cover "
            style={{
              backgroundImage: `url(http://localhost:4000/uploads/${data?.photos[2]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
            }}
          />
        </div>

        <div className=" relative">
          <img
            className=" h-[60vh] mb-8 rounded-[4rem] object-cover w-full "
            src={"http://localhost:4000/uploads/" + data?.photos[3]}
            alt=""
          />
          <span className=" items-center flex justify-center absolute cursor-pointer border-[1px]  border-gray-600  text-xs gap-2 text-gray-700 border-solid bg-white rounded-lg h-8 bottom-5  right-7  p-2">
            {" "}
            <BorderAllIcon fontSize="small" /> more photos{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetailes;
