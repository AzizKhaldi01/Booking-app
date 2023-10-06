import React from "react";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { Usercontext } from "../context/pagecontext";
import Perks from "./perks";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Category from "./Category";
import HousingMassge from "./HousingMassge";
function NewAccommodation({ setAdd, add }) {
  const navto = useNavigate();

  const { placesdata, link, setReload, reload } = useContext(Usercontext);

  console.log("the id   " + link);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [photolink, setPhotolink] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [file, setFile] = useState();
  const [msg, setMsg] = useState("");

  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (placesdata) {
      setTitle(placesdata.title);
      setAddress(placesdata.address);
      setDescription(placesdata.description);
      setMaxGuests(placesdata.maxGuests);
      setCheckOut(placesdata.checkOut);
      setCheckIn(placesdata.checkIn);
      setAddedPhotos(placesdata.photos);
      setExtraInfo(placesdata.extraInfo);
      setPerks(placesdata.perks);
      setPrice(placesdata.price);
      setCategory(placesdata.category);
    } else {
      setTitle("");
      setAddress("");
      setDescription("");
      setMaxGuests("");
      setCheckOut("");
      setCheckIn("");
      setAddedPhotos([]);
      setExtraInfo("");
      setPerks([]);
      setPrice();
      setCategory([]);
    }
  }, [placesdata]);

  const handleChange = (option) => {
    // Check if the option already exists in the category array
    if (!category.includes(option)) {
      // If it doesn't exist, add it to the category array
      setCategory([...category, option]);
    }
    // If it already exists, do nothing or handle it as you wish.
  };
  console.log(category);

  const deletecategory = (caty) => {
    setCategory(category.filter((value) => value !== caty));
  };

  const options = [
    "Hotel",
    "Cabins",
    "Islands",
    "Boats",
    "Farms",
    "Luxe",
    "Beach",
    "Amazing pools",
    "villa ",
    "cave",
    "House",
    "Bungalow",
    "ApartmentIcon",
  ];

  console.log("eeeee   " + [addedPhotos]);

  async function sendLinke(ev) {
    ev.preventDefault();
    axios
      .post("/upload-by-url", {
        link: photolink,
      })
      .then((response) => {
        const { data: filename } = response;
        setAddedPhotos((prev) => {
          return [...prev, filename];
        });
        setPhotolink("");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            console.error("Client Error:", error.response.data);
            setPhotolink('')
            setMsg(error.response.data);
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
    ev.preventDefault();
    const filesArray = ev.target.files;
    console.log(filesArray?.length);
    // Update the state with the array of selected files
    setFile(filesArray);

    const data = new FormData();

    // Append each file to the FormData object
    for (let i = 0; i < filesArray?.length; i++) {
      data.append("files", filesArray[i]);
    }

    axios
      .post("/uploads", data)
      .then((response) => {
        // Assuming that the server returns the filename in the response data.
        const { filenames } = response.data;

        // Update the setAddedPhotos state with the new filename.
        setAddedPhotos((prev) => [...prev, ...filenames]);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(addedPhotos);
  }

  function deletphoto(filename) {
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  }

  async function savePlace(ev) {
    ev.preventDefault();


   
    const placeData = {
      title,
      address,
      addedPhotos,
      price,
      category,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (link) {
      // update
      await axios.put("/places", { ...placeData, link }).then((response) => {
        const { data } = response.message;
        setMsg(data);
      });

      navto("/account/accommodation/");
      setAdd(!add);
      setReload(!reload);
      console.log("update");

      setTitle("");
      setAddress("");
      setDescription("");
      setMaxGuests("");
      setCheckOut("");
      setCheckIn("");
      setAddedPhotos([]);
      setExtraInfo("");
      setPerks([]);
      setPrice();
      setCategory([]);
    } else {
      await axios
        .post("/places", placeData)
        .then((response) => {
          const { data } = response;
          setMsg(data.message);
          setAdd(!add);
          setReload(!reload);
      navto("/account/housing/");
      console.log("add new one");
      setReload(!reload);

      setTitle("");
      setAddress("");
      setDescription("");
      setMaxGuests("");
      setCheckOut("");
      setCheckIn("");
      setAddedPhotos([]);
      setExtraInfo("");
      setPerks([]);
      setPrice();
      setCategory([]);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              console.error("Client Error:", error.response.data);
              setMsg(error.response.data);
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

    // new place
  }

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

  return (
    <div
      className={` duration-300  ${
        !add ? "top-[50%]" : "top-[-100%] "
      }  flex  z-50 fixed h-full w-full relateve `}
    >
      <div
        onClick={() => setAdd(!add)}
        className={` flex fixed h-full w-full   absulet ${
          !add ? " opacity-50 top-0 " : "opacity-0  top-[-100%] "
        }  right-0 bg-black `}
      ></div>

      <div></div>
      <div
        style={{
          transform: "translate(-50%, -50%)",
        }}
        className={`  duration-300  left-[50%] flex fixed    px-1 py-4   h-[90%] w-[95%]  pt-3   flex-col item-center md:w-[80%] bg-white rounded-xl `}
      >
        <form
          onSubmit={savePlace}
          className="      h-full overflow-auto    w-full    "
        >
          <div className=" flex-grow w-full flex flex-col gap-3  p-7 ">
            <h1>Title</h1>
            <p className=" text-gray-500 text-xs">
              Title for your place should be short and catchy as in advertisment
            </p>
            <input
              className="  h-12  w-full rounded-lg px-3 bg-slate-100"
              type="text"
              placeholder=" Title "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <h1>Address</h1>
            <p className=" text-gray-500 text-xs">Address to your place</p>
            <input
              className="  h-12 w-full rounded-lg px-3 bg-slate-100"
              type="text"
              placeholder=" Address "
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <h1>Photos</h1>
            <p className=" text-gray-500 text-xs">More Photos More batter</p>
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
                className="   font-medium   justify-center flex flex-row items-center gap-2  w-[15%]  rounded-lg  text-xs md:text-sm bg-gray-200"
              >
                Add Photo
              </button>
            </div>
            <div className=" mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {addedPhotos?.length > 0 &&
                addedPhotos.map((pic) => (
                  <div className=" relative gap-2">
                    <div className=" flex  px-6 justify-between absolute bottom-2 w-full">
                      <button onClick={() => deletphoto(pic)}>
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
                      <button onClick={() => moveToFirst(pic)}>
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
                      src={` http://localhost:4000/uploads/${pic}  `}
                      alt=""
                    />
                  </div>
                ))}

              <label
                className=" cursor-pointer p-4 py-6 rounded-xl border-2 border-solid flex justify-center items-center"
                htmlFor="fileup"
              >
                {" "}
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
                  type="file"
                  className=" hidden z-20 "
                  onChange={uploadphoto}
                  name=""
                  id="fileup"
                  multiple
                />
              </label>
            </div>

            <h1>Descriptoin</h1>
            <p className=" text-gray-500 text-xs">Descripton of the place</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=" border-2 border-solid rounded-xl w-full h-[100px]"
            />

            <h1>Perks</h1>
            <p className=" text-gray-500 text-xs">Select all your Perks</p>

            <div className="   gap-3 w-full   grid  grid-cols-2  md:grid-cols-4 lg:grid-cols-6 justify-between ">
              <Perks selected={perks} onChange={setPerks} />
            </div>

            <Category
              deletecategory={deletecategory}
              handleChange={handleChange}
              options={options}
              setSelectedValue={setCategory}
              selectedValue={category}
            />

            <h1>Extra Info</h1>
            <p className=" text-gray-500 text-xs">house rouls, etc</p>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              className="   border-solid border-2 px-2 rounded-xl w-full h-[100px]"
            />

            <div className=" "></div>
            <h1>Check in&out times</h1>
            <p className=" text-gray-500 text-xs">house rouls, etc</p>
            <div className=" grid  gap-4   grid-cols-2  md:grid-cols-4">
              <div>
                <h3 className=" text-[9px] md:text-lg mt-3">Check in time</h3>
                <input
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  type="text"
                  className=" w-full h-12  border-solid border-2 rounded-lg"
                />
              </div>
              <div>
                <h3 className=" text-[9px] md:text-lg mt-3">Check out time</h3>
                <input
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  type="text"
                  className=" w-full h-12  border-solid border-2 rounded-lg"
                />
              </div>
              <div>
                <h3 className=" text-[9px] md:text-lg mt-3">
                  {" "}
                  Max number of guests
                </h3>
                <input
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  type="text"
                  className=" w-full h-12  border-solid border-2 rounded-lg"
                />
              </div>

              <div>
                <h3 className=" text-[9px] md:text-lg mt-3">
                  {" "}
                  Price per night{" "}
                </h3>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  className=" w-full h-12  border-solid border-2 rounded-lg"
                />
              </div>
            </div>

            <div className=" w-full flex justify-center items-center">
              <button className="w-[90%] h-12 bg-gray-300  rounded-lg ">
                {" "}
                {link ? "Save the Changes" : "Save"}{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
      <HousingMassge msg={msg} setMsg={setMsg} />
    </div>
  );
}

export default NewAccommodation;
