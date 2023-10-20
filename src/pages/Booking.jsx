import { React, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/pagecontext";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import EditGeusts from "../component/EditGeusts";
import EditDate from "../component/EditDate";
import BookingDetails from "../component/BookingDetails";
import FormPay from "../component/FormPay";
import paywith from "../img/paywith.webp";
import Topbar from "../component/Topbar";
import { addDays } from 'date-fns'
function Booking() {
  const [isOpen, setIsOpen] = useState(true);
  const [month, setMonth] = useState(false);
  const [open, setOpen] = useState(true);
  const [Dopen, setDopen] = useState(true);
  const [selectedRange, setSelectedRange] = useState([]);
  const [editGeust, setEditGeust] = useState([]);
  const { User } = useContext(Usercontext);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),  
      key: 'selection'
    }
  ])
  const navigate = useNavigate();

  const maxgeustes = localStorage.getItem("maxgeustes");
  const storedGuest = localStorage.getItem("guest");
  const geustes = JSON.parse(storedGuest);

  const storedCheckInDate = localStorage.getItem("checkInDate");
  const Checkin = new Date(storedCheckInDate);
  const fromday = Checkin.getDate();
  const frommonth = Checkin.getMonth();

  const storedCheckOutDate = localStorage.getItem("checkOutDate");
  const Checkout = new Date(storedCheckOutDate);
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
  };

  function Savedate() {
 

    // Save ISO 8601 formatted dates to localStorage
    localStorage.setItem("checkInDate", range[0].startDate);
    localStorage.setItem("checkOutDate", range[0].endDate);

    setDopen(!Dopen);
  }

  function incrementGuests(e, title) {
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

    console.log("from  " + frommonth);
    console.log("to  " + tomonth);
    console.log("aaaa " + frommonth !== tomonth);
  }, [Dopen]);

  function handelsetdata() {
    localStorage.setItem("guest", JSON.stringify(editGeust));
    setOpen(!open);
  }

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
    const storedGuest = localStorage.getItem("guest");

    const checkInDateStr = localStorage.getItem("checkInDate");
    const checkOutDateStr = localStorage.getItem("checkOutDate");

    if (checkInDateStr && checkOutDateStr) {
      // Convert date strings back to Date objects
      const checkInDate = new Date(checkInDateStr);
      const checkOutDate = new Date(checkOutDateStr);

      setRange([
        {
          startDate: checkInDate,
          endDate: checkOutDate,
          key: 'selection'
        }
      ]);
    }
    if (storedGuest) {
      setEditGeust(JSON.parse(storedGuest));
      // setGuest(JSON.parse(storedGuest));
    }
  }, [open, Dopen]);

  console.log("selecc  " + selectedRange);

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
    <div className="  md:pb-0 pb-20 md:bg-white bg-gray-100  relative text-gray-900  px-2 lg:px-20 flex   flex-col-reverse md:flex-row  h-full ">
      <div className="      pt-32 md:pt-40    w-full  md:w-[70%]  ">
        <h1 className=" w-full px-8  items-center  pb-0  md:pb-10 gap-2   hidden md:flex  right-0     flex-row    justify-start     md:relative         md:z-0  z-50        text-lg  md:text-3xl">
          <span className="  cursor-pointer" onClick={handleGoBack}>
            <KeyboardArrowLeftIcon className="       scale-150  " />
          </span>
          Request to book
        </h1>

        <Topbar title={"Request to book"} />

        <div className="    pt-2 md:pt-4  px-0 md:px-10 flex-col flex    w-full">
          <div
            className={` overflow-y-hidden    flex-grow   overflow-x-hidden o relative ${
              isOpen ? " h-[14rem] " : "h-12"
            }  bg-white rounded-lg border-[1px] border-solid transition-all w-full`}
          >
            <h1
              className={` text-lg absolute top-2 left-2 flex flex-row justify-between px-2 font-medium   w-full  `}
            >
              your trip
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
              }  absolute top-14 left-5  w-full flex  flex-col gap-4    pr-4  `}
            >
              <div className=" flex items-center flex-row w-full justify-between  ">
                <div className=" flex flex-col  gap-1 w-full">
                  <h1 className="  font-normal">Dates</h1>
                  <span className=" text-sm font-light">
                    {fromday} {month ? shortMonthNames[frommonth] : ""}
                    <RemoveIcon fontSize="small" />
                    {today} {shortMonthNames[tomonth]}
                  </span>
                </div>

                <button
                  onClick={() => setDopen(!Dopen)}
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

              <div className=" flex items-center flex-row w-full justify-between  ">
                <div className=" flex flex-col  gap-1 w-full">
                  <h1 className=" font-normal">Guests</h1>
                  <span className=" text-base font-light">
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
          {!User ? (
            <div className=" w-full h-full  py-6   flex flex-col    items-center justify-center gap-1    text-gray-800       ">
              <div className=" w-[99%] h-full bg-white rounded-md  border-solid  md:border-[0px]  border-[1px] py-6  md:px-0   px-4">
                <h1 className="  text-4xl md:text-5xl font-medium">Reserve</h1>
                <p className="  text-xl md:text-2xl pt-5">
                  Log in to Reserve This Place
                </p>
                <p className=" text-gray-500 pt-2 pb-3  text-xs md:text-sm">
                  You can Reserve This Place once you’ve logged in.
                </p>
                <Link className=" pt-5" to={"/login"}>
                  <button className=" px-6 p-3 bg-main rounded-lg text-white  font-medium">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <FormPay />
          )}
        </div>
      </div>

      <BookingDetails range={range} />

      <EditDate
        setDopen={setDopen}
        setRange={setRange}
        range={range}
        Dopen={Dopen}
        handelCancel={handelCancel}
        Savedate={Savedate}
        handleDateChange={handleDateChange}
      />
      <EditGeusts
        open={open}
        setOpen={setOpen}
        handelsetdata={handelsetdata}
        handelCancel={handelCancel}
        Gdata={Gdata}
        maxgeustes={maxgeustes}
        incrementGuests={incrementGuests}
        dicrementGuests={dicrementGuests}
      />
    </div>
  );
}

export default Booking;
