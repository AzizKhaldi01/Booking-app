import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import Carteskelaton from "../component/Skelatons/Carteskelaton";
import Places from "../component/Places";
import { useLocation, useNavigate } from "react-router-dom";
import Filter from "../component/Filter";
import FilterNav from "../component/FilterNav";
import { filterdata } from "../component/Filterdata";
import { Usercontext } from "../context/pagecontext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import "../../src/index.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Home() {
  const [filtr, setFilter] = useState(false);
  const [places, setPlaces] = useState([]);
  const [isloading, setIslowding] = useState(false);
  const [fav, setFav] = useState(null);
  const [UrlFilter, setUrlFilter] = useState("");
  const [scrolling, setScrolling] = useState(false);
 

  function exitFilter() {
    setFilter(false);
  }

  useEffect(() => {
    axios.get("/get-favorite-placeID").then((response) => {
      const { data } = response;
      const placId = data.map((item) => item?.Place);
      localStorage.setItem("favPlaces", JSON.stringify(placId));
    });
  }, [fav]);




const filtercheck = localStorage.getItem('FilterCheck') 

console.log( typeof  filtercheck )
  useEffect(() => {


    if ( filtercheck == 'false') {
      axios.get("/all-places", { params: { filtercheck } }).then((response) => {
        setPlaces(response.data);
        setIslowding(true);
      });
    }
  }, []);

 

  useEffect(() => {
    // Add event listener to track scroll position
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    // Check the scroll position and update the state
    if (window.scrollY > 100) {
      // You can adjust this threshold as needed
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  const breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 4,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 5,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 10,
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 10,
    },
    1700: {
      slidesPerView: 12,
    },
  };

  return (
    <div className=" h-full w-full    flex flex-col  ">
      <div
        className={`  px-3  md:px-14 justify-center   h-[90px] md:h-[112px]   w-full    gap-5  bg-white    mt-0 md:mt-16 pt-5 md:pt-12   ${
          scrolling ? "shadow-md" : ""
        }    sticky   top-0  md:top-12    ease-out   flex items-start z-20     `}
      >
        <Swiper
          breakpoints={breakpoints}
          centeredSlides={false}
          spaceBetween={10}
          grabCursor={true}
          className="mySwiper  items-center justify-center   flex h-full "
        >
          {filterdata.map((item) => (
            <SwiperSlide>
              <FilterNav text={item.text} img={item.img} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className="      py-3  px-3 md:px-5 cursor-pointer   border-solid border-[1px] text-gray-900 rounded-2xl flex flex-row gap-2 items-center text-sm"
          onClick={() => setFilter(!filtr)}
        >
          <span className=" hidden md:flex">Filter</span>

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

      <Filter filtr={filtr} exitFilter={exitFilter} setPlaces={setPlaces} setIslowding={setIslowding} isloading={isloading} />

      <div className="  px-3 md:px-11  w-full h-full duration-150    gap-1 md:gap-5   mt-10 grid   grid-cols-1 md:grid-cols-3    sm:grid-cols-2  lg:grid-cols-4     ">
        {!isloading && <Carteskelaton cards={8} />}
        {places?.map((place, index) => (
          <Places
            fav={fav}
            setFav={setFav}
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
