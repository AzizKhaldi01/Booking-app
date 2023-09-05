import React from 'react'

function Amenities({name , id , value , addtoFilter}) {
  return (
    <div className='    h-14 flex flex-row gap-2 text-base '>
      
 <input    onChange={ addtoFilter } style={{ backgroundColor: 'black', border: '1px solid black' }} className='    h-6 w-6 ' type="checkbox" name={name} id={id} value={value} />  {name}
    </div>
  )
}

export default Amenities