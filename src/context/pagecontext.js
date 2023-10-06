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
 const [list , setList] = useState(false)
 const [isLoading , setIsLoading] = useState(false)
 const [Saved , setSaved] = useState(false)
 const [FilterCheck , setFilterCheck] = useState(false)
 

 const [places, setPlaces] = useState([]);

 useEffect(() => {
   axios.get("/user-places").then(({ data }) => {
    const reversedData = data?.reverse();
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
   
           axios.get('http://localhost:4000/profile',).then(({data})=>{
            setUser(data)
             setReady(true)
           })
          
  
  },[Saved])

  
 

    return( 
        <Usercontext.Provider  value={{    setFilterCheck, FilterCheck ,Saved , setSaved , isLoading , setIsLoading, list,setList, setPlaces,places, link,  setLink, setUser, User ,ready ,setAdd,add ,placesdata,setPlacedata , reload , setReload}}>
{children}
 </Usercontext.Provider>
    )
}
export default Userprovider;