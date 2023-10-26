import { React, useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Usercontext } from "../context/pagecontext";
import Favskelaton from "./Skelatons/Favskelaton";
import Topbar from "./Topbar";

import axios from "axios";
function Wishlist({ Popen }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const { User, ready , LoginOpen, setLoginOpen  } = useContext(Usercontext);

  useEffect(() => {
    axios.get("/get-favorite").then((response) => {
      const { data } = response;
      setData(data);
      setLoading(false);
    });
  }, [User]);



  return (
    <>
      {User && ready ? (
        
        <div className="  flex flex-col  md:pb-2 pb-20 pt-16 w-full h-full  justify-center px-3  md:px-12">
          <Topbar  title={"My Wishlist"} />
          <div
            className={` w-full   grid md:grid-cols-2 grid-cols-1 gap-3  ${
              !Popen ? " lg:grid-cols-3" : "lg:grid-cols-4"
            }  `}
          >
            {loading ? (
              <Favskelaton cards={6} />
            ) : (
              data?.map((item) => (
                <Link
                  to={`/placedetails/${item?.Place?._id}`}
                  className=" flex flex-row gap-2 w-full    p-2  cursor-pointer h-[200px]   "
                >
                  <img
                    className="  h-full  w-[60%] rounded-l-3xl object-cover  "
                    src={` http://192.168.1.7:4000/uploads/${item?.Place.photos[0]}`}
                    alt=""
                  />

                  <div className=" gap-2 flex flex-col  w-[40%] ">
                    <div
                      className=" rounded-tr-3xl"
                      style={{
                        backgroundImage: `url(${` http://192.168.1.7:4000/uploads/${item?.Place.photos[1]}`})`,
                        backgroundSize: "cover", // You can adjust this to 'contain' or other values as needed
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        height: "100vh",
                      }}
                    ></div>

                    <div
                      className=" rounded-br-3xl"
                      style={{
                        backgroundImage: `url(${` http://192.168.1.7:4000/uploads/${item?.Place.photos[0]}`})`,
                        backgroundSize: "cover", // You can adjust this to 'contain' or other values as needed
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        height: "100vh",
                      }}
                    ></div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className=" w-full h-full  flex flex-col items-start gap-1 pt-20  md:pt-14 px-6  md:px-20 ">
          <h1 className=" text-5xl font-medium">Wishlists</h1>
          <p className=" text-2xl pt-5">Log in to view your wishlists</p>
          <p className=" text-gray-500 pt-2 text-sm">
            You can create, view, or edit wishlists once you’ve logged in.
          </p>
          
            <button onClick={ ()=>  setLoginOpen(!LoginOpen)} className=" px-6 p-3 bg-main rounded-lg text-white  font-medium">
              Login
            </button>
        
        </div>
      )}
    </>
  );
}

export default Wishlist;
