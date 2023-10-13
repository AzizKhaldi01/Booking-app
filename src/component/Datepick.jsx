import React from 'react'

function Datepick({daysStayed,Aopen ,formattedCheckInDate ,handleCheckInChange ,handleCheckOutChange,formattedCheckOutDate}) {
  return (
    <div className=" flex   gap-1 p-2 justify-between flex-row w-full px-2">
    <div className="relative w-full ">
      {Aopen && (
        <span className="absolute top-3 left-3 transform -translate-y-1/2 text-[10px]  text-gray-500">
          CHECK-IN
        </span>
      )}
      <input
        className={`h-14 cursor-pointer  w-full  bg-white px-2 border-[2px] border-solid rounded-lg   ${
          !Aopen ? "hidden" : "flex"
        }`}
        type="date"
        id="dateInput"
        value={formattedCheckInDate}
        onChange={handleCheckInChange}
        name="dateInput"
      />
    </div>
    <div className="relative w-full">
      {Aopen && (
        <span className="absolute top-3 left-3  transform -translate-y-1/2 text-[10px] text-gray-500">
          CHECKOUT
        </span>
      )}
      <input
        className={`h-14  cursor-pointer px-2  bg-white  w-full  border-[2px] border-solid rounded-lg     ${
          !Aopen ? "hidden" : "flex"
        }`}
        type="date"
        onChange={handleCheckOutChange}
        min={formattedCheckInDate}
        value={
          daysStayed <= 0
            ? "Select the Check Out date"
            : formattedCheckOutDate
        }
        id="dateInput"
        name="dateInput"
      />
    </div>
  </div>
  )
}

export default Datepick