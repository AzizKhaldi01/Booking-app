import React from "react";

import { useEffect, useState } from "react";

import Slider from "@mui/material/Slider";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import "react-loading-skeleton/dist/skeleton.css";
import Carteskelaton from "../component/Carteskelaton";
import Places from "../component/Places";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Propertytype from "../component/Propertytype";
import LocationCityIcon from "@mui/icons-material/LocationCity";

function Home() {
  const [filtr, setFilter] = useState(true);
  const [places, setPlaces] = useState([]);
  const [isloading, setIslowding] = useState(false);
  const [priceRange, setPriceRange] = useState([40, 1000]);
  const [category, setCategory] = useState([]);
 

  useEffect(() => {
    axios.get("/places-all").then((response) => {
      setPlaces([...response.data]);
      setIslowding(!isloading);
    });
  }, []);

  function handelfilter(e) {
    e.preventDefault();
    axios.get("/filter", {
      params: {
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        category,
      },
    }).then((response)=> {
       
      setPlaces(response.data.data);
    } )
  } 


  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    console.log(priceRange);
  };

  const Propertytypes = [
    {
      icon: <ApartmentIcon />,
      title: "a",
    },
    {
      icon: <LocationCityIcon />,
      title: "ApartmentIcon",
    },
    {
      icon: (
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
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
      title: "Beach",
    },

    {
      icon: <LocationCityIcon />,
      title: "Hotel",
    },
  ];

  useEffect(() => {
    console.log(category);
  }, [category]);

  const handleItemClick = (item) => {
    if (!category.includes(item.title)) {
      setCategory([...category, item.title]);
      console.log(category);
    } else {
      setCategory(category.filter((selectd) => selectd !== item.title));
    }
  };

  return (
    <div className=" h-full w-full    flex flex-col  ">
      <div
        className={`  px-14 justify-between  h-[70px]   w-full     bg-white duration-150  mt-24 sticky   top-20     ease-out   flex items-center        mt-23       z-20     `}
      >
        <div className=" w-full   h-full  "></div>
        <div
          className="  py-3 px-5 cursor-pointer   border-solid border-[1px] text-gray-900 rounded-2xl flex flex-row gap-2 items-center text-sm"
          onClick={() => setFilter(!filtr)}
        >
          {" "}
          Filter{" "}
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
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
        </div>
      </div>

      <div
        className={`   duration-300  ${
          filtr ? "top-0  z-50  " : "top-[-100%]  -z-10  "
        }  text-gray-800 duration-300    flex   fixed h-full w-full relateve `}
      >
        <div
          onClick={() => setFilter(!filtr)}
          className={` flex  fixed h-full w-full  duration-300   ${
            filtr ? " opacity-50   " : "opacity-0      "
          }  right-0 bg-black`}
        ></div>

        <div
          className={`  ${
            filtr
              ? " opacity-100  z-50  top-0"
              : " top-[100%]   -z-10 opacity-0 "
          }  py-4   duration-300   flex-grow   text-[12px] h-[90vh]       w-[90%] lg:w-[60%] bg-white rounded-lg fixed   top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}
        >
          <div className=" flex text-lg flex-row   items-center justify-center  bg-white h-20 w-full absolute top-0 rounded-t-xl ">
            <span
              onClick={() => setFilter(!filtr)}
              className="  cursor-pointer top-1 left-1 absolute"
            >
              <CloseIcon />
            </span>
            Filters
          </div>
          <div className="bg-whte h-20 w-full absolute  bottom-0  px-8 flex flex-row justify-between ">
            <button className=" my-3 px-6 py-2 rounded-xl bg-slate-200 ">
              Clear
            </button>
            <button
              onClick={handelfilter}
              className=" my-3 px-6 py-2 rounded-xl  border-solid border-[1px] "
            >
              Show
            </button>
          </div>

          <div className=" items-center gap-14 overflow-auto p-2 py-20 flex flex-col  w-full ">
            <div className=" w-[60%] flex flex-col   ">
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={2000}
                aria-labelledby="price-range-slider"
              />
              <div className=" flex justify-around">
                <input
                  value={priceRange[0]}
                  className=" rounded-lg px-2 h-10 w-[30%] bg-slate-100 "
                  type="number"
                />
                <input
                  value={priceRange[1]}
                  className=" rounded-lg px-2 h-10 w-[30%] bg-slate-100 "
                  type="number"
                />
              </div>
            </div>

            <div className="  flex w-full flex-col ">
              <h>Property type</h>
              <div className=" mx-5   gap-6 items-center   grid grid-cols-2  md:grid-cols-4">
                {Propertytypes.map((item) => (
                  <Propertytype
                    onClick={() => handleItemClick(item)}
                    isSelected={category.includes(item.title)}
                    key={item.index}
                    icon={item.icon}
                    title={item.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="  px-3 md:px-11  w-full h-full duration-150    gap-1 md:gap-5   mt-10 grid   grid-cols-2 md:grid-cols-3  lg:grid-cols-4     ">
        {!isloading && <Carteskelaton cards={8} />}
        {places.map((place, index) => (
          <Places
            _id={place._id}
            title={place.title}
            address={place.address}
            photos={place.photos}
            price={place.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
