import React, { useState } from 'react';

const Category = ({options , selectedValue , handleChange , deletecategory}) => {
 
    if (!selectedValue) {
        selectedValue = []; // Initialize selectedValue as an empty array
      }
  return (
    <div>
      <h2>Select a Category:</h2>
      <select value={selectedValue}  onChange={(e) => handleChange(e.target.value)}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option  key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <p className='   flex flex-row gap-3' > {selectedValue.map((caty)=>(
        <p className='  text-white bg-gray-800 rounded-full    flex justify-between gap-5  px-2   '    > 

        {caty}
       <span onClick={(e) => deletecategory(caty)} className=' cursor-pointer   text-white top-0 right-0 '>x</span>
         </p>
      ) ) }    </p>
    </div>
  );
};

export default Category;
