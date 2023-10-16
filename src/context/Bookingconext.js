import axios from "axios";
import { addDays } from 'date-fns'
import { createContext, useEffect, useState } from "react";
import { differenceInDays, format } from "date-fns";

export const BookingContext = createContext();

const Bookingprovider = ({ children }) => {
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [data, setData] = useState({});
  const [days, setDays] = useState();
  const [err , setErr] = useState('')
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),  
      key: 'selection'
    }
  ])
 


  const [Guest, setGuest] = useState({
    Adults: 1,
    Children: 0,
    Infants: 0,
    Pets: 0,
  });

const getdays = localStorage.getItem('daysStayed')
  useEffect(()=>{
setDays(getdays)

  },[])
  const daysStayed = differenceInDays(range[0]?.endDate  ,  range[0]?.startDate);

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

 

  function dicrementGuests(e, title) {
    e.preventDefault();

    setGuest((prevGuest) => ({
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

  function incrementGuests(e, title) {
    //  Guest.Children + Guest.Adults   <  data.maxGuests

    setGuest((prevGuest) => {
      const totalGuests = prevGuest.Adults + prevGuest.Children;
      const maxGuests = data.maxGuests;

      if (
        totalGuests < maxGuests ||
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
    <BookingContext.Provider
      value={{
        setData,
        setErr,
       
        err,
        data,
        range,
        setRange,
         
        dicrementGuests,
        incrementGuests,
        Gdata,
        daysStayed,
        setDays,
        days,
        Guest,
        setGuest,
        checkOutDate,
        checkInDate,
        setCheckInDate,
        setCheckOutDate,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
export default Bookingprovider;
