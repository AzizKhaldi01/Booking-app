import axios  from 'axios'
 
 
import React, { useEffect , useContext, useState } from 'react'
 
import { useParams } from 'react-router-dom'

function BookedPlaceDetails() {
 

const {_id} = useParams()
const [data , setData]= useState(null)

useEffect(()=>{

axios.get('/get-bookingDetails/' + _id ).then((response)=> {

    const  {data}  = response;
    setData(data);
 })

},[])


  return (
    <div className='  mt-52 '> 
 
    </div>
  )
}

export default BookedPlaceDetails