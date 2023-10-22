import React from "react";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { Usercontext } from "../context/pagecontext";
import Perks from "./perks";
import CloseIcon from "@mui/icons-material/Close";

import { PlaceSchema } from "../Validation/AddPlaceValidation";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Category from "./Category";
import HousingMassge from "./HousingMassge";
function NewAccommodation({ setAdd, add }) {
  const {
    values,
    handleBlur,
    errors,
    setTouched,
    touched,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      title: "",
      address: "",
      description: "",
      extraInfo: "",
      checkIn: "",
      checkOut: "",

      price: "100",
    },
    validationSchema: PlaceSchema,
    onSubmit,
  });
  const navto = useNavigate();
  const { placesdata, link, setReload, reload } = useContext(Usercontext);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [photolink, setPhotolink] = useState("");
  const [Placeinfo, setPlaceinfo] = useState({
    Guests: 1,
    Bedrooms: 0,
    Beds: 1,
    Bathrooms: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [PlaceSaving, setPlaceSaving] = useState(false);
  const [UpLoading, setUpLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", color: "" });
  const [category, setCategory] = useState();

  useEffect(() => {
    if (placesdata) {
      setValues({
        ...values,
        title: placesdata.title,
        address: placesdata.address,
        description: placesdata.description,
        extraInfo: placesdata.extraInfo,
        checkIn: placesdata.checkIn,
        checkOut: placesdata.checkOut,
        price: placesdata.price,
      });
      setPlaceinfo({
        ...Placeinfo,
        Guests: placesdata.maxGuests,
        Bedrooms: placesdata.Bedrooms,
        Beds: placesdata.Beds,
        Bathrooms: placesdata.Bathrooms,
      });
      setAddedPhotos(placesdata.photos);

      setPerks(placesdata.perks);

      setCategory(placesdata.category);
    } else {
      setValues({
        ...values,
        title: "",
        address: "",
        description: "",
        extraInfo: "",
        checkIn: "",
        checkOut: "",
        price: "100",
      });
      setAddedPhotos([]);
      setPlaceinfo({
        Bedrooms: 0,
        Guests: 1,
        Beds: 1,
        Bathrooms: 1,
      });
      setPerks([]);

      setCategory([]);
    }
  }, [placesdata]);

  const handleCatyChange = (option) => {
    setCategory(option);
  };

  const deletecategory = (caty) => {
    setCategory();
  };

  async function sendLinke(ev) {
    ev.preventDefault();
    setIsLoading(true);
    axios
      .post("/upload-by-url", {
        link: photolink,
      })
      .then((response) => {
        const { data: filename } = response;
        setIsLoading(false);
        setAddedPhotos((prev) => {
          return [...prev, filename];
        });
        setPhotolink("");
      })
      .catch((error) => {
        if (error.response) {
          setIsLoading(false);

          if (error.response.status === 400) {
            console.error("Client Error:", error.response.data);
            setPhotolink("");
            setMsg({
              text: error.response.data,
              color: "text-red-500 border-red-500 bg-red-200",
            });
          } else if (error.response.status >= 500) {
            console.error("Server Error:", error.response.data);
          }
        } else if (error.request) {
          console.error("No Response Received:", error.request);
        } else {
          console.error("Request Setup Error:", error.message);
        }
      });
  }
  function uploadphoto(ev) {
    setUpLoading(true);
    ev.preventDefault();
    const filesArray = ev.target.files;
    const maxSizeInBytes = 3 * 1024 * 1024;
    for (let i = 0; i < filesArray.length; i++) {
      const file = filesArray[i];
      const fileSize = file.size;

      if (fileSize > maxSizeInBytes) {
        setMsg({
          text: "Maximum file size is 3MB",
          color: "text-red-500 border-red-500 bg-red-200",
        });

        setUpLoading(false);
        return;
      }
    }

    const data = new FormData();
    // Append each file to the FormData object
    for (let i = 0; i < filesArray?.length; i++) {
      data.append("files", filesArray[i]);
    }
    axios
      .post("/uploads", data)
      .then((response) => {
        // Assuming that the server returns the filename in the response data.
        console.log(response);
        const { filenames } = response.data;
        setUpLoading(false);

        // Update the setAddedPhotos state with the new filename.
        setAddedPhotos((prev) => [...prev, ...filenames]);
      })
      .catch((error) => {
        if (error.message === "File too large") {
          // Handle the "File too large" error here
          setUpLoading(false);

          console.error("File is too large. Please upload a smaller file.");
        } else {
          setUpLoading(false);

          // Handle other errors
          console.error("An error occurred:", error);
        }
      });
  }
  function deletphoto(filename, e) {
    e.preventDefault();
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  }

  async function onSubmit(ev) {
    setPlaceSaving(true);
    const placeData = {
      perks,
      category,
      addedPhotos,
      Guests: Placeinfo.Guests,
      Bathrooms: Placeinfo.Bathrooms,
      Bedrooms: Placeinfo.Bedrooms,
      Beds: Placeinfo.Beds,
      ...values,
    };

    if (link) {
      // update
      await axios
        .put("/places", { ...placeData, link })
        .then((response) => {
          const { data } = response;
          setPlaceSaving(false);
          setMsg({
            text: data.message,
            color: "text-main border-main bg-green-100",
          });

          navto("/account/housing/");
          setAdd(!add);
          setReload(!reload);
          setValues({
            ...values,
            title: "",
            address: "",
            description: "",
            extraInfo: "",
            checkIn: "",
            checkOut: "",
            price: "100",
          });
          setAddedPhotos([]);
          setPerks([]);
          setCategory([]);
        })
        .catch((err) => {
          setPlaceSaving(false);
        });
    } else {
      await axios
        .post("/places", placeData)
        .then((response) => {
          const { data } = response;
          setMsg({
            text: data.message,
            color: "text-main border-main bg-green-100",
          });

          setAdd(!add);
          setReload(!reload);
          navto("/account/housing/");
          setReload(!reload);
          setValues({
            ...values,
            title: "",
            address: "",
            description: "",
            extraInfo: "",
            checkIn: "",
            checkOut: "",
            price: "100",
          });
          setAddedPhotos([]);
          setPerks([]);
          setCategory([]);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              console.error("Client Error:", error.response.data);

              setMsg({
                text: error.response.data,
                color: "text-red-500 border-red-500 bg-red-200",
              });
            } else if (error.response.status >= 500) {
              console.error("Server Error:", error.response.data);
            }
          } else if (error.request) {
            console.error("No Response Received:", error.request);
          } else {
            console.error("Request Setup Error:", error.message);
          }
        });
    }
  }

  const placebasics = [
    {
      text: "Guests",
      value: Placeinfo.Guests,
    },
    {
      text: "Bedrooms",
      value: Placeinfo.Bedrooms,
    },
    {
      text: "Beds",
      value: Placeinfo.Beds,
    },
    {
      text: "Bathrooms",
      value: Placeinfo.Bathrooms,
    },
  ];

  function moveToFirst(filename) {
    const indexToMove = addedPhotos.findIndex((photo) => photo === filename);

    if (indexToMove === -1) {
      // Item with the specified filename not found in the array
      return;
    }

    const updatedPhotos = [...addedPhotos];

    const [movedPhoto] = updatedPhotos.splice(indexToMove, 1);

    updatedPhotos.unshift(movedPhoto);

    setAddedPhotos(updatedPhotos);
  }

  function dec(e, text) {
    e.preventDefault();

    if (text == "Bedrooms") {
      var minvalue = 0;
    } else {
      var minvalue = 1;
    }

    setPlaceinfo((prevPlacInfo) => ({
      ...prevPlacInfo,

      [text]:
        prevPlacInfo[text] > minvalue
          ? prevPlacInfo[text] - 1
          : prevPlacInfo[text],
    }));
  }

  function inc(e, text) {
    e.preventDefault();
    setPlaceinfo((prevPlacInfo) => ({
      ...prevPlacInfo,
      [text]: prevPlacInfo[text] + 1,
    }));
  }

  return (
    <div
      className={` duration-300  ${
        !add ? "top-[50%]" : " top-[-100%] "
      }  flex  z-[120] fixed h-full w-full relateve `}
    >
      <div
        onClick={() => setAdd(!add)}
        className={`  flex  fixed h-full w-full absulet ${
          !add ? " opacity-50 top-0  " : "opacity-0  top-[-100%]   "
        }  right-0 bg-black `}
      ></div>

      <div
        className={` ${
          add ? "  md:top-[-100%] bottom-[-100%] " : "  bottom-0 md:top-[50%] "
        }   duration-300     transform pt-16  pb-3   md:translate-x-[-50%] md:translate-y-[-50%]  h-[95%]  md:h-[90%]  left-0   md:left-[50%] flex fixed lg:w-[66%]  xl:w-[60%]   w-full  md:w-[90%]     flex-col item-center  justify-center md:rounded-b-xl   rounded-b-none   bg-white rounded-xl `}
      >
        <div className=" absolute top-0 w-full   border-solid border-b-[1px] flex items-center h-16 rounded-t-xl justify-center right-0 bg-white  text-4xl  ">
          <span
            onClick={() => setAdd(!add)}
            className=" absolute top-2 left-4 cursor-pointer"
          >
            {" "}
            <CloseIcon />{" "}
          </span>
          <h className=" text-xl">Add Place</h>
        </div>

    

        <form
          onSubmit={handleSubmit}
          className="   pb-10    h-full overflow-auto    w-full    "
        >
          <div className=" flex-grow w-full flex flex-col   p-4  md:p-7 ">
            <h1 className="">Title</h1>
            <p className=" text-gray-500 text-xs  pb-1">
              Title for your place should be short and catchy as in advertisment
            </p>
            <input
              className={` ${
                errors.title && touched.title
                  ? " border-[#fc8181] text-red-500  border-[2px]"
                  : ""
              } h-12   w-full rounded-lg px-3 bg-slate-100 `}
              type="text"
              placeholder=" Title "
              value={values.title}
              id="title"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.title && touched.title && (
              <p className=" pt-1 px-1 text-xs text-red-400">
                {" "}
                {errors.title}{" "}
              </p>
            )}

            <h1 className=" pt-5">Address</h1>
            <p className=" text-gray-500 text-xs pb-1">Address to your place</p>
            <input
              className={` ${
                errors.address && touched.address
                  ? " border-[#fc8181] text-red-500  border-[2px]"
                  : ""
              }    h-12 w-full rounded-lg px-3 bg-slate-100 `}
              type="text"
              placeholder=" Address "
              value={values.address}
              id="address"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.address && touched.address && (
              <p className=" pt-1 px-1 text-xs text-red-400">
                {" "}
                {errors.address}{" "}
              </p>
            )}

            <h1 className=" pt-5">Photos</h1>
            <p className=" text-gray-500 text-xs pb-1">
              More Photos More batter
            </p>
            <div className=" flex flex-row gap-2">
              <input
                value={photolink}
                onChange={(e) => setPhotolink(e.target.value)}
                className=" h-12  w-full rounded-lg px-3 bg-slate-100"
                type="text"
                placeholder=" Add using link to your photo .... "
              />
              <button
                onClick={sendLinke}
                className="   font-medium text-white    relative justify-center flex flex-row items-center gap-2  w-[15%]  rounded-lg  text-xs md:text-sm bg-main"
              >
                <span
                  className={` ${
                    isLoading ? " opacity-100 " : " opacity-0"
                  } bg-greedian   absolute top-0 right-0 bg-main   rounded-lg duration-200 h-full w-full flex items-center justify-center   `}
                >
                  <span className=" h-full w-full scale-[1]  md:scale-[0.4] flex items-center justify-center">
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
                Add Photo
              </button>
            </div>
            <div className=" mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {addedPhotos?.length > 0 &&
                addedPhotos.map((pic) => (
                  <div className=" relative gap-2">
                    <div className=" flex  px-1  md:px-6 justify-between absolute bottom-2 w-full">
                      <button
                        className="    p-1 bg-white bg-opacity-50 text-gray-900 rounded-[50%] "
                        onClick={(e) => deletphoto(pic)}
                      >
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                      <button
                        className="    p-1 bg-white bg-opacity-50 text-gray-900 rounded-[50%] "
                        onClick={(e) => moveToFirst(pic)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={`   ${
                            addedPhotos.indexOf(pic) === 0 ? " " : " none"
                          }  `}
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      </button>
                    </div>
                    <img
                      className="  object-cover h-28 w-72 rounded-lg "
                      src={` http://192.168.1.7:4000/uploads/${pic}  `}
                      alt=""
                    />
                  </div>
                ))}

              <label
                className=" cursor-pointer  relative p-4 py-6 rounded-xl border-2 border-solid flex justify-center items-center"
                htmlFor="fileup"
              >
                <span
                  className={` ${
                    UpLoading ? " opacity-100 " : " opacity-0"
                  } bg-greedian   absolute top-0 right-0 bg-white rounded-lg text-gray-800 duration-200 h-full w-full flex items-center justify-center   `}
                >
                  <span className=" h-full w-full scale-[1]  md:scale-[0.4] flex items-center justify-center">
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
                        fill="#808080"
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
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <input
                  disabled={UpLoading}
                  type="file"
                  className=" hidden z-20 "
                  onChange={uploadphoto}
                  name=""
                  id="fileup"
                  multiple
                />
              </label>
            </div>

            <h1 className=" pt-5">Descriptoin</h1>
            <p className=" text-gray-500 text-xs pb-1">
              Descripton of the place
            </p>
            <textarea
              value={values.description}
              id="description"
              onBlur={handleBlur}
              onChange={handleChange}
              className={` ${
                errors.description && touched.description
                  ? " border-[#fc8181] text-red-300   border-[2px]"
                  : ""
              } border-2 border-solid rounded-xl px-3 w-full h-[100px] `}
            />
            {errors.description && touched.description && (
              <p className=" pt-1 px-1 text-xs text-red-400">
                {" "}
                {errors.description}
              </p>
            )}
            <div className=" w-full  h-full  ">
              <h1 className=" pt-5">Share some basics about your place</h1>
              <p className=" text-gray-500 text-xs">
                You'll add more details later, such as bed types.
              </p>

              <div className="   gap-6 grid  grid-cols-1 md:grid-cols-2 h-full     pt-3  ">
                {placebasics.map((place) => (
                  <div className=" flex flex-row w-full justify-between items-center pr-4 border-b-[1px] border-solid py-3">
                    <div className=" w-full text-lg font-light ">
                      {place.text}
                    </div>
                    <div className=" gap-2 flex  items-center     ">
                      <button
                        onClick={(e) => dec(e, place.text)}
                        className={`    rounded-[50%] h-9  active:scale-95   hover:opacity-100 opacity-70 w-9 text-[#578280]  border-[1px] border-[#578280] `}
                      >
                        <RemoveIcon fontSize="" />
                      </button>
                      <input
                        value={place.value}
                        className=" rounded-lg h-10 bg-white text-sm font-semibold items-center text-center w-10   "
                        id="adults"
                      />
                      <button
                        onClick={(e) => inc(e, place.text)}
                        className={`    rounded-[50%] h-9   hover:opacity-100 opacity-70   w-9 active:scale-95 hover:bg-   text-[#578280]   border-[1px]   border-[#578280] `}
                      >
                        <AddIcon fontSize="" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h1 className=" pt-5">Perks</h1>
            <p className=" text-gray-500 text-xs  pb-1">
              Select all your Perks
            </p>

            <div className="   gap-3 w-full   grid  grid-cols-2  md:grid-cols-4 lg:grid-cols-6 justify-between ">
              <Perks selected={perks} onChange={setPerks} />
            </div>

            <Category
              deletecategory={deletecategory}
              handleChange={handleCatyChange}
              setSelectedValue={setCategory}
              selectedValue={category}
            />

            <h1 className=" pt-5">Extra Info</h1>
            <p className=" text-gray-500 text-xs pb-1">house rouls, etc</p>
            <textarea
              value={values.extraInfo}
              id="extraInfo"
              onChange={handleChange}
              onBlur={handleBlur}
              className={` ${
                errors.extraInfo && touched.extraInfo
                  ? " border-[#fc8181] text-red-500  border-[2px]"
                  : ""
              } border-solid border-2 px-2 rounded-xl w-full h-[100px]  `}
            />
            {errors.extraInfo && touched.extraInfo && (
              <p className=" pt-1 px-1 text-xs text-red-400">
                {errors.extraInfo}
              </p>
            )}

            <div className=" "></div>
            <h1 className=" pt-5">Check in&out times</h1>
            <p className=" text-gray-500 text-xs">house rouls, etc</p>
            <div className=" grid  gap-4   grid-cols-2  md:grid-cols-4">
              <div>
                <h3 className=" text-sm md:text-lg mt-3">Check in time</h3>
                <input
                  value={values.checkIn}
                  id="checkIn"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="number"
                  className={`  ${
                    errors.checkIn && touched.checkIn
                      ? " border-[#fc8181] text-red-500  border-[2px]"
                      : ""
                  } w-full h-12  border-solid border-2 rounded-lg  px-2`}
                />
                {errors.checkIn && touched.checkIn && (
                  <p className=" pt-1 px-1 text-xs text-red-400">
                    {" "}
                    {errors.checkIn}{" "}
                  </p>
                )}
              </div>
              <div>
                <h3 className=" text-sm md:text-lg mt-3">Check out time</h3>
                <input
                  value={values.checkOut}
                  id="checkOut"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="number"
                  className={` ${
                    errors.checkOut && touched.checkOut
                      ? " border-[#fc8181] text-red-500  border-[2px]"
                      : ""
                  } checkIn  w-full h-12  border-solid border-2 rounded-lg  px-2`}
                />
                {errors.checkOut && touched.checkOut && (
                  <p className=" pt-1 px-1 text-xs text-red-400">
                    {" "}
                    {errors.checkOut}{" "}
                  </p>
                )}
              </div>
            </div>
            <div className=" pb-3">
              <h1 className=" pt-5">Set Your Price</h1>
              <h3 className=" pb-1  text-xs text-gray-500 ">
                {" "}
                You can change it anytime.
              </h3>
              <input
                value={values.price}
                id="price"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                className={`  ${
                  errors.price && touched.price
                    ? " border-[#fc8181] text-red-500  border-[2px]"
                    : ""
                }    h-12  border-solid border-2 rounded-lg      text-xl  w-full  md:w-[20%] px-2`}
              />
              {errors.price && touched.price && (
                <p className=" pt-1 px-1 text-xs text-red-400">
                  {errors.price}
                </p>
              )}
            </div>
             
          </div>

          <div className="  border-solid border-t-[1px]  md:rounded-b-xl   items-center h-16 w-full flex flex-row justify-between px-7 absolute bottom-0  z-10  bg-white   right-0">
          <button
            onClick={(e) => {setAdd(!add) ; e.preventDefault();  }}
            className=" border-[1px] border-solid  px-8 rounded-lg p-2"
          >
            Cancel
          </button>
          <button
            className="  relative text-white bg-[#578280]  px-8 rounded-lg p-2"
             type="submit"
          >
             {link ? "Save the Changes" : "Save"}{" "}
             <span
                  className={` ${
                    PlaceSaving ? " opacity-100 " : " opacity-0"
                  } bg-greedian   absolute top-0 right-0 bg-main   rounded-lg duration-200 h-full w-full flex items-center justify-center   `}
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
                </span>{" "}
          </button>
        </div>
        </form>
      </div>
      <HousingMassge msg={msg} setMsg={setMsg} />
    </div>
  );
}

export default NewAccommodation;
