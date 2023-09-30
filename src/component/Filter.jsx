import React, { useEffect } from "react";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import Amenities from "../component/Amenities";
import Propertytype from "../component/Propertytype";
import { useState } from "react";
import queryString from "query-string";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BungalowOutlinedIcon from "@mui/icons-material/BungalowOutlined";
import { useLocation } from "react-router-dom";
import axios from "axios";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router-dom";

function Filter({ filtr, setFiltr, setPlaces, exitFilter }) {
  const location = useLocation();
  const [category, setCategory] = useState([]);
  const [perks, setPerks] = useState([]);

  const [priceRange, setPriceRange] = useState([40, 1000]);

  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const perksParam = queryParams.get("perks");
    const categoryParam = queryParams.get("category");
    const priceRangeParam = queryParams.get("priceRange");
    const parsedPriceRange = priceRangeParam
      ? priceRangeParam.split(",").map((str) => parseInt(str, 10))
      : null;

    console.log("Parsed Price Range:", parsedPriceRange); // Add this for debugging

    if (parsedPriceRange || categoryParam || perksParam) {
      setPriceRange(parsedPriceRange);
      const categoryParamnew = categoryParam.split(",");
      setCategory(categoryParamnew);
      const perksParamnew = perksParam.split(",");

      setPerks(perksParamnew);
    }
  }, []);

  console.log(" perks " + perks);

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
  }

  function handelfilter(e) {
    e.preventDefault();

    const queryParams = new URLSearchParams();

    queryParams.set("priceRange", priceRange);
    queryParams.set("perks", perks);
    queryParams.set("category", category);

    const newparams = queryParams.toString();

    navigate(`/?${newparams}`);

    axios
      .get("/filter", {
        params: {
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          category,
          perks,
        },
      })
      .then((response) => {
        setPlaces(response.data.data);
      });
    exitFilter();
  }

  const handlePriceChange = (e, newValue) => {
    setPriceRange((prevFilterCriteria) => ({
      ...prevFilterCriteria,
      priceRange: newValue,
    }));
  };

  
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
    if (!category.includes(item.title)) {
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
      className={` duration-300 ${
        filtr ? "  z-50 " : "  -z-10 "
      }  text-gray-800 duration-300    flex   fixed h-full w-full relateve `}
    >
      <div
        onClick={exitFilter}
        className={` flex  fixed h-full w-full  duration-300   ${
          filtr ? " opacity-50   " : "opacity-0  "
        }  right-0 bg-black`}
      ></div>

      <div
        className={`  ${
          filtr
            ? " opacity-100  z-50  top-[100%] "
            : " top-[-100%]   -z-10 opacity-0 "
        }     duration-300   flex-grow   text-[12px] h-[90vh]           w-[100%] lg:w-[60%] bg-white rounded-lg fixed   top-[55%]  md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}
      >
        <div className=" flex text-lg flex-row border-b-[1px]  border-solid items-center justify-center  z-10 bg-white h-16 w-full absolute top-0 rounded-t-xl ">
          <span
            onClick={exitFilter}
            className="  cursor-pointer top-1 left-1 absolute"
          >
            <CloseIcon />
          </span>
          Filters
        </div>
        <div className="bg-whte h-20 w-full absolute border-t-[1px]  border-solid  bg-white z-10 bottom-0  px-8 flex flex-row justify-between ">
          <button
            onClick={ClearFilter}
            className=" my-3 px-6 py-2 rounded-xl bg-slate-200 "
          >
            Clear
          </button>
          <button
            onClick={handelfilter}
            className=" my-3 px-6 py-2 rounded-xl  border-solid border-[1px] "
          >
            Show
          </button>
        </div>

        <div className="overflow-auto   flex-grow h-full w-full">
          <div className=" items-center gap-14 overflow-auto  flex-grow     p-2 py-28 flex flex-col  w-full ">
            <div className="  w-full  gap-8 flex flex-col   ">
              <h className=" px-7 text-left text-2xl  font-medium  ">
                Price range
              </h>

              <div className=" w-full items-center    flex flex-col ">
                <div className=" w-[60%] ">
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

                <div className=" flex   w-[60%]  gap-3  justify-between ">
                  <input
                    onChange={(e) => {
                      const newMaxValue = parseInt(e.target.value);
                      setPriceRange((prevFilterCriteria) => [
                        prevFilterCriteria.priceRange[0], // Keep the min value unchanged
                        newMaxValue, // Update the max value
                      ]);
                    }}
                    value={priceRange[0]}
                    className=" border-[1px]   text-[16px] border-gray-300  border-solid rounded-lg px-2 h-12 w-[50%]  "
                    type="number"
                  />
                  <input
                    onChange={(e) => {
                      const newMaxValue = parseInt(e.target.value);
                      setPriceRange((prevFilterCriteria) => [
                        prevFilterCriteria.priceRange[0], // Keep the min value unchanged
                        newMaxValue, // Update the max value
                      ]);
                    }}
                    value={priceRange[1]} // Bind to the max value
                    className="border-[1px] text-[16px] border-gray-300 border-solid rounded-lg px-2 h-12 w-[50%]"
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className=" gap-8  px-7 flex w-full flex-col ">
              <h className=" text-2xl">Property type</h>
              <div className="     gap-6 items-center   grid grid-cols-2  md:grid-cols-4">
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

          <div className=" w-full    pb-20   flex flex-col gap-9">
            <h1 className=" px-7 text-2xl font-medium">Amenities</h1>

            <div style={{}} className="  grid-cols-2   grid   px-7 w-full  ">
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
