import React from 'react'
import paypalsvg from "../img/paypal.svg";
function PaypalPay() {
  return (
    <div className=" w-full h-full flex flex-col gap-4">
    <h1 className=" text-lg  text-gray-700 font-light">
      Log in to use PayPal{" "}
    </h1>
    <button className="  w-36 flex flex-row p-2 px-6  hover:opacity-90 bg-blue-400 rounded-lg text-xl text-white items-center justify-center gap-2">
      <img className=" w-[35px] " src={paypalsvg} alt="" />
      PayPal
    </button>
  </div>
  )
}

export default PaypalPay