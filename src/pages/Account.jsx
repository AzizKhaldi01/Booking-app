import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Usercontext } from "../context/pagecontext";
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Bookings from "../component/Bookings";
import Wishlist from "../component/Wishlist";
import Accommodation from "../component/Accommodation";
import NewAccommodation from "../component/NewAccommodation";
import Carteskelaton from "../component/Carteskelaton";
<<<<<<< HEAD
import AddIcon from '@mui/icons-material/Add';
import { motion, AnimatePresence } from 'framer-motion';

function Account() {
  const navigate = useNavigate();
  const { User, ready, setUser, add, setAdd, setPlacedata, setLink , reload ,setReload ,setPlaces ,places} =
=======

function Account() {
  const navigate = useNavigate();
  const { User, ready, setUser, add, setAdd, setPlacedata, setLink } =
>>>>>>> origin/main
    useContext(Usercontext);

  const { subpages } = useParams(null);
  const [redirect, setRedirect] = useState(null);
<<<<<<< HEAD

=======
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
>>>>>>> origin/main

  if (ready && !User) {
    return <Navigate to={"/login"} />;
  }

  function btntheme(type = null) {
    let clases = "py-2 h-10       h-full";
    if (subpages === type || (subpages === undefined && type === "profile")) {
      return clases + " border-solide    border-red-500 border-b-2  ";
    } else {
      return clases;
    }
  }

  async function logout() {
    await axios.post("/logout");
    navigate("/");

    setUser(null);
  }

  function addnewplace() {
    navigate("/account/accommodation/");
    setLink("");
    setPlacedata(null);
    setAdd(!add);
<<<<<<< HEAD
    
=======
>>>>>>> origin/main
  }

  return (
    <div className=" w-full flex  flex-col md:flex-row h-full     mt-24 md:mt-32 justify-between">
      <div className="flex   flex-col h-full justify-center   w-full item-center">
        <nav className="  z-20 px-2 md:px-20  top-20  bg-white sticky border-solide    border-b-2      text-base md:text-lg  flex flex-rox item-center justify-between  gap-2 md:gap-20   w-full ">
          <Link className={btntheme("Wishlist")} to={"/account/Wishlist"}>
            {" "}
            Wishlist
          </Link>
          <Link className={btntheme("bookings")} to={"/account/bookings"}>
            {" "}
            Bookings
          </Link>
          <Link
            className={btntheme("accommodation")}
            to={"/account/accommodation"}
          >
            Accommodation
          </Link>
        </nav>
        {subpages === "Wishlist" && <Wishlist />}
        {subpages === "bookings" && <Bookings />}
        {subpages === "accommodation" && (
          <div className=" flex flex-col item-center w-full justify-center  ">
           
            <div className=" w-full h-20  pt-3  cursor-pointer flex justify-center   item-center ">
              <div
                onClick={addnewplace}
<<<<<<< HEAD
                className="  text-white flex items-center justify-center w-[50%] h-full  rounded-xl  bg-[#578280]  "
              >
              <AddIcon fontSize="large"/>
=======
                className=" w-[50%] h-full  rounded-xl bg-green-200  "
              >
                {" "}
>>>>>>> origin/main
              </div>
            </div>
           
            <div className="  mx-3  gap-5  grid   pt-5   grid-cols-1 lg:grid-cols-2  h-full ">
           
<<<<<<< HEAD


            <AnimatePresence>
    
 
=======
>>>>>>> origin/main
              {places?.map((i) => (
                
                <Accommodation
                  key={i.id}
                  id={i._id}
                  address={i.address}
                  photos={i.photos}
                  title={i.title}
                  description={i.description}
                />
                
              ))}

<<<<<<< HEAD
            
        </AnimatePresence>
            
=======
>>>>>>> origin/main
              <div className=" ">  </div>
            </div>
          </div>
        )}
      </div>
      <NewAccommodation setAdd={setAdd} add={add} />
    </div>
  );
}

export default Account;
