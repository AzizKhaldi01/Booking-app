import React from "react";
import HousingMassge from "../component/HousingMassge";

import { useEffect, useState, useContext } from "react";
import google from "../img/google.png";
import { Usercontext } from "../context/pagecontext";
import { RegistrSchema } from "../Validation/RegistrationValidation";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import Login from "./Login";

function LoginOrRegistrer() {

  const [msg, setMsg] = useState({ text: "", color: "" });
  const [emsg, setEMsg] = useState("");

  const [isLoading, setisLoading] = useState(true);

  const { setUser, IsLogin, setIsLogin ,LoginOpen, setLoginOpen } = useContext(Usercontext);

  const [redirect, setRedirect] = useState("");

  const handleInputFocus = () => {
    setEMsg("");
  };

  const {
    values,
    handleBlur,
    errors,
    setTouched,
    touched,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: RegistrSchema,
    onSubmit,
  });

  // Make an API call to your Node.js server

  function onSubmit() {
    axios
      .post("/Registre", {
        ...values,
      })
      .then((response) => {
        setMsg({
          text: "account created successfully",
          color: "text-main border-main bg-green-100",
        });
        setLoginOpen(false);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            console.log("Client Error:", error.response.data.message);
            setEMsg(error.response.data.message);
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

  return (
    <div className=" h-full w-full flex justify-center items-center ">
      <HousingMassge msg={msg} setMsg={setMsg} />

      <div
        className={` duration-300  ${
          !LoginOpen ? "top-[50%]" : " top-[-100%] "
        }  flex  z-[120] fixed h-full w-full relateve `}
      >
        <div
          onClick={() => setLoginOpen(!LoginOpen)}
          className={`  flex  fixed h-full w-full absulet ${
            !LoginOpen ? " opacity-50 top-0  " : "opacity-0  top-[-100%]   "
          }  right-0 bg-black `}
        ></div>

        <div
          className={` ${
            LoginOpen
              ? "  md:top-[-100%] bottom-[-100%] "
              : "  bottom-0 md:top-[50%] "
          }   duration-300     transform pt-16  pb-3   md:translate-x-[-50%] md:translate-y-[-50%]   left-0   md:left-[50%] flex fixed     ${
            !IsLogin ? "h-[60%]  md:h-[70%]" : "h-[85%]  md:h-[90%]"
          }   lg:w-[66%]  xl:w-[40%]   w-full  md:w-[90%]     flex-col item-center  justify-center md:rounded-b-xl   rounded-b-none   bg-white rounded-xl `}
        >
          {IsLogin ? (
            <form
              onSubmit={handleSubmit}
              className=" flex flex-col w-full  pt-0  md:pt-32  pb-10 flex-grow   overflow-auto     h-full items-center justify-center   "
            >
              <div className=" absolute top-0 w-full   border-solid border-b-[1px] flex items-center h-16 rounded-t-xl justify-center right-0 bg-white  text-4xl  ">
                <span
                  onClick={() => setLoginOpen(!LoginOpen)}
                  className=" absolute top-2 left-4 cursor-pointer"
                >
                  {" "}
                  <CloseIcon />{" "}
                </span>
                <h className=" text-xl">Register</h>
              </div>
              <div className="   w-full h-full flex flex-col justify-center items-center gap-5          ">
                <div className="   gap-2 flex flex-row    w-full px-3 md:w-[90%]  ">
                  <div className=" flex flex-col gap-1  w-full  md:w-[90%]">
                    <input
                      value={values.firstname}
                      id="firstname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className={` ${
                        errors.firstname && touched.firstname
                          ? " border-[#fc8181] text-red-500  border-[2px]"
                          : ""
                      }  h-12   px-2  w-full   rounded-xl   border-solid border-[1px] `}
                      placeholder="FirstName"
                      type="text"
                    />
                    {errors.firstname && touched.firstname && (
                      <p className=" pt-1 px-1 text-xs text-red-400">
                        {" "}
                        {errors.firstname}{" "}
                      </p>
                    )}
                  </div>
                  <div className=" flex flex-col gap-1  w-full  md:w-[90%]">
                    <input
                      value={values.lastname}
                      id="lastname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className={` ${
                        errors.lastname && touched.lastname
                          ? " border-[#fc8181] text-red-500  border-[2px]"
                          : ""
                      }  h-12    px-2  w-full    rounded-xl   border-solid border-[1px]   `}
                      placeholder="LastName"
                      type="text"
                    />
                    {errors.lastname && touched.lastname && (
                      <p className=" pt-1 px-1 text-xs text-red-400">
                        {" "}
                        {errors.lastname}{" "}
                      </p>
                    )}
                  </div>
                </div>
                <div className=" flex flex-col gap-1  w-full px-3 md:w-[90%]  ">
                  {" "}
                  <input
                    value={values.email}
                    id="email"
                    onBlur={handleBlur}
                    onFocus={handleInputFocus}
                    onChange={handleChange}
                    className={` ${
                      (errors.email && touched.email) ||
                      emsg == "This Email Is Already Used , Try Another Email"
                        ? " border-[#fc8181] text-red-500  border-[2px]"
                        : ""
                    }   h-12  w-full   px-3  rounded-xl  border-solid border-[1px]   `}
                    placeholder="Email"
                    type="Email"
                  />
                  {emsg == "This Email Is Already Used , Try Another Email" && (
                    <p className=" pt-1 px-1 text-xs text-red-400">{emsg}</p>
                  )}
                  {errors.email && touched.email && (
                    <p className=" pt-1 px-1 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className=" flex flex-col gap-1  w-full px-3 md:w-[90%] ">
                  <input
                    value={values.password}
                    id="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={`  ${
                      errors.password && touched.password
                        ? " border-[#fc8181] text-red-500  border-[2px]"
                        : ""
                    }   h-12  w-full      px-3  rounded-xl  border-solid border-[1px]   `}
                    placeholder="Password"
                    type="Password"
                  />
                  {errors.password && touched.password && (
                    <p className=" pt-1 px-1 text-xs text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className=" flex flex-col gap-1  w-full px-3 md:w-[90%]">
                  <input
                    value={values.confirmpassword}
                    onBlur={handleBlur}
                    id="confirmpassword"
                    onChange={handleChange}
                    className={`  ${
                      errors.confirmpassword && touched.confirmpassword
                        ? " border-[#fc8181] text-red-500  border-[2px]"
                        : ""
                    }   h-12  w-full px-3  rounded-xl   border-solid border-[1px]   `}
                    placeholder="Confirm Password"
                    type="Password"
                  />
                  {errors.confirmpassword && touched.confirmpassword && (
                    <p className=" pt-1 px-1 text-xs text-red-400">
                      {errors.confirmpassword}
                    </p>
                  )}
                </div>

                <div className=" flex gap-2 w-full  md:px-0  px-3  items-center flex-col">
                  <button
                    type="submit"
                    onClick={() => setisLoading(true)}
                    className=" relative h-12  w-full rounded-lg bg-main   text-white  md:w-[85%]   bg-lightColor "
                  >
                    {" "}
                    Register{" "}
                    <span
                      className={` ${
                        !isLoading ? " opacity-100 " : " opacity-0"
                      } bg-greedian   absolute top-0 right-0 bg-main rounded-lg duration-200 h-full w-full flex items-center justify-center   `}
                    >
                      <span className=" h-full w-full scale-[0.2]  md:scale-[0.18] flex items-center justify-center">
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

                <span className="  md:w-[85%] px-3 md:px-0   w-full flex flex-row  justify-center items-center gap-1  opacity-50">
                  <span className=" w-full bg-gray-700 h-[1px] "> </span>
                  or
                  <span className=" w-full bg-gray-700 h-[1px] "> </span>
                </span>

                <div className=" md:w-[90%]  px-3 w-full flex flex-col gap-4">
                  <button
                    onClick={(e) => {
                      setIsLogin(!IsLogin);
                      e.preventDefault();
                    }}
                    className=" w-full h-12 text-main  border-solid border-main border-[1px]  rounded-lg"
                  >
                    Login
                  </button>
                  <button className=" w-full h-12 border-solid border-[1px] text-gray-800   rounded-lg flex flex-row gap-2 justify-center items-center">
                    <img className=" w-[20px] " src={google} />
                    Login With Google
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <Login
              setIsLogin={setIsLogin}
              IsLogin={IsLogin}
              setLoginOpen={setLoginOpen}
              LoginOpen={LoginOpen}
              isLoading={isLoading}
              setisLoading={setisLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginOrRegistrer;
