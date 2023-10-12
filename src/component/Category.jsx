import React, { useState } from 'react';
import { filterdata } from "../component/Filterdata";
const Category = ({options , selectedValue , handleChange , deletecategory}) => {
 
    if (!selectedValue) {
        selectedValue = []; // Initialize selectedValue as an empty array
      }



 

  return (
    <div className=' flex flex-col gap-4 pt-5'>
      <h2>Select a Category:</h2>
      <select className=' h-9 bg-slate-100' value={selectedValue}  onChange={(e) => handleChange(e.target.value)}>
        <option value="">Select an option</option>
        {filterdata.map((option) => (
          <option className=' w-full flex flex-row'  key={option} value={option.text}>
            {option.text}
            <img className='    w-[31px] ' src={option.img}   />
          </option>
        ))}
      </select>
 
  <p className='    flex-row gap-1  flex flex-wrap' >
     { selectedValue != '' && 
        <p className='  text-gray-800 bg-gray-300 rounded-full     flex justify-between gap-5 p-1  px-2    '    > 
       <div className=' flex flex-row gap-1 items-end'>
      <img       className=' w-[25px] white-image ' src={filterdata.find((item) => item.text === selectedValue)?.img} alt="" />
        {selectedValue}  
       </div>

       <span onClick={(e) => deletecategory()} className=' cursor-pointer   text-gray-800 top-0 right-0 '>x</span>
         </p>
   }    </p>
    </div>
  );
};

export default Category;
