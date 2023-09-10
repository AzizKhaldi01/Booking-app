import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExtraInfo from "../component/ExtraInfo";
import FavoriteIcon from '@mui/icons-material/Favorite';
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

function PlaceDetailes() {
  const [morephotos, setMorephotos] = useState(false);
  const [extra, setExtra] = useState(false);
  // Initialize data as an empty object
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [Aopen, setAopen] = useState(false);
 
  const [fav, setFav] = useState(true);

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
    setCheckInDate,
    setCheckOutDate,
  } = useContext(BookingContext);
 
  const { _id } = useParams();
  const navigate = useNavigate();

  const handleNext = () => {
    localStorage.setItem("guest", JSON.stringify(Guest));
    localStorage.setItem("checkInDate", checkInDate.toISOString());
    localStorage.setItem("checkOutDate", checkOutDate.toISOString());
    localStorage.setItem("daysStayed", daysStayed.toString());
    localStorage.setItem("price", data.place.price.toString());
    localStorage.setItem("maxgeustes", data.place.maxGuests);
    localStorage.setItem("imageUrl", data.place.photos[0]);
    localStorage.setItem("title", data.place.title);
    localStorage.setItem("address", data.place.address);

    localStorage.setItem("id", _id);

    navigate("/guest-step");
  };

  function handelGoback() {
    navigate(-1);
  }


function AddFavorite (e){
  e.preventDefault();
 
  axios.post('/add-favorite' , {placeID:_id}).then((response)=>{
 
    if(response.data == 'liked' ){
       setFav(true)
    }else{
      setFav(false)
    }  
  })
}

  function handelBooking() {
    axios.post("/booking-add", {
      checkInDate,
      checkOutDate,
      Guest,
      daysStayed,
      _id,
      price: data.price * daysStayed,
    });
  }

useEffect(()=>{ 
   axios.get('/get-favorite').then((response) =>{
 const  {data} = response;
 const favoriteItemIds = data.map(item => item?.Place?._id);
 localStorage.setItem('fav',JSON.stringify(favoriteItemIds))
 

  
} )

},[fav])

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
    axios.get("/place-details/"+_id).then((response) => {
      const { data } = response;
      setData(data);
      setIsLoading(false); // Once data is fetched, set isLoading to false
    });
  }, [_id]);

  useEffect(() => {
     
    
    const userLikedItems = JSON.parse(localStorage.getItem('fav'))
        console.log('aa11 ' + userLikedItems);
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
            <span  onClick={AddFavorite} className=" h-8 w-8 bg-white rounded-full flex items-center justify-center ">
             {     fav  ?  <FavoriteIcon className="  text-red-600 scale-90" /> : <FavoriteBorderIcon className="  scale-90" />}
            </span>
          </div>
          <PhotoSlider
            onClick={hendelmorephotos}
            nonav={false}
            photos={data?.place?.photos}
            hight={true}
          />
        </div>
        <div className=" flex w-full p-2 flex-col">
          <div className="  text-2xl md:text-3xl   font-medium md:font-bold w-full  md:max-w-[90%] ">
            {data?.place?.title}
          </div>
          <p className="  md:text-base flex j items-start text-ms  py-2 md:py-4 text-gray-600">
            {" "}
            <PlaceIcon fontSize="small" /> {data?.place?.address}
          </p>
          <GrayLine />
          <div className="  hidden  md:flex flex-row gap-1 my-4 text-2xl  items-center  font-semibold">
            ${data?.place?.price}
            <span className=" font-normal  text-gray-700 text-sm  ">
              / night
            </span>
          </div>
          <div className="  fixed   md:hidden flex  right-0  w-full bottom-0  bg-white h-20 z-20 justify-between p-3 items-center border-solid border-t-[1px] text-xs text-white  border-gray-300 ">
            <span className="  font-medium   text-gray-700 text-base    ">
              {" "}
              ${data?.place?.price} / night
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
              } duration-200 fixed w-full h-full  bg-black     top-0 right-0 `}
            ></div>

            <div
              className={`    fixed    md:absolute   w-full  md:max-w-[450px]  md:pt-0 border-solid  border-0 md:border-[1px]  pt-10   overflow-hidden   shadow-2xl  duration-150 bg-white rounded-t-xl  md:rounded-xl   ${
                Aopen
                  ? "  bottom-0 md:h-[260px] opacity-100"
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
                        onClick={incrementGuests} // Fix the function name here
                        dicrementGuests={dicrementGuests}
                        Geust={item.value} // Change this to item.value
                        title={item.title}
                        name={item.title}
                        desc={item.desc}
                        maxGuests={data?.place?.maxGuests}
                      />
                    ))}
                  </div>
                </div>

                <div className=" w-full  flex items-center justify-center">
                  <div className="  w-[95%] h-[1px]  md:hidden flex  bg-gray-200 mb-3 "></div>
                </div>

                <div className=" w-full    hidden  md:flex items-center justify-center">
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

                {Gopen && (
                  <div
                    className={`  gap-4      w-full  top-12  shadow-xl   ${
                      Gopen ? "h-[250px] opacity-100" : "h-0 opacity-0"
                    } duration-150 rounded-3xl bg-white    z-10 border-solid border-[1px] h-full overflow-auto  pb-10 pt-2 my-3  absolute gap-5    flex flex-col max-w-full px-4   `}
                  >
                    {Gdata.map((item) => (
                      <Gestes
                        onClick={incrementGuests} // Fix the function name here
                        dicrementGuests={dicrementGuests}
                        Geust={item.value} // Change this to item.value
                        title={item.title}
                        name={item.title}
                        desc={item.desc}
                        maxGuests={data?.place?.maxGuests}
                      />
                    ))}
                  </div>
                )}
                <div className=" w-full flex   gap-5 h-full     md:flex-col  flex-col-reverse  ">
                  <div className={`  w-full flex items-center justify-center `}>
                    <button
                      onClick={handleNext}
                      className=" h-12 text-lg  font-medium text-white w-[95%]  bg-[#578280] rounded-lg"
                    >
                      Reserve
                    </button>
                  </div>

                  <div className=" w-full flex   flex-col   items-center    text-lg    px-4">
                    <div className=" flex w-full justify-between items-center">
                      <span className="text-sm ">
                        ${data?.place?.price} x {daysStayed <= 0 ? 0 : daysStayed}{" "}
                        nights
                      </span>
                      {daysStayed <= 0 ? 0 : "$" + data?.place?.price * daysStayed}
                    </div>

                    <span>{}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <GrayLine />
          <PlaceDescription extra={extra} setExtra={setExtra} data={data.place} />
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
              {data?.place?.photos.map((photo) => (
                <img
                  className="  rounded-lg p-2  w-full md:w-[60%]   "
                  src={"http://localhost:4000/uploads/" + photo}
                  alt=""
                />
              ))}
            </div>
          </div>

          <ExtraInfo setExtra={setExtra} extra={extra} data={data.place} />

          <div className="   pt-14 flex-row gap-8 grid grid-cols-2   text-xs items-start justify-start w-full">
            {data?.place?.perks.map((perk) => (
              <PerksD perk={perk} />
            ))}
          </div>
        </div>
      </div>

      <div
        onClick={hendelmorephotos}
        className=" w-full hidden  md:block gap-10 md:w-[60%]  cursor-pointer "
      >
        <img
          className=" rounded-[4rem]  h-[75vh] object-cover w-full "
          src={"http://localhost:4000/uploads/" + data.place?.photos[0]}
          alt=""
        />
        <div className=" w-full  items-center justify-center flex flex-row  gap-3">
          <div
            className="  h-[200px] rounded-[3rem] my-5 bg-cover "
            style={{
              backgroundImage: `url(http://localhost:4000/uploads/${data.place?.photos[1]})`,

              backgroundPosition: "center",
              width: "100%",
            }}
          />
          <div
            className="  h-[200px] rounded-[3rem] my-5 bg-cover "
            style={{
              backgroundImage: `url(http://localhost:4000/uploads/${data.place?.photos[2]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
            }}
          />
        </div>

        <div className=" relative">
          <img
            className=" h-[60vh] mb-8 rounded-[4rem] object-cover w-full "
            src={"http://localhost:4000/uploads/" + data.place?.photos[3]}
            alt=""
          />
          <span className=" items-center flex justify-center absolute cursor-pointer border-[1px]  border-gray-600  text-xs gap-2 text-gray-700 border-solid bg-white rounded-lg h-8 bottom-5  right-7  p-2">
            {" "}
            <BorderAllIcon fontSize="small" /> more photos{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetailes;
