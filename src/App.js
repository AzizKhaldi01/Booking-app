
 
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./component/navbar";
import Registrer from "./pages/Registrer";
  
 import { Route , Routes } from "react-router-dom";
import axios from "axios";
import Account from "./pages/Account";
import { SkeletonTheme } from "react-loading-skeleton";
import PlaceDetailes from "./pages/PlaceDetailes";
 axios.defaults.baseURL = 'http://localhost:4000'
  axios.defaults.withCredentials=true
function App() {
   
  return (
<<<<<<< HEAD
    <div className="      " >
=======
    <div className="     px-2 md:px-11" >
>>>>>>> origin/main
 
      
     <Navbar/>
<Routes >

<Route index element={<Home/>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/Registre" element={<Registrer/>} />
  <Route path="/account" element={<Account/>} />
  <Route path="/account/:subpages" element={<Account/>} />
     <Route path="/placedetails/:_id" element={<PlaceDetailes/>} />
   <Route path="/account/:subpages/:_id" element={<Account/>} />
</Routes>
     
       
    </div>
  );
}

export default App;
