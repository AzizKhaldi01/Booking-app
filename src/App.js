
 
import "./App.css";
import Home from "./pages/Home";
 
import Navbar from "./component/navbar";
import LoginOrRegistrer from "./pages/LoginOrRegistrer";
 import { Route , Routes } from "react-router-dom";
import axios from "axios";
import Account from "./pages/Account";
import BookedPlaceDetails from "./pages/BookedPlaceDetails";
import Booking from "./pages/Booking";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
 
import PlaceDetailes from "./pages/PlaceDetailes";
import MobileNav from "./component/MobileNav";
 axios.defaults.baseURL = 'http://192.168.1.7:4000'
  axios.defaults.withCredentials=true


function App() {
  
 

  const stripePromise = loadStripe('pk_test_51NhBfRGDCWqRoBjngI9J1i8lsLDi9QmUiVvUw6EpYTHxcNkYdMEvhV6Fr3LMbLGNVVG84SLgYJJZNPywJvpUTIqh00KvikbmRN');
  return (

    <Elements stripe={stripePromise}>
    <div className="  font-custom" >
 
     
     <Navbar/>
      <MobileNav/>
      <LoginOrRegistrer/>
<Routes >

<Route index element={<Home/>} />
 

 
 
  <Route path="/account" element={<Account/>} />
  <Route path="/account/:subpages" element={<Account/>} />
     <Route path="/placedetails/:_id" element={<PlaceDetailes/>} />
   <Route path="/account/:subpages/:_id" element={<Account/>} />
   <Route path="/account/Trips/:_id" element={<BookedPlaceDetails/>} />

   <Route path="/guest-step" element={<Booking/>} />

</Routes>
     
       
    </div>
    </Elements>
  );
}

export default App;
