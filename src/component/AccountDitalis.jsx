import { React, useState, useEffect } from "react";
import { useContext } from "react";
import { Usercontext } from "../context/pagecontext";
import userimage from "../img/user.webp";

import axios from "axios";
import AccountMassge from "./AccountMassge";

function AccountDitalis(  {setisAccountD}) {
  const { User, ready, Saved, setSaved } = useContext(Usercontext);

  const [FirstName, setFirtsName] = useState(null);
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Update, setUpdate] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [Msg, setMsg] = useState("");

  useEffect(() => {
    if (Msg !== "" && Msg !== "emailexist") {
      const timer = setTimeout(() => {
        setMsg("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [Msg]);

  console.log(Msg);

  useEffect(() => {
    if (User && ready) {
      setFirtsName(User.firstname || ""); // Use '' as the default value if User.firstname is null or undefined
      setLastName(User.lastname || ""); // Use '' as the default value if User.lastname is null or undefined
      setEmail(User.email || ""); // Use '' as the default value if User.email is null or undefined
    }
  }, [User, Update]);

  function handelupdate() {
    setUpdate(!Update);
  }

  function handelChangeFirstName(e) {
    setFirtsName(e.target.value);
  }

  function handelChangeLastName(e) {
    setLastName(e.target.value);
  }

  function handelChangeEmail(e) {
    setMsg("");
    setEmail(e.target.value);
  }

  if (!User || !ready) {
    return <div>Loading...</div>;
  }

  function handelUpdateProfile(e) {
    setisLoading(true);
    e.preventDefault();
    axios
      .post("/updateprofile", { FirstName, LastName, Email })
      .then((response) => {
        const { message } = response.data;

        setisLoading(false);
        if (message == "saved") {
          setMsg("saved");
          setUpdate(false);
          setSaved(!Saved);
        } else if (message == "emailexist") {
          setMsg("emailexist");
        } else if (message == "maxChar") {
          alert("Max Char is 35 char");
        } else if (message == "Invalid email format") {
          alert("Invalid email format");
          setMsg("Invalid email format");
        }
      });
  }

  console.log(Msg);

  return (
    <form
      onSubmit={handelUpdateProfile}
      className={`   relative    flex-col mt-16  w-full h-7  gap-10  px-3  md:px-10 mb-20 `} 
    >
      <div className=" flex flex-row items-center pr-0  md:pr-5 gap-4 justify-between w-full">
        <div className=" flex flex-row gap-3  md:gap-5 items-center py-5 ">
          <img
            className=" p-2    w-[80px]  md:w-[100px]   bg-gray-100  rounded-[50%] "
            src={userimage}
          />
          <span className=" flex flex-col gap-2">
            <h1 className="  text-sm font-medium text-gray-900">
              Profile Pictures
            </h1>
            <p className=" text-gray-600 text-xs">
              PNG,JPG,GIF max size of 5MB
            </p>
          </span>
        </div>


        <div className=  {`      sm:hidden text-gray-700 flex text-base  z-50  h-16 items-center justify-center  fixed bg-white top-0  right-0  w-full `}>
        <span className=" cursor-pointer  absolute top-5 left-3" onClick={(e)=>  {e.preventDefault(); setisAccountD(false)   } }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        Account information 
      </div>

        {Update ? (
          <div className=" flex flex-row items-center gap-2">
            <button
              onClick={() => {
                setUpdate(false);
                setMsg("");
              }}
              className="   text-main  p-2 px-3 border-solid border-[1px] border-main rounded"
            >
              x
            </button>
            <button className=" bg-main  p-2 px-3 text-white rounded relative">
              Save
              <span
                className={` ${
                  isLoading ? " opacity-100 " : " opacity-0"
                } bg-greedian   absolute top-0 right-0 bg-main rounded-lg duration-200 h-full w-full flex items-center justify-center   `}
              >
                <span className=" h-full w-full  scale-[0.7] flex items-center justify-center">
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
            </button>
          </div>
        ) : (
          <button
            onClick={handelupdate}
            className=" bg-main p-2  md:text-base text-sm md:p-2  px-2 md:px-3 rounded text-white"
          >
            Update Profile
          </button>
        )}
      </div>

      <div className=" relative flex flex-col w-full  items-center gap-6">
        <AccountMassge Msg={Msg} />
        <div className=" w-full flex flex-row gap-5">
          <span className=" flex flex-col w-full gap-3 items-start ">
            <label className="   px-2 text-sm text-gray-700" htmlFor="">
              First Name
            </label>
            <input
              disabled={!Update}
              className={`w-full h-12 ${
                Update
                  ? "  border-solid border-main border-[1px] "
                  : "bg-slate-50"
              }     rounded-md px-3 `}
              placeholder="First Name"
              onChange={handelChangeFirstName}
              type="text"
              value={FirstName}
            />
            {Msg === "maxChar" ? (
              <p className="px-2 text-xs text-red-500">Max Char is 35</p>
            ) : (
              ""
            )}
          </span>
          <span className=" flex flex-col  w-full gap-3 items-start">
            <label className="  px-2  text-sm text-gray-700" htmlFor="">
              Last Name
            </label>
            <input
              disabled={!Update}
              className={`w-full h-12 ${
                Update
                  ? "  border-solid border-main border-[1px] "
                  : "bg-slate-50"
              }     rounded-md px-3 `}
              placeholder="First Name"
              type="text"
              onChange={handelChangeLastName}
              value={LastName}
            />
          </span>
        </div>
        <span className=" flex flex-col  w-full gap-3 items-start">
          <label className="  px-2  text-sm text-gray-700" htmlFor="">
            Email Address
          </label>
          <input
            disabled={!Update}
            className={`w-full h-12 ${
              Update
                ? "  border-solid border-main border-[1px] "
                : "bg-slate-50"
            }  ${
              Msg == "emailexist" ? " border-red-500 " : ""
            }  rounded-md px-3 `}
            placeholder="First Name"
            type="text"
            onChange={handelChangeEmail}
            value={Email}
          />
          {Msg === "emailexist" ? (
            <p className="px-2 text-xs text-red-500">
              This email already exists.
            </p>
          ) : (
            ""
          )}
        </span>
        <span className=" flex flex-col  w-full gap-3 items-start">
          <label className=" px-2   text-sm text-gray-700" htmlFor="">
            Job
          </label>
          <input
            disabled={!Update}
            className={`w-full h-12 ${
              Update
                ? "  border-solid border-main border-[1px] "
                : "bg-slate-50"
            }   rounded-md px-3 `}
            placeholder="First Name"
            type="text"
            value={"Developer"}
          />
        </span>
      </div>

      <div className=" flex flex-row w-full  justify-between pb-7 font-medium pt-5 px-2">
        <span>Change Password</span>
        <button
        onClick={ (e)=>{e.preventDefault();} }
          disabled={!Update}
          className={`  text-gray-600  p-2 px-3 rounded  ${
            Update ? " border-solid border-[1px] border-main  text-main " : ""
          } `}
        >
          Change
        </button>
      </div>
    </form>
  );
}

export default AccountDitalis;
