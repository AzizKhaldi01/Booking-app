import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Usercontext } from "../context/pagecontext";
import { RegistrSchema } from "../Validation/RegistrationValidation";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from "formik";

function Registrer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Dopen, setDopen] = useState(false);
  const [IsLogin, setIsLogin] = useState(true);

  const { setUser } = useContext(Usercontext);

  const [redirect, setRedirect] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      alert("Login Success! You can log in now.");
      setRedirect(true);
    } catch (e) {
      alert("Login Failed");
    }
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
      firtsname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: RegistrSchema,
    onSubmit,
  });

  // Make an API call to your Node.js server

  async function onSubmit() {
    try {
      const response = await axios.post("/Registre", {
        ...values,
      });
      alert("Registration Seccsses u can log in now ");
      console.log(response.data); // Assuming the server returns the created user data
    } catch (error) {}
  }
  return (
    <div className=" h-full w-full flex justify-center items-center ">
      <div
        className={` duration-300  ${
          !Dopen ? "top-[50%]" : " top-[-100%] "
        }  flex  z-50 fixed h-full w-full relateve `}
      >
        <div
          onClick={() => setDopen(!Dopen)}
          className={`  flex  fixed h-full w-full absulet ${
            !Dopen ? " opacity-50 top-0  " : "opacity-0  top-[-100%]   "
          }  right-0 bg-black `}
        ></div>

        <div
          className={` ${
            Dopen
              ? "  md:top-[-100%] bottom-[-100%] "
              : "  bottom-0 md:top-[50%] "
          }   duration-300     transform  md:translate-x-[-50%]  md:translate-y-[-50%]   left-0   md:left-[50%] flex fixed   h-[92%]  md:h-[80%]   lg:w-[66%]  xl:w-[40%]   w-full  md:w-[90%]  pt-3   flex-col item-center  justify-center   bg-white rounded-xl `}
        >
          <form
            onSubmit={onSubmit}
            className=" flex flex-col w-full pt-28  overflow-auto   h-full items-center justify-center gap-2 first-letter:"
          >
            <div className=" absolute top-0 w-full flex items-center h-16 rounded-t-xl justify-center right-0 bg-white  text-4xl  ">
            <span onClick={() => setDopen(!Dopen)} className=" absolute top-2 left-4 cursor-pointer"> <CloseIcon/> </span>
              <h className=' text-xl' >Register</h>
               </div>
            <div className=" w-full h-full flex flex-col justify-center items-center gap-3    ">
              <div className="   gap-3 flex flex-row    w-full px-3 md:w-[90%]  ">
                <div className=" flex flex-col gap-1  w-full  md:w-[90%]">
                  <input
                    value={values.firtsname}
                    id="firtsname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={` ${
                      errors.firtsname && touched.firtsname
                        ? " border-[#fc8181] text-red-500  border-[2px]"
                        : ""
                    }  h-12   px-2  w-full   rounded-xl   border-solid border-[1px]   `}
                    placeholder="FirstName"
                    type="text"
                  />
                  {errors.firtsname && touched.firtsname && (
                    <p className=" pt-1 px-1 text-xs text-red-400">
                      {" "}
                      {errors.firtsname}{" "}
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
                  onChange={handleChange}
                  className={` ${
                    errors.email && touched.email
                      ? " border-[#fc8181] text-red-500  border-[2px]"
                      : ""
                  }   h-12  w-full   px-3  rounded-xl  border-solid border-[1px]   `}
                  placeholder="Email"
                  type="Email"
                />
                {errors.email && touched.email && (
                  <p className=" pt-1 px-1 text-xs text-red-400">
                    {" "}
                    {errors.email}{" "}
                  </p>
                )}
              </div>

              <div className=" flex flex-col gap-1  w-full px-3 md:w-[90%]   ">
                {" "}
                <input
                  value={values.password}
                  id="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`  ${
                    errors.password && touched.password
                      ? " border-[#fc8181] text-red-500  border-[2px]"
                      : ""
                  }   h-12  w-full  mt-3   px-3  rounded-xl  border-solid border-[1px]   `}
                  placeholder="Password"
                  type="Password"
                />
                {errors.password && touched.password && (
                  <p className=" pt-1 px-1 text-xs text-red-400">
                    {" "}
                    {errors.password}{" "}
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
                  }   h-12  w-full  mt-3   px-3  rounded-xl   border-solid border-[1px]   `}
                  placeholder="Confirm Password"
                  type="Password"
                />

                {errors.confirmpassword && touched.confirmpassword && (
                  <p className=" pt-1 px-1 text-xs text-red-400">
                    {" "}
                    {errors.confirmpassword}{" "}
                  </p>
                )}
              </div>

              <div className=" flex gap-2 w-full    flex-col">
                <button className=" h-10  w-full rounded-lg   font-semibold bg-lightColor ">
                  {" "}
                  Register{" "}
                </button>
                <button className=" h-10  w-full  rounded-lg  flex flex-row items-center text-white   justify-center gap-3  font-semibold  bg-darckColor ">
                  {" "}
                  <GoogleIcon /> Register With Google{" "}
                </button>
              </div>

              <div className=" text-sm items-center justify-center mt-2  gap-2 flex-row flex  w-full   md:w-[50%]">
                <div className=" text-gray-400 "> Allready a member? </div>
                <Link to="/Login">
                  <div className=" font-semibold underline cursor-pointer">
                    Login now{" "}
                  </div>{" "}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registrer;
