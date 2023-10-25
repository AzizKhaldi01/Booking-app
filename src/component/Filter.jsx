import React, { useEffect } from "react";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import Amenities from "../component/Amenities";
import Propertytype from "../component/Propertytype";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState, useContext } from "react";
import queryString from "query-string";
import GrayLine from "./GrayLine";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BungalowOutlinedIcon from "@mui/icons-material/BungalowOutlined";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/pagecontext";
function Filter({ filtr, setPlaces, exitFilter, setIslowding, type }) {
 
  const [category, setCategory] = useState([]);
  const [perks, setPerks] = useState([]);
  const [priceRange, setPriceRange] = useState([40, 1000]);
  const { setFilterCheck, FilterCheck } = useContext(Usercontext);
 
  const [roomsAndBeds, setRoomsAndBeds] = useState(
    [
      { label: "Bedrooms", range:  "Any"  },
      { label: "Bathrooms", range:  "Any"  },
      { label: "Beds", range:  "Any"  },
    ]
  );
 
const numbers = ['Any' , 1,2,3,4,5,6,7,8  ]

  const navigate = useNavigate();

    
 

  useEffect(() => {
    async function fetchData() {
      const queryParams = new URLSearchParams(window.location.search);
      const perksParam = queryParams?.get("perks");
      const categoryParam = queryParams?.get("category");
      const priceRangeParam = queryParams?.get("priceRange");
      const typeParam = queryParams?.get("type");
    const roomsAndBedsParam = queryParams?.get("roomsAndBeds");

      const  jsonroomsAndBedsParam = JSON.parse(roomsAndBedsParam)
      
  
      const parsedPriceRange = priceRangeParam
        ? priceRangeParam.split(",")?.map((str) => parseInt(str, 10))
        : null;

      console.log("Parsed Price Range:", parsedPriceRange);

      if (parsedPriceRange || categoryParam || perksParam   || roomsAndBedsParam  ) {
        setPriceRange(parsedPriceRange);
        const categoryParamNew = categoryParam ? categoryParam.split(",")  : null;
        setCategory(categoryParamNew);
        const perksParamNew = perksParam ? perksParam.split(",") : null;
        setPerks(perksParamNew);
setRoomsAndBeds(jsonroomsAndBedsParam)
        try {
          const response = await axios.get("/filter", {
            params: {
              Bathrooms: parseInt(jsonroomsAndBedsParam[0].range, 10) ,
              Bedrooms:parseInt( jsonroomsAndBedsParam[1].range, 10),
              Beds:parseInt(jsonroomsAndBedsParam[2].range, 10) ,
              type: typeParam,
              minPrice: parsedPriceRange ? parsedPriceRange[0] : null,
              maxPrice: parsedPriceRange ? parsedPriceRange[1] : null,
              category: categoryParamNew,
              perks: perksParamNew,
            },
          });
          setPlaces(response.data.data);
          setIslowding(true);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }

    fetchData();
  }, []);

  useEffect(() => {}, [priceRange, category, perks]);

  function addtoFilter(e) {
    const { name, checked } = e.target;

    if (checked) {
      setPerks([...perks, name]);
    } else {
      setPerks([...perks.filter((selectedName) => selectedName !== name)]);
    }
  }

  function ClearFilter() {
    setCategory([]);
    setPerks([]);
  }

  const handleNumberClick = (number, label) => {
    setRoomsAndBeds((prev) => {
      return prev.map((item) => {
        if (item.label === label) {
          return { ...item, range: number };
        }
        return item;
      });
    });
  };


console.log('roooooom  ' + roomsAndBeds[0].range  )

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const perksParam = queryParams?.get("perks");
    const roomsAndBedsParam = queryParams?.get("roomsAndBeds");
   
    

    const categoryParam = queryParams?.get("category");
    const priceRangeParam = queryParams?.get("priceRange");
    if (priceRangeParam || categoryParam || perksParam || roomsAndBedsParam ) {
      setFilterCheck(false);
      localStorage.setItem("FilterCheck", FilterCheck);
    } else {
      setFilterCheck(true);
      localStorage.setItem("FilterCheck", FilterCheck);
    }
  }, [FilterCheck, window.location.search]);

  console.log("filteer " + FilterCheck);

  function handelfilter(e) {
    e?.preventDefault();
    setPlaces([]);
    setIslowding(false);
    perks?.filter((perk) => perk !== "");
    perks?.filter((perk) => perk !== "null");

    category?.filter((caty) => caty !== "");

    const queryParams = new URLSearchParams(window.location.search);
  const  JsonroomsAndBeds = JSON.stringify(roomsAndBeds)
    queryParams.set("category", category);
    queryParams.set("priceRange", priceRange);
    queryParams.set("roomsAndBeds", JsonroomsAndBeds);
    if (perks) {
      queryParams.set("perks", perks);
    }

    const newparams = queryParams.toString();

    navigate(`/?${newparams}`);

    axios
      .get("/filter", {
        params: {
          Bathrooms: roomsAndBeds[0].range,
          Bedrooms: roomsAndBeds[1].range,
          Beds: roomsAndBeds[2].range,
          type,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          category,
          perks,
        },
      })
      .then((response) => {
        setPlaces(response.data.data);
        setIslowding(true);
      });
    exitFilter();
  }

  useEffect(() => {
    if (!type) {
      return;
    }
    handelfilter();
  }, [type]);

  const handlePriceChange = (e, newValue) => {
    setPriceRange(newValue);
  };

  const breakpoints = {
     
    320: {
      slidesPerView: 5,
    },
     
    480: {
      slidesPerView: 6,
    },
    
    768: {
      slidesPerView: 9,
    },
    
  };

  useEffect(() => {
    if (priceRange[0] < 40) {
      // Create a new array with the updated value for priceRange[0]
      const newPriceRange = [...priceRange];
      newPriceRange[0] = 40;
      // Update the state with the new array
      setPriceRange(newPriceRange);
    } else if (priceRange[1] > 2000) {
      // Create a new array with the updated value for priceRange[1]
      const newPriceRange = [...priceRange];
      newPriceRange[1] = 2000;
      // Update the state with the new array
      setPriceRange(newPriceRange);
    }
  }, [priceRange]);

  const Propertytypes = [
    {
      icon: <BungalowOutlinedIcon />,
      title: "Bungalow",
    },
    {
      icon: <ApartmentIcon />,
      title: "ApartmentIcon",
    },
    {
      icon: <HomeOutlinedIcon />,
      title: "House",
    },

    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M0 32C0 14.3 14.3 0 32 0H480c17.7 0 32 14.3 32 32s-14.3 32-32 32V448c17.7 0 32 14.3 32 32s-14.3 32-32 32H304V464c0-26.5-21.5-48-48-48s-48 21.5-48 48v48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64C14.3 64 0 49.7 0 32zm96 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16zM240 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H240zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16zM112 192c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H112zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H368zM328 384c13.3 0 24.3-10.9 21-23.8c-10.6-41.5-48.2-72.2-93-72.2s-82.5 30.7-93 72.2c-3.3 12.8 7.8 23.8 21 23.8H328z" />
        </svg>
      ),
      title: "Hotel",
    },
  ];

  const handleItemClick = (item) => {
    if (!category?.includes(item.title)) {
      setCategory([...category, item.title]);
      console.log(category);
    } else {
      setCategory(category.filter((selectd) => selectd !== item.title));
    }
  };

  const perksfilter = [
    "Radio",
    "Pets",
    "entrance",
    "tv",
    "parking",
    "wifi",
    "Kitchen",
    "Washing machine",
    "Gym",
    "Pool",
  ];



  return (
    <div
      className={` duration-300 text-gray-800  ${
        !filtr ? "top-[50%]" : " top-[-100%] "
      }  flex  z-[120] fixed h-full w-full relateve `}
    >
      <div
        onClick={exitFilter}
        className={`  flex  fixed h-full w-full absulet ${
          !filtr ? " opacity-50 top-0  " : "opacity-0  top-[-100%]   "
        }  right-0 bg-black `}
      ></div>

      <div
        className={` ${
          filtr
            ? "  md:top-[-100%] bottom-[-100%] "
            : "  bottom-0 md:top-[50%] "
        }   duration-300     transform pt-2  pb-3   md:translate-x-[-50%] md:translate-y-[-50%]  h-[95%]  md:h-[90%]  left-0   md:left-[50%] flex fixed lg:w-[66%]  xl:w-[60%]   w-full  md:w-[90%]     flex-col item-center  justify-center md:rounded-b-xl   rounded-b-none   bg-white rounded-xl `}
      >
        <div className=" absolute top-0 w-full   z-20 border-solid border-b-[1px] flex items-center h-16 rounded-t-xl justify-center right-0 bg-white  text-4xl  ">
          <span
            onClick={exitFilter}
            className=" absolute top-2 left-4 cursor-pointer"
          >
            {" "}
            <CloseIcon />{" "}
          </span>
          <h className=" text-xl">Filter</h>
        </div>

        <div className="  border-solid border-t-[1px]  md:rounded-b-xl   items-center h-20 w-full flex flex-row justify-between px-3  md:px-7 absolute bottom-0  z-10  bg-white   right-0">
          <button
            onClick={ClearFilter}
            className=" border-[1px] border-solid  px-8 rounded-lg p-3"
          >
            Clear
          </button>
          <button
            className="  relative text-white bg-[#578280]  px-8 rounded-lg p-3"
            onClick={handelfilter}
          >
            Show
          </button>
        </div>

        <div className="overflow-auto px-3  md:px-7 flex-grow h-full w-full flex-col flex gap-3 pt-20  ">
          <div className="  w-full  gap-8 flex flex-col   ">
            <h className="  text-2xl  ">Price range</h>

            <div className=" w-full items-center    gap-4 flex flex-col ">
              <div className=" w-[80%] ">
                <Slider
                  style={{ color: "black" }} // Change this color to your desired color
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={2000}
                  aria-labelledby="price-range-slider"
                />
              </div>

              <div className=" flex  items-center    w-[80%]  gap-3  justify-between ">
                <label className=" w-full  relative ">
                  <AttachMoneyIcon className=" scale-95 absolute top-4 left-0" />
                  <input
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      setPriceRange([newValue, priceRange[1]]);
                    }}
                    value={priceRange[0]}
                    className=" border-[1px] px-5   text-[18px] border-gray-300  border-solid rounded-lg   h-[3.6rem] w-full  "
                    type="number"
                  />
                </label>

                <label className=" w-full  relative ">
                  <AttachMoneyIcon className=" scale-95 absolute top-4 left-0" />
                  <input
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      setPriceRange([priceRange[0], newValue]);
                    }}
                    value={priceRange[1]}
                    className=" border-[1px]   text-[18px] border-gray-300  border-solid rounded-lg px-5 h-[3.6rem] w-full   "
                    type="number"
                  />
                </label>
              </div>
              <span className="   py-5 w-full">
                <GrayLine />
              </span>
            </div>
          </div>

          <div className=" w-full flex flex-col gap-5  ">
            <h1 className=" text-2xl">Rooms and beds</h1>
            {roomsAndBeds.map((i) => (
              <div className=" flex flex-col w-full  gap-2">
                <h1 className=" px-1">{i.label} </h1>
                <Swiper breakpoints={breakpoints} slidesPerView={8}>
                  {numbers.map((item) => (
                    <SwiperSlide key={item.indexOf}>
                     <span onClick={ ()=> handleNumberClick(item ,i.label )} className= {` ${i.range ==  item   ?  ' bg-gray-800 text-white ' : ' bg-white  text-black  '  } hover:border-gray-500 cursor-pointer  h-10   w-16 flex justify-center items-center rounded-full border-solid border-[1px] border-gray-300`}  >
                        {item == 8 ? "+ 8" : item}
                      </span>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className=" w-full flex flex-row   overflow-auto  scroll-m-0   gap-5 "></div>
              </div>
            ))}
          </div>
          <span className="   py-5 w-full">
            <GrayLine />
          </span>
          <div className=" gap-8    flex w-full flex-col ">
            <h className=" text-2xl">Property type</h>
            <div className="     gap-6 items-center   grid grid-cols-2  md:grid-cols-4">
              {Propertytypes.map((item) => (
                <Propertytype
                  onClick={() => handleItemClick(item)}
                  isSelected={category?.includes(item.title)}
                  key={item.index}
                  icon={item.icon}
                  title={item.title}
                />
              ))}
            </div>
          </div>
          <span className="  py-5 w-full">
            <GrayLine />
          </span>

          <div className=" w-full    pb-20   flex flex-col gap-9">
            <h1 className="   text-2xl font-medium">Amenities</h1>

            <div style={{}} className="  grid-cols-2   grid     w-full  ">
              {perksfilter.map((item) => (
                <Amenities
                  name={item}
                  value={item}
                  key={item.index}
                  addtoFilter={addtoFilter}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
