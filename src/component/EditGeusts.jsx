import React from 'react'
import Gestes from './Gestes'

function EditGeusts({open , setOpen , handelsetdata , handelCancel ,Gdata , maxgeustes , incrementGuests ,dicrementGuests }) {
  return (
    <div
    className={` duration-300  ${
      !open ? "top-[50%]" : "top-[-100%] "
    }  flex  z-50 fixed h-full w-full relateve `}
  >
    <div
      onClick={() => setOpen(!open)}
      className={`  flex  fixed h-full w-full absulet ${
        !open ? " opacity-50 top-0  " : "opacity-0  top-[-100%]   "
      }  right-0 bg-black `}
    ></div>

    <div
       
      className={`  duration-300  ${
        open ? "  md:top-[-100%] bottom-[-100%] " : "  bottom-0 md:top-[50%] "
      }   duration-300    transform  md:translate-x-[-50%]  md:translate-y-[-50%]   left-0   md:left-[50%]    flex fixed    h-[360px] w-full  md:w-[30%]  pt-3   flex-col item-center   bg-white rounded-xl `}
    >
      <div className=" h-16 w-full absolute top-0   flex flex-col justify-between items-start px-3 pt-5   right-0">
        <span
          onClick={() => setOpen(!open)}
          className=" cursor-pointer absolute top-1 left-2   "
        >
          x
        </span>
        <h1 className=" text-2xl   pt-5   text-gray-900 font-semibold">
          Gests
        </h1>
      </div>
      <div className="   border-solid border-t-[1px] items-center h-16 w-full flex flex-row justify-between px-5 absolute bottom-0  z-    right-0">
       
      <button onClick={ handelCancel} className=" border-[1px] border-solid  px-8 rounded-lg p-2">
          Cancel
        </button>
        <button className="  text-white bg-[#578280]  px-8 rounded-lg p-2"  onClick={handelsetdata}>
          Save
        </button>
   
      </div>
      <div className=" w-full flex gap-4 flex-col items-center justify-center px-6 h-full ">
        {Gdata.map((item) => (
          <Gestes
            onClick={incrementGuests} // Fix the function name here
            dicrementGuests={dicrementGuests}
            Geust={item.value} // Change this to item.value
            title={item.title}
            name={item.title}
            desc={item.desc}
            maxGuests={maxgeustes}
          />
        ))}
      </div>
    </div>
  </div>
  )
}

export default EditGeusts