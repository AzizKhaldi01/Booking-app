import React from "react";

import { useEffect, useState } from "react";

import axios from "axios";
 
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
    </div>
  );
}

export default Home;
