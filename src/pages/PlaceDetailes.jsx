import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExtraInfo from "../component/ExtraInfo";
import userimage from "../img/user.webp";

import CloseIcon from "@mui/icons-material/Close";
import PerksD from "../component/PerksD";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import PhotoSlider from "../component/Imageslaider";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import PlaceIcon from "@mui/icons-material/Place";
import Gestes from "../component/Gestes";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link, scroller } from "react-scroll";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BookingContext } from "../context/Bookingconext";
import Datepick from "../component/Datepick";
import PlaceDescription from "../component/PlaceDescription";
import GrayLine from "../component/GrayLine";
import { Usercontext } from "../context/pagecontext";
import Massege from "../component/Massege";
import PlaceDtlsSkelaton from "../component/Skelatons/PlaceDtlsSkelaton";
function PlaceDetailes() {
  const { User } = useContext(Usercontext);

  const [morephotos, setMorephotos] = useState(false);
  const [extra, setExtra] = useState(false);
  // Initialize data as an empty object
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [Aopen, setAopen] = useState(false);
  const [msg, setMsg] = useState("");

  const [fav, setFav] = useState(true);

  const [laod, setLaod] = useState(false);
  const [Favadded, setFavadded] = useState("");

  const [Gopen, setGopen] = useState(false);

  const [scrolling, setScrolling] = useState(false);

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
    if (window.scrollY > 600) {
      // You can adjust this threshold as needed
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  const {
    setData,
    data,

    range,
    setRange,
    dicrementGuests,
    incrementGuests,
    Gdata,
    daysStayed,
    Guest,
    setGuest,
 

     
  } = useContext(BookingContext);

  const Pdata = data;

  const { _id } = useParams();

  const navigate = useNavigate();

  const handleNext = () => {
    setLaod(true);
    axios.get("/booking-check/" + _id).then((response) => {
      const { data } = response;
      console.log("data " + data);

      if (data == "booked") {
        setMsg("booked");
        setLaod(false);
      } else {
        setMsg("notbooked");
        setLaod(false);
        localStorage.setItem("guest", JSON.stringify(Guest));
        localStorage.setItem("checkInDate", range[0].startDate.toISOString());
        localStorage.setItem("checkOutDate", range[0].endDate.toISOString());
        localStorage.setItem("daysStayed", daysStayed.toString());
        localStorage.setItem("price", Pdata.price.toString());
        localStorage.setItem("maxgeustes", Pdata.maxGuests);
        localStorage.setItem("imageUrl", Pdata.photos[0]);
        localStorage.setItem("title", Pdata.title);
        localStorage.setItem("address", Pdata.address);

        localStorage.setItem("id", _id);

        navigate("/guest-step");
      }
    });
  };

  function handelGoback() {
    navigate(-1);
    console.log("goooo backkk");
  }

  function AddFavorite(e) {
    e.preventDefault();
    if (!User) {
      e.preventDefault();
      navigate("/login");
    }

    axios.post("/add-favorite", { placeID: _id }).then((response) => {
      if (response.data == "liked") {
        e.preventDefault();
        setFav(true);
        setFavadded("added");
      } else {
        e.preventDefault();
        setFav(false);
        setFavadded("removed");
      }
    });
  }

  useEffect(() => {
    axios.get("/get-favorite").then((response) => {
      const { data } = response;
      const favoriteItemIds = data?.map((item) => item?.Place?._id);
      localStorage.setItem("fav", JSON.stringify(favoriteItemIds));
    });
  }, [fav]);

 
  useEffect(() => {
    setGuest({
      Adults: 1,
      Children: 0,
      Infants: 0,
      Pets: 0,
    });
  }, []);

  useEffect(() => {
    axios.get("/place-details/" + _id).then((response) => {
      const { data } = response;
      setData(data);
      setIsLoading(false); // Once data is fetched, set isLoading to false
    });
  }, [_id]);

  useEffect(() => {
    const userLikedItems = JSON.parse(localStorage.getItem("fav"));
    console.log("aa11 " + userLikedItems);
    setFav(userLikedItems?.includes(_id));
  }, [User]);

  function hendelmorephotos() {
    setMorephotos(!morephotos);
    document.body.style.overflow = !morephotos ? " hidden" : "auto";
  }

  if (Pdata.length >= 0) {
    return <div className=" pt-20">this place dose'nt exict</div>;
  }

  const scrollToSection = () => {
    scroller.scrollTo("availability-section", {
      duration: 800, // Scroll duration in milliseconds
      smooth: true, // Enable smooth scrolling
    });
  };

  return (
    <>
      {isLoading ? (
        <PlaceDtlsSkelaton />
      ) : (
        <div className="  text-gray-950 overflow-hidden  md:pb-0 pb-20   px-3 lg:px-12 w-full h-full  gap-12   mt-0 md:mt-32 justify-between flex   flex-col-reverse md:flex-row">
          <div className=" Availability w-full md:w-[40%] flex flex-col     ">
            <div className="md:hidden  scale-110  pb-7 cursor-pointer block relative w-full  ">
              <div className=" flex flex-row justify-between items-center  mt-3 p-5 w-full absolute h-10 top-2   z-20">
                <span
                  onClick={handelGoback}
                  className=" h-8 w-8 bg-white bg-opacity-60 rounded-full flex z-40 items-center justify-center "
                >
                  <KeyboardArrowLeftIcon className="  scale-110" />{" "}
                </span>
                <span
                  onClick={AddFavorite}
                  className=" h-8 w-8 bg-white rounded-full flex items-center justify-center "
                >
                  {fav ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="red"
                      class="w-6 h-6"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  ) : (
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
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  )}
                </span>
              </div>
              <PhotoSlider
                onClick={hendelmorephotos}
                nonav={false}
                photos={data?.photos}
                hight={true}
              />
            </div>
            <div className=" flex w-full p-2 flex-col">
              <div className="  text-2xl md:text-3xl   font-medium md:font-bold w-full  md:max-w-[90%] ">
                {data?.title}
              </div>
              <p className="  md:text-base flex j items-start text-ms  py-2 md:py-4 text-gray-600">
                {" "}
                <PlaceIcon fontSize="small" /> {data?.address}
              </p>
              <span className=" w-full md:flex hidden">
                <GrayLine />
              </span>

              <div className=" w-full flex  flex-row-reverse  items-center justify-between">
                <div className="  hidden  md:flex flex-row gap-1 my-4 text-3xl   items-end  font-semibold">
                  ${data?.price}
                  <span className=" font-normal text-gray-700 text-base">
                    /night
                  </span>
                </div>
                <div className="  px-4  fixed   md:hidden flex  right-0  z-30 w-full bottom-0  bg-white h-20   justify-between p-3 items-center border-solid border-t-[1px] text-xs text-white  border-gray-300 ">
                  <span className="  font-medium   text-gray-700 text-xl    ">
                    ${data?.price}{" "}
                    <span className=" text-xs text-gray-500">night</span>
                  </span>
                  <button
                    onClick={() => setAopen(!Aopen)}
                    className=" bg-main p-2 text-xs  h-full rounded-md "
                  >
                    Check Availability
                  </button>
                </div>

                <Link
                  to="Availability"
                  smooth={true}
                  duration={800}
                  onClick={scrollToSection}
                  className={`    ${
                    scrolling ? " hidden  md:flex " : " hidden"
                  } bg-[#578280]  bottom-6 left-5 z-40  fixed cursor-pointer rounded-full flex items-center justify-center text-white      h-14 w-14  `}
                >
                  <CalendarMonthIcon />
                </Link>

                <div className="    flex-row     w-[68%]  text-sm items-center  md:relative   bottom-0 bg-white  right-0   flex ">
                  <div className="  w-full   h-20  hidden md:flex flex-row justify-between  items-center border-[#6d9c9a] border-[1px] border-solid rounded-full  my-0 md:my-6  ">
                    <p className=" font-semibold px-8">Check Availability</p>
                    <span
                      onClick={() => setAopen(!Aopen)}
                      className="bg-[#578280] cursor-pointer rounded-full flex items-center justify-center text-white      h-20 w-20  "
                    >
                      <CalendarMonthIcon />
                    </span>
                  </div>

                  <div
                    onClick={() => setAopen(!Aopen)}
                    className={`${
                      Aopen
                        ? "   md:opacity-0 opacity-30 z-0"
                        : "opacity-0 -z-10"
                    } duration-200 fixed w-full h-full  bg-black top-0 right-0`}
                  ></div>

                  <div
                    className={` z-40  fixed md:absolute w-full md:max-w-[450px]       md:pt-0 border-solid   justify-between  md:justify-start flex flex-col   border-0 md:border-[1px]  pt-14 shadow-2xl  duration-150 bg-white rounded-t-xl  md:rounded-xl   ${
                      Aopen
                        ? " bottom-0 md:h-[210px] opacity-100"
                        : " opacity-0 bottom-[-100%] md:h-0"
                    }   z-20 h-[530px] md:top-20   left-0 `}
                  >
                    <Datepick
                      daysStayed={daysStayed}
                      Aopen={Aopen}
                      range={range}
                      setRange={setRange}
                    />

                    <div className=" text-base items-center justify-between px-3  md:hidden flex w-full h-10 bg-white  rounded-t-lg absolute top-0 right-0">
                      <span onClick={() => setAopen(!Aopen)}>
                        <ClearIcon />
                      </span>
                    </div>
                    <div
                      className={` ${
                        !Aopen ? "hidden" : "flex"
                      }  flex  relative  max-w-full  flex-col  `}
                    >
                      <div className=" w-full  flex items-center justify-center overflow-hidden">
                        <div className="  w-[95%] h-[1px]  md:hidden flex  bg-gray-200 my-2 "></div>
                      </div>

                      <div className=" px-3 md:hidden  flex  py-2  pb-14    flex-col w-full h-full gap-2">
                        <span className="   text-2xl font-medium   flex flex-row  ">
                          Guests
                        </span>

                        <div className=" w-full  flex-col items-center flex       h-full gap-4  scale-120 px-2 my-6 justify-center ">
                          {Gdata?.map((item) => (
                            <Gestes
                              onClick={incrementGuests}
                              dicrementGuests={dicrementGuests}
                              Geust={item.value}
                              title={item.title}
                              name={item.title}
                              desc={item.desc}
                              maxGuests={data?.maxGuests}
                            />
                          ))}
                        </div>
                      </div>

                      <div className=" w-full  flex items-center justify-center">
                        <div className="  w-[95%] h-[1px]  md:hidden flex  bg-gray-200 mb-3 "></div>
                      </div>

                      <div className=" w-full     hidden  md:flex items-center justify-center">
                        <h1
                          onClick={() => setGopen(!Gopen)}
                          className=" border-[1px] border-t-0 justify-between      rounded-b-xl cursor-pointer mb-5  w-[95%] px-4 flex flex-row items-center  h-16  gap-2  text-sm      md:text-[15px]    font-normal      "
                        >
                          {" "}
                          <span className="     flex flex-row gap-3">
                            {Guest.Adults + Guest.Children} Geusts{" "}
                            {Guest.Infants < 1
                              ? ""
                              : " ," +
                                (Guest.Infants == 1
                                  ? Guest.Infants + " infant"
                                  : Guest.Infants + " infants")}{" "}
                            {Guest.Pets < 1
                              ? ""
                              : " ," +
                                (Guest.Pets == 1
                                  ? Guest.Pets + " Pet"
                                  : Guest.Pets + " Pets")}
                          </span>
                          <KeyboardArrowDownIcon
                            className={`  duration-150 transition-all ${
                              !Gopen ? "rotate-180" : " rotate-0"
                            }    `}
                          />
                        </h1>
                      </div>

                      <div className=" w-full flex gap-0  h-20 md:h-full       text-gray-800      p-2  px-4   md:relative    absolute    bottom-0 border-solid  md:border-t-0  border-t-[1px]  items-center justify-start bg-white  flex-row-reverse  ">
                        <button
                          disabled={laod}
                          onClick={handleNext}
                          className={` ${
                            msg == "booked" ? "bg-gray-800" : "bg-main"
                          }   text-sm md:text-lg hover:opacity-90  p-2 md:h-[90%] h-[80%] md:w-[90%] w-[55%]  relative  rounded-lg    text-white  `}
                        >
                          {msg == "booked" ? "Already Booked" : "Reserve "}
                          <span
                            className={` ${
                              laod ? " opacity-100 " : " opacity-0"
                            } bg-greedian   absolute top-0 right-0    bg-main rounded-lg duration-200 h-full w-full flex items-center justify-center   `}
                          >
                            <span className=" h-full w-full scale-[0.2]  md:scale-[0.2] flex items-center justify-center">
                              <svg
                                version="1.1"
                                id="L9"
                                xmlns="http://www.w3.org/2000/svg"
                                xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 100 100"
                                enable-background="new 0 0 0 0"
                                xml
                                space="preserve"
                              >
                                <path
                                  fill="#fff"
                                  d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                                >
                                  <animateTransform
                                    attributeName="transform"
                                    attributeType="XML"
                                    type="rotate"
                                    dur="1s"
                                    from="0 50 50"
                                    to="360 50  50"
                                    repeatCount="indefinite"
                                  />
                                </path>
                              </svg>
                            </span>
                          </span>
                          <span
                            className={`  ${
                              msg == "notbooked" ? " opacity-100" : " opacity-0"
                            }  duration-200 flex items-center  justify-center z-10 absolute rounded-lg top-0 right-0 h-full w-full bg-green-400    border-solid border-[1px] border-green-400 `}
                          >
                            <span className=" w4rAnimated_checkmark scale-[0.4] h-full w-full items-center flex justify-center ">
                              {msg == "notbooked" && (
                                <svg
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 130.2 130.2"
                                >
                                  <circle
                                    class="path circle"
                                    fill="none"
                                    stroke="white"
                                    stroke-width="8"
                                    stroke-miterlimit="10"
                                    cx="65.1"
                                    cy="65.1"
                                    r="62.1"
                                  />
                                  <polyline
                                    class="path check"
                                    fill="none"
                                    stroke="white"
                                    stroke-width="8"
                                    stroke-linecap="round"
                                    stroke-miterlimit="10"
                                    points="100.2,40.2 51.5,88.8 29.8,67.5 "
                                  />
                                </svg>
                              )}
                            </span>
                          </span>
                        </button>

                        <div className=" w-full flex      flex-col      items-start       text-sm   md:text-xl        ">
                          <span className="text-lg">
                            {daysStayed <= 0
                              ? 0
                              : "$" + data?.price * daysStayed}
                          </span>
                          <div className=" text-sm md:text-base flex flex-row   h-full  w-full justify-between items-center">
                            <span className=" text-sm   text-gray-700 ">
                              ${data?.price} x{" "}
                              {daysStayed <= 0 ? 0 : daysStayed} nights
                            </span>
                          </div>
                        </div>

                        <div></div>
                      </div>
                      {Gopen && (
                        <div
                          className={`  gap-4      w-full  top-12  shadow-xl   ${
                            Gopen ? "h-[240px] opacity-100" : "h-0 opacity-0"
                          } duration-150 rounded-3xl bg-white border-solid border-[1px] h-full pb-16 z-20 pt-2 my-3   absolute gap-5 flex flex-col max-w-full px-4 `}
                        >
                          {Gdata?.map((item) => (
                            <Gestes
                              onClick={incrementGuests} // Fix the function name here
                              dicrementGuests={dicrementGuests}
                              Geust={item.value} // Change this to item.value
                              title={item.title}
                              name={item.title}
                              desc={item.desc}
                              maxGuests={data?.maxGuests}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
             
             <GrayLine />  
             

              <div className=" pb-2 flex flex-row items-center w-full justify-between ">
                <h1 className=" text-lg  md:text-xl  font-normal">
                  This Place hosted by{" "}
                  {User?._id == data?.owner?._id
                    ? "you"
                    : data?.owner?.firstname}{" "}
                </h1>
                <img
                  className=" w-[60px] rounded-[50%]  bg-slate-100  p-1 cursor-pointer "
                  src={userimage}
                  alt=""
                />
              </div>
              <div className=" py-3 flex flex-row gap-2  md:gap-4">
                <span className=" border-[1px] border-solid rounded-xl w-full   gap-3  h-20 p-2 flex flex-row items-center justify-center ">
                  <BedOutlinedIcon />{" "}
                  <span className="  text-xs md:text-sm">
                    {data.Beds} {data?.Beds <= 2 ? "Beds" : "Bed"}
                  </span>
                </span>
                <span className=" border-[1px] border-solid rounded-xl  text-xs md:text-sm w-full gap-2 h-20 p-3 flex flex-row items-center justify-center ">
                  <ShowerOutlinedIcon />{" "}
                  {data.Bathrooms >= 2
                    ? "Shared bathroom"
                    : "Private attached bathroom"}
                </span>
                <span className=" border-[1px] border-solid rounded-xl w-full gap-2  h-20 p-5 flex flex-row items-center justify-center ">
                  <MeetingRoomOutlinedIcon />{" "}
                  <span className=" flex flex-row  text-xs md:text-sm ">
                    {" "}
                    {data?.Bedrooms}{" "}
                    {data?.Bedrooms <= 2 ? "Bedrooms" : "Bedroom"}
                  </span>
                </span>
              </div>
              <GrayLine />
              <div className=" flex flex-col gap-1">
                <h1 className="  text-xl md:text-2xl  font-normal ">
                  About this place
                </h1>
                <PlaceDescription
                  extra={extra}
                  setExtra={setExtra}
                  data={data}
                />
              </div>
              <GrayLine />

              <div
                className={`  duration-300 ease-out      overflow-hidden    flex flex-col items-center  bg-white fixed h-full  ${
                  morephotos
                    ? " top-0 opacity-[100%] "
                    : " opacity-0 top-[100%]"
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
                  {data?.photos?.map((photo) => (
                    <img
                      className="  rounded-lg p-2  w-full md:w-[60%]   "
                      src={"http://192.168.1.7:4000/uploads/" + photo}
                      alt=""
                    />
                  ))}
                </div>
              </div>

              <ExtraInfo setExtra={setExtra} extra={extra} data={data} />

              <div className=" pt-3 flex flex-col gap-5">
                <h1 className=" text-xl md:text-2xl  font-normal ">
                  What this place offers
                </h1>
                <div className="     flex-row gap-8 grid grid-cols-2   text-xs items-start justify-start w-full">
                  {data?.perks?.map((perk) => (
                    <PerksD perk={perk} />
                  ))}
                </div>
              </div>
              <GrayLine />
              <div className=" w-full flex flex-col py-3 ">
                <h1 className="text-xl md:text-2xl  font-normal">
                  Where you'll sleep
                </h1>
                <span className=" mt-3 gap-1 flex flex-col p-4   h-36 w-[50%] border-[1px] border-solid rounded-lg  ">
                  <BedOutlinedIcon fontSize="large" />
                  <h1 className=" text-lg font-medium pt-2">Bedroom</h1>
                  <p>
                    {data.Beds} {data.Beds <= 2 ? "Beds" : "Bed"}{" "}
                  </p>
                </span>
              </div>
            </div>
          </div>

          <div className="   hidden  md:block gap-10 md:w-[55%] relative  cursor-pointer ">
            <span
              onClick={AddFavorite}
              className=" z-10  top-7 right-8 bg-opacity-60 absolute h-8 w-8 bg-white rounded-full flex items-center justify-center "
            >
              {fav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="red"
                  class="w-6 h-6"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              ) : (
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
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              )}
            </span>

            <img
              onClick={hendelmorephotos}
              className=" rounded-[4rem]  h-[70vh] object-cover w-full "
              src={"http://192.168.1.7:4000/uploads/" + data?.photos[0]}
              alt=""
            />
            <div className=" w-full  items-center justify-center flex flex-row  gap-3">
              <div
                onClick={hendelmorephotos}
                className="  h-[200px] rounded-[3rem] my-5 bg-cover "
                style={{
                  backgroundImage: `url(http://192.168.1.7:4000/uploads/${data?.photos[1]})`,

                  backgroundPosition: "center",
                  width: "100%",
                }}
              />
              <div
                onClick={hendelmorephotos}
                className="  h-[200px] rounded-[3rem] my-5 bg-cover "
                style={{
                  backgroundImage: `url(http://192.168.1.7:4000/uploads/${data?.photos[2]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                }}
              />
            </div>

            <div className=" relative">
              <img
                className=" h-[60vh] mb-8 rounded-[4rem] object-cover w-full "
                src={"http://192.168.1.7:4000/uploads/" + data?.photos[3]}
                alt=""
              />
              <span
                onClick={hendelmorephotos}
                className=" items-center flex justify-center absolute cursor-pointer border-[1px]  border-gray-600  text-xs gap-2 text-gray-700 border-solid bg-white rounded-lg h-8 bottom-5  right-7  p-2"
              >
                {" "}
                <BorderAllIcon fontSize="small" /> more photos{" "}
              </span>
            </div>
          </div>
          <Massege img={Pdata.photos[0]} msg={Favadded} setMsg={setFavadded} />
        </div>
      )}
    </>
  );
}

export default PlaceDetailes;
