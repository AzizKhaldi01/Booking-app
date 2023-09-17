import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExtraInfo from "../component/ExtraInfo";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import PerksD from "../component/PerksD";
import PhotoSlider from "../component/Imageslaider";
import PlaceIcon from "@mui/icons-material/Place";
import Gestes from "../component/Gestes";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BookingContext } from "../context/Bookingconext";
import Datepick from "../component/Datepick";
import PlaceDescription from "../component/PlaceDescription";
import GrayLine from "../component/GrayLine";
import { Usercontext } from "../context/pagecontext";
import Massege from "../component/Massege";
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
  const [Favadded, setFavadded] = useState('');


  const [Gopen, setGopen] = useState(false);
  const {
    setData,
    data,
    handleCheckOutChange,
    handleCheckInChange,
    formattedCheckOutDate,
    formattedCheckInDate,
    dicrementGuests,
    incrementGuests,
    Gdata,
    daysStayed,
    Guest,
    setGuest,
    checkOutDate,
    checkInDate,

    setCheckOutDate,
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
        localStorage.setItem("checkInDate", checkInDate.toISOString());
        localStorage.setItem("checkOutDate", checkOutDate.toISOString());
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
        setFavadded('added')
      } else {
        e.preventDefault();
        setFav(false);
        setFavadded('removed')
      }
    });
  }

 

  useEffect(() => {
    axios.get("/get-favorite").then((response) => {
      const { data } = response;
      const favoriteItemIds = data.map((item) => item?.Place?._id);
      localStorage.setItem("fav", JSON.stringify(favoriteItemIds));
    });
  }, [fav]);

  useEffect(() => {
    const nextDay = new Date(checkInDate);
    nextDay.setDate(nextDay.getDate() + 7);
    setCheckOutDate(nextDay);
  }, [checkInDate]);

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
    setFav(userLikedItems.includes(_id));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading message or spinner while waiting for data
  }

  function hendelmorephotos() {
    setMorephotos(!morephotos);
    document.body.style.overflow = !morephotos ? " hidden" : "auto";
  }

  return (
    <div className="  overflow-hidden  md:pb-0 pb-20   px-3 lg:px-12 w-full h-full  gap-12   mt-0 md:mt-40 justify-between flex   flex-col-reverse md:flex-row">
      <div className="  w-full md:w-[40%] flex flex-col     ">
        <div className="md:hidden  scale-110  pb-7 cursor-pointer block relative w-full  ">
          <div className=" flex flex-row justify-between items-center  mt-3 p-5 w-full absolute h-10 top-2   z-20">
            <span
              onClick={handelGoback}
              className=" h-8 w-8 bg-white rounded-full flex z-30 items-center justify-center "
            >
              <KeyboardArrowLeftIcon className="  scale-110" />{" "}
            </span>
            <span
              onClick={AddFavorite}
              className=" h-8 w-8 bg-white rounded-full flex items-center justify-center "
            >
              {fav ? (
                <FavoriteIcon className="  text-red-600 scale-90" />
              ) : (
                <FavoriteBorderIcon className="  scale-90" />
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
          <GrayLine />
          <div className="  hidden  md:flex flex-row gap-1 my-4 text-2xl  items-center  font-semibold">
            ${data?.price}
            <span className=" font-normal  text-gray-700 text-sm  ">
              / night
            </span>
          </div>
          <div className="  fixed   md:hidden flex  right-0  w-full bottom-0  bg-white h-20 z-20 justify-between p-3 items-center border-solid border-t-[1px] text-xs text-white  border-gray-300 ">
            <span className="  font-medium   text-gray-700 text-base    ">
              {" "}
              ${data?.price} / night
            </span>
            <button
              onClick={() => setAopen(!Aopen)}
              className=" bg-main p-3 text-sm  h-full rounded-md "
            >
              Check Availability
            </button>
          </div>
          <div className="          flex-row    justify-between  w-full xl:w-[70%]  text-sm items-center  md:relative   bottom-0 bg-white  right-0   flex ">
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
              className={` ${
                Aopen ? "   md:opacity-0 opacity-30 z-0" : "  opacity-0 -z-10 "
              } duration-200 fixed w-full h-full   bg-black     top-0 right-0 `}
            ></div>

            <div
              className={`    fixed    md:absolute   w-full  md:max-w-[450px]  md:pt-0 border-solid  border-0 md:border-[1px]  pt-10   overflow-hidden   shadow-2xl  duration-150 bg-white rounded-t-xl  md:rounded-xl   ${
                Aopen
                  ? "  bottom-0 md:h-[270px]  opacity-100"
                  : " opacity-0  -bottom-[100%]  md:h-0"
              }   z-20    h-[460px]   md:top-20  left-0   `}
            >
              <Datepick
                daysStayed={daysStayed}
                Aopen={Aopen}
                handleCheckInChange={handleCheckInChange}
                handleCheckOutChange={handleCheckOutChange}
                formattedCheckOutDate={formattedCheckOutDate}
                formattedCheckInDate={formattedCheckInDate}
              />

              <div className=" text-base items-center justify-between px-3  md:hidden flex w-full h-10 bg-white  rounded-t-lg absolute top-0 right-0">
                <span onClick={() => setAopen(!Aopen)}>
                  <ClearIcon />{" "}
                </span>
              </div>
              <div
                className={` ${
                  !Aopen ? "hidden" : "flex"
                }  flex  relative  max-w-full  flex-col  `}
              >
                <div className=" w-full  flex items-center justify-center">
                  <div className="  w-[95%] h-[1px]  md:hidden flex  bg-gray-200 my-2 "></div>
                </div>

                <div className=" px-3 md:hidden  flex  py-2   flex-col w-full h-full gap-3">
                  <span className="   text-lg font-medium   flex flex-row gap-3">
                    Guests
                  </span>

                  <div className=" w-full  flex-col items-center  justify-center ">
                    {Gdata.map((item) => (
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
                    className="    border-2  justify-between    mt-1 rounded-lg cursor-pointer mb-5  w-[95%] px-4 flex flex-row items-center  h-16  gap-2  text-sm      md:text-[15px]    font-normal      "
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

                <div className=" w-full flex   gap-5 h-full     md:flex-col  flex-col-reverse  ">
                  <div className={`  w-full flex items-center justify-center `}>
                    {/* <button
                      onClick={handleNext}
                      className=" h-12 text-lg  font-medium text-white w-[95%]  bg-[#578280] rounded-lg"
                    >
                      Reserve
                    </button> */}

                    <button
                      disabled={laod}
                      onClick={handleNext}
                      className={` ${
                        msg == "booked" ? "bg-gray-800" : "bg-main"
                      }   md:text-lg hover:opacity-90 h-14  w-full   mx-3    relative  rounded-lg    text-white  `}
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
                  </div>

                  <div className=" w-full flex   flex-col   items-center    text-lg       px-4">
                    <div className=" flex w-full justify-between items-center">
                      <span className="text-sm ">
                        ${data?.price} x {daysStayed <= 0 ? 0 : daysStayed}{" "}
                        nights
                      </span>
                      {daysStayed <= 0 ? 0 : "$" + data?.price * daysStayed}
                    </div>

                    <span>{}</span>
                  </div>
                </div>
                {Gopen && (
                  <div
                    className={`  gap-4      w-full  top-12  shadow-xl   ${
                      Gopen ? "h-[250px] opacity-100" : "h-0 opacity-0"
                    } duration-150 rounded-3xl bg-white     border-solid border-[1px] h-full overflow-auto  pb-16 z-20 pt-2 my-3  absolute gap-5    flex flex-col max-w-full px-4   `}
                  >
                    {Gdata.map((item) => (
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
          <GrayLine />
          <PlaceDescription extra={extra} setExtra={setExtra} data={data} />
          <GrayLine />

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
              {data?.photos.map((photo) => (
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
            {data?.perks.map((perk) => (
              <PerksD perk={perk} />
            ))}
          </div>
        </div>
      </div>

      <div className=" w-full hidden  md:block gap-10 md:w-[60%] relative  cursor-pointer ">
        <span
          onClick={AddFavorite}
          className=" z-10  top-7 right-8 absolute h-8 w-8 bg-white rounded-full flex items-center justify-center "
        >
          {fav ? (
            <FavoriteIcon className="  text-red-600 scale-90" />
          ) : (
            <FavoriteBorderIcon className="  scale-90" />
          )}
        </span>

        <img
          onClick={hendelmorephotos}
          className=" rounded-[4rem]  h-[75vh] object-cover w-full "
          src={"http://localhost:4000/uploads/" + data?.photos[0]}
          alt=""
        />
        <div
          onClick={hendelmorephotos}
          className=" w-full  items-center justify-center flex flex-row  gap-3"
        >
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
       <Massege img={Pdata.photos[0]} msg={Favadded} setMsg={setFavadded} />
    </div>
  );
}

export default PlaceDetailes;
