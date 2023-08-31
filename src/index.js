import React from 'react';
import ReactDOM from 'react-dom/client';
import 'tailwindcss/tailwind.css'
 
import "./index.css";
 import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Userprovider from './context/pagecontext';
import Bookingprovider from './context/Bookingconext';
  





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Bookingprovider>
  <Userprovider>
  <React.StrictMode>
   
    <BrowserRouter>
    <App /> 
    </BrowserRouter>
  
  </React.StrictMode>
   </Userprovider>
 </Bookingprovider>
);

 
