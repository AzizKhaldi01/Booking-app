import {React , useEffect} from 'react'
import axios from 'axios'
function Wishlist() {


useEffect(()=>{

  axios.get('/get-favorite').then((response) =>{
    const {data} = response;
    console.log(data)
  } )
}, [] )

  return (
    <div>
      
    </div>
  )
}

export default Wishlist