import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import { Link, Navigate } from "react-router-dom";
import { Usercontext } from "../context/pagecontext";
import { useContext } from "react";
import google from "../img/google.png";
import axios from "axios";
import HousingMassge from "../component/HousingMassge";
function Login({ setIsLogin, IsLogin, setLoginOpen,LoginOpen,    isLoading,setisLoading }) {
  const { setUser } = useContext(Usercontext);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState({ text: "", color: "" });
 

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      setMsg(  {text: 'Login Success! You can log in now'   , color:'text-main border-main bg-green-100'} );

      
    } catch (e) {
      setMsg(  {text: 'Login Failed'   , color:'text-red-500 border-red-500 bg-red-200'} );
        
    }
  };

 

  return (
    <>
    <form
      onSubmit={loginUser}
      className=" flex flex-col w-full h-full items-center justify-center gap-2  "
    >
      <div className=" absolute top-0 w-full   border-solid border-b-[1px] flex items-center h-16 rounded-t-xl justify-center right-0 bg-white  text-4xl  ">
        <span
          onClick={() => setLoginOpen(!LoginOpen)}
          className=" absolute top-2 left-4 cursor-pointer"
        >
          {" "}
          <CloseIcon />{" "}
        </span>
        <h className=" text-xl">Login</h>
      </div>

      <div className="   gap-5 flex flex-col    w-full px-3 md:w-[90%]  ">
        <input
          value={email}
          id="email"
          onChange={(ev) => setEmail(ev.target.value)}
          className={`    h-12  w-full   px-3  rounded-xl  border-solid border-[1px]   `}
          placeholder="Email"
          type="Email"
        />
        <input
          value={password}
          id="email"
          onChange={(ev) => setPassword(ev.target.value)}
          className={`   h-12  w-full   px-3  rounded-xl  border-solid border-[1px]   `}
          placeholder="Password"
          type="password"
        /> 
         <button
                  type="submit"
                  onClick={() => setisLoading(true)}
                  className=" relative h-12    w-full rounded-lg bg-main   text-white     bg-lightColor "
                >
                  {" "}
                  Login{" "}
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
          Register
        </button>
        <button className=" w-full h-12 border-solid border-[1px] text-gray-800   rounded-lg flex flex-row gap-2 justify-center items-center">
          <img className=" w-[20px] " src={google} />
          Login With Google
        </button>
      </div>
     
    </form>
 <HousingMassge msg={msg}   setMsg={setMsg} />
</>

  );
}

export default Login;
