import axios from "axios";

import {  createContext, useEffect, useState   } from "react";
 import { useParams } from "react-router-dom";
export const  Usercontext = createContext();


const Userprovider = ({children})=>{
 
 const [User , setUser] = useState(null)
   const [ready , setReady] = useState(false)
 const [add , setAdd]= useState(false);
 const [ reload , setReload] = useState(false)
 const [link , setLink]= useState('');
 const [placesdata, setPlacedata] = useState(null)

 const [places, setPlaces] = useState([]);

 useEffect(() => {
   axios.get("/user-places").then(({ data }) => {
    const reversedData = data.reverse();
     setPlaces(data);
   });
 }, [ reload]);
 

 useEffect(() => {
  if (!link) {
    return; // If 'link' is falsy, don't make the API call
  }

  try {
    axios.get('/places/' + link).then((response) => {
      const { data } = response;
      setPlacedata(data);
    });
  } catch (error) {
    // Handle error if needed
  }
}, [link]);


  useEffect(  ()=>{
    if(!User){
           axios.get('http://localhost:4000/profile',).then(({data})=>{
            setUser(data)
             setReady(true)
           })
          
    }
  },[])
  

    return( 
        <Usercontext.Provider  value={{ setPlaces,places, link,  setLink, setUser, User ,ready ,setAdd,add ,placesdata,setPlacedata , reload , setReload}}>
{children}

        </Usercontext.Provider>
    )
}
export default Userprovider;