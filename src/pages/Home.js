import React from "react";

import { useEffect, useState } from "react";

import axios from "axios";
<<<<<<< HEAD

import "react-loading-skeleton/dist/skeleton.css";
import Carteskelaton from "../component/Carteskelaton";
import Places from  '../component/Places';

import Filter from "../component/Filter";

function Home() {
  const [filtr, setFilter] = useState(true);
  const [places, setPlaces] = useState([]);
  const [isloading, setIslowding] = useState(false);

function exitFilter(){
  setFilter(false)
}

  useEffect(() => {
    axios.get("/places-all").then((response) => {
      setPlaces([...response.data]);
      setIslowding(!isloading);
    });
  }, []);

 
  return (
    <div className=" h-full w-full    flex flex-col  ">
      <div
        className={`  px-3  md:px-14 justify-between  h-[70px]   w-full     bg-white duration-150  mt-24 sticky   top-20     ease-out   flex items-center        mt-23       z-20     `}
      >
        <div className=" w-full   h-full  "></div>
        <div
          className="    py-3  px-3 md:px-5 cursor-pointer   border-solid border-[1px] text-gray-900 rounded-2xl flex flex-row gap-2 items-center text-sm"
          onClick={() => setFilter(!filtr)}
        >
           <span className=" hidden md:flex">
            Filter
           </span>
           
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

      <Filter
        filtr={filtr}
        exitFilter={exitFilter}
        
        setPlaces={setPlaces}
      />

      <div className="  px-3 md:px-11  w-full h-full duration-150    gap-1 md:gap-5   mt-10 grid   grid-cols-1 md:grid-cols-3  lg:grid-cols-4     ">
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
=======
 
import "react-loading-skeleton/dist/skeleton.css";
import Carteskelaton from "../component/Carteskelaton";
import Places from "../component/Places";

function Home() {
 
  const [places, setPlaces] = useState([]);
  const [isloading , setIslowding] = useState(false)
  useEffect(() => {
    axios.get("/places-all").then((response) => {
      setPlaces([...response.data, ...response.data, ...response.data , ...response.data]);
      setIslowding( !isloading)
    });
    
  }, []);

 
  
  return (
    < div
 
    
    className="  w-full h-full   gap-1 md:gap-5 mt-44 grid   grid-cols-2 md:grid-cols-3  lg:grid-cols-4  px-0 lg:px-10  ">
       { !isloading && <Carteskelaton cards={8}/>  }
       {places.map((place , index) => (
       <Places      _id={place._id} title={place.title} address={place.address}  photos={place.photos}  price={place.price}/>
      ))} 
>>>>>>> origin/main
    </div>
  );
}

export default Home;
