import { React, useState , useEffect } from "react";
import Paypal from "../img/papal.png";
import PaypalPay from "./PaypalPay";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { BookingContext } from "../context/Bookingconext";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
 
import axios from "axios";
import { CardElement    } from "@stripe/react-stripe-js";
import './SVG.css'
import {
 
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
 
import wating from "../img/deliverytime.png";
function FormPay() {

  const {err , days ,setErr }= useContext(BookingContext)
  const [paywith, setPayWith] = useState("card");
  const [pay, setPay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
 
 
 


  const stripe = useStripe();
  const elements = useElements();
 
 const id = localStorage.getItem('id');
 const price = localStorage.getItem('price')
 
const navigate = useNavigate()
  useEffect(() => {
     if(err== 'successful'){
      
        setTimeout(() => {
        navigate('/account/Trips') 
    }, 2000);
  
     }
  

  }, [err]);

  // pm_1NhzWGGDCWqRoBjn4ibPyr2u

  async function handleSubmit(e) {

    e.preventDefault();
     
alert()
    const result = await stripe.createPaymentMethod({
      type: "card",
    
      card: elements.getElement(CardElement)
 
    });
   

    const checkIn = localStorage.getItem('checkInDate')
    const checkOut = localStorage.getItem('checkOutDate')

    
    if (result.error) {
      console.error(result.error.message);
    } else {
      // Send the PaymentMethod ID to your server using axios
      setIsLoading(true)
      try {
        const response = await axios.post("/submit-payment", {
          days:days,
          checkOut:checkOut,
          checkIn:checkIn,
 
          placeid:id,
          paymentMethodId: result.paymentMethod?.id,
        });

        console.log(result.paymentMethod?.id)
        if (response.status === 200) {
          setErr('successful')
          setIsLoading(false)
          
        } else {
          setErr('failed')
          setIsLoading(false)
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  }

  return (
    <div className=" p-4 border-solid border-[1px] rounded-lg  w-full  h-full bg-white mt-4">
      <div className="  flex flex-col  w-full   gap-6">
        <span className="  items-center w-full flex flex-row justify-between">
          <h1 className="     text-lg font-medium ">Pay with </h1>
          <img className=" w-[32%] " src={paywith} alt="" />
        </span>
    
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col w-full h-full gap-3"
          >
            <div className=" w-full relative   ">
              <div
                onClick={() => setPay(!pay)}
                className=" w-[70%] h-full absolute top-0 "
              ></div>

              <div className=" cursor-pointer text-gray-400        hover:border-gray-300  flex  items-center justify-between  text-base    w-full h-14 rounded-md border-[1px] border-solid border-[#b6b5b5] ">
                <span
                  onClick={() => setPay(!pay)}
                  className=" text-gray-800     flex flex-row w-full px-2 items-center justify-between  "
                >
                  <div className=" w-full  flex flex-row  gap-3  items-center text-gray-400 font-light   ">
                    {paywith == "card" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                        />
                      </svg>
                    ) : (
                      <img className=" w-[40px] " src={Paypal} alt="Paypal" />
                    )}
                    {paywith == "card" ? (
                      "Credit or debit card"
                    ) : (
                      <p className=" font-light">PayPal </p>
                    )}
                  </div>

                  <KeyboardArrowUpIcon
                    className={` ${pay ? " rotate-180" : ""}  `}
                  />
                </span>
                <div
                  className={` bg-white rounded-lg overflow-y-auto overflow-hidden  z-20 flex  ${
                    pay ? "h-[150px] opacity-100" : "h-0 opacity-0"
                  }  duration-200 border-[1px] border-solid border-[#b6b5b5]    absolute flex-col w-full    top-14 right-0`}
                >
                  <span
                    onClick={() => {
                      setPayWith("card");
                      setPay(!pay);
                    }}
                    className=" hover:bg-gray-100 flex flex-row justify-start items-center px-7 gap-8 w-full h-20 "
                  >
                    <span className="  scale-150">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                        />
                      </svg>
                    </span>

                    <h1 className=" font-light">Credit or debit card</h1>
                  </span>
                  <span
                    onClick={() => {
                      setPayWith("Paypal");
                      setPay(!pay);
                    }}
                    className=" hover:bg-gray-100  flex flex-row justify-start items-center px-4 gap-3 w-full h-20 "
                  >
                    <img className=" w-[55px] " src={Paypal} alt="Paypal" />
                    <h1 className=" font-light">Paypal</h1>
                  </span>
                </div>
              </div>
            </div>
            {paywith == "card" ? (

<div className=" py-9">
<CardElement options={{  style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        border: '1px solid #ccc', // Add border styling
        padding: '10px', // Add padding for spacing
        height: '40px', // Set the height here
      },
      invalid: {
        color: 'green',
      },
    },}} />

</div>

               
            ) : (
              <PaypalPay />
            )}
          </form>
         

        <div className="  w-[100%] my-4 h-[1px] bg-gray-200  "> </div>
        <div className="   flex w-full gap-6 items-start  flex-row ">
          <img src={wating} alt="" />
          <p className="  text-xs md:text-base w-[80%] font-normal  ">
            <span className="  font-medium">
              Your reservation won’t be confirmed until the host accepts your
              request (within 24 hours).
            </span>
            <br />
            <span className="  font-light text-sm">
              You won’t be charged until then.
            </span>
          </p>
        </div>
        <div className=" w-[100%] my-4 h-[1px] bg-gray-200  "> </div>
        <div className=" w-full   font-medium  ">
          <h1 className=" py-3  text-[20px] md:text-[22px] ">Ground rules</h1>
          <p className=" py-2  font-normal text-[14px]  md:text-[16px] ">
            We ask every guest to remember a few simple things about what makes
            a great guest.
          </p>
          <ul className=" gap-2 flex flex-col pt-2  font-light  text-xs  md:text-base list-disc list-inside   ">
            <li>Follow the house rules</li>
            <li>Treat your Host’s home like your own</li>
          </ul>
        </div>
        <div className=" w-[100%] my-4 h-[1px] bg-gray-200  "> </div>
        <p className="    text-[9px] md:text-xs">
          By selecting the button below, I agree to the Host's House Rules,
          Ground rules for guests, Airbnb's Rebooking and Refund Policy and that
          Airbnb can charge my payment method if I’m responsible for damage. I
          agree to pay the total amount shown if the Host accepts my booking
          request. Payment Terms between you and Airbnb Payments UK Ltd
        </p>
        <button style={{
          background: 'rgb(87,130,128)', 
          background: 'linear-gradient(337deg, rgba(87,130,128,1) 31%, rgba(116,154,152,1) 79%, rgba(129,165,163,1) 85%, rgba(151,183,182,1) 100%, rgba(210,232,232,1) 100%)' 
        }} disabled={isLoading  }
          onClick={handleSubmit}
          className="     md:text-lg hover:opacity-90 h-14  w-full md:w-[27%]  relative  rounded-lg    text-white "
        >
 
 Request to book 
  
<span className= {` ${   isLoading ? ' opacity-100 ' : ' opacity-0' } bg-greedian   absolute top-0 right-0 bg-main rounded-lg duration-200 h-full w-full flex items-center justify-center   `}>
  <span className=" h-full w-full scale-[0.2]  md:scale-[0.4] flex items-center justify-center">
 <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg"  xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml space="preserve">
    <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="1s" 
         from="0 50 50"
         to="360 50  50" 
         repeatCount="indefinite" />
  </path>
</svg>
  </span>
 
</span>


 
          <span className={`  ${ err =='successful' ? ' opacity-100' : ' opacity-0'}  duration-200 flex items-center  justify-center z-10 absolute rounded-lg top-0 right-0 h-full w-full bg-green-400    border-solid border-[1px] border-green-400 `} > 
          




          <span className=" w4rAnimated_checkmark scale-[0.4] h-full w-full items-center flex justify-center ">
       
       
          { err =='successful' && <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
  <circle class="path circle" fill="none" stroke="white" stroke-width="8" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
  <polyline class="path check" fill="none" stroke="white" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
</svg>}
            </span>
          </span>
         
        </button>
      </div>
{/* <div className={` ${err=='successful' ? ' opacity-100 z-50 ' :' opacity-0 -z-10' } duration-200 text-center fixed h-full w-full bg-white flex items-center justify-center right-0 top-0    text-green-600 text-4xl`} >
  Bookink was <br />
successful
</div> */}

    </div>
  );
}

export default FormPay;
