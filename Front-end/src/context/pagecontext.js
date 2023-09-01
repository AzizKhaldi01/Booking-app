import axios from "axios";

import {  createContext, useEffect, useState   } from "react";
 
export const  Usercontext = createContext();


const Userprovider = ({children})=>{
 
 const [User , setUser] = useState(null)
   const [ready , setReady] = useState(false)
 const [add , setAdd]= useState(true);
 const [ reload , setReload] = useState(false)
 const [link , setLink]= useState('');
 const [placesdata, setPlacedata] = useState(null)
 const [list , setList] = useState(true)
 const [isLoading , setIsLoading] = useState(false)


 

 const [places, setPlaces] = useState([]);

 useEffect(() => {
   axios.get("/user-places").then(({ data }) => {
    const reversedData = data.reverse();
     setPlaces(data);
     setIsLoading(true)
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
           axios.get('https://booking-app-api-ten.vercel.app/profile',).then(({data})=>{
            setUser(data)
             setReady(true)
           })
          
    }
  },[])

  

    return( 
        <Usercontext.Provider  value={{ isLoading , setIsLoading, list,setList, setPlaces,places, link,  setLink, setUser, User ,ready ,setAdd,add ,placesdata,setPlacedata , reload , setReload}}>
{children}

        </Usercontext.Provider>
    )
}
export default Userprovider;
