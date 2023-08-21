import {React , useState    }from 'react'
import Paypal from "../img/papal.png";
import PaypalPay from './PaypalPay';
import CardPay from "./CardPay";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import wating from "../img/deliverytime.png";
function FormPay() {

    const [paywith, setPayWith] = useState("card");
    const [pay, setPay] = useState(false);
    const [cardNumber, setcardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCVV] = useState('');

    const stripePromise = loadStripe('pk_test_51NhBfRGDCWqRoBjngI9J1i8lsLDi9QmUiVvUw6EpYTHxcNkYdMEvhV6Fr3LMbLGNVVG84SLgYJJZNPywJvpUTIqh00KvikbmRN');
   

    const stripe = useStripe();
    const elements = useElements();
    const handleExpiryChange = (event) => {

   
        const inputValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
      
        // Format the input for the expiry date (MM / YY)
        let formattedValue = inputValue;
      
        if (inputValue.length > 2) {
          const month = inputValue.substring(0, 2);
          const year = inputValue.substring(2,4);
          formattedValue = `${month}/${year}`;
        }
      
        setExpiry(formattedValue);
 

      };
    
      const handleCVVChange = (event) => {
        setCVV(event.target.value);
        
      };
 
    const handleInputChange = (event) => {
        const newValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        const formattedValue = newValue.replace(/(\d{4})/g, '$1 '); // Add spaces every four digits
        setcardNumber(formattedValue.trim());
         
      };

    async function handleSubmit (e){
        e.preventDefault();
    
      
    
 
        
    
      const result = await stripe.createPaymentMethod({
        type: 'card',

        card: {
             
            // Here, you directly use the components for CardNumber, CardExpiry, and CardCvc
            number: elements.getElement(CardNumberElement),
            exp_month: elements.getElement(CardExpiryElement)._frame.contentWindow.document.querySelector('.StripeElement-cardExpiry input').value.split('/')[0],
            exp_year: elements.getElement(CardExpiryElement)._frame.contentWindow.document.querySelector('.StripeElement-cardExpiry input').value.split('/')[1],
            cvc: elements.getElement(CardCvcElement)._frame.contentWindow.document.querySelector('.StripeElement-cardCvc input').value,
          },
      });
      if (result.error) {
        console.error(result.error.message);
      } else {
        // Send the PaymentMethod ID to your server using axios
        try {
          const response = await axios.post('/submit-payment', {
            paymentMethodId: result.paymentMethod.id,
          });
  
          if (response.status === 200) {
            console.log('Payment successful.');
          } else {
            console.error('Payment failed.');
          }
        } catch (error) {
          console.error('An error occurred:', error);
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

    
      <Elements stripe={stripePromise}>
      <form onSubmit={handleSubmit} className=" flex flex-col w-full h-full gap-3">
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
            {paywith== "card" ?  <svg
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
        </svg> :  <img className=" w-[40px] " src={Paypal} alt="Paypal" />  }
    { paywith== 'card'  ? 'Credit or debit card' : <p className=" font-light">PayPal </p>  }
          </div>
          
            

          <KeyboardArrowUpIcon
            className={` ${pay ? " rotate-180" : ""}  `}
          />

        </span>
        <div
          className={` bg-white rounded-lg overflow-y-auto overflow-hidden flex  ${
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

            <h1  className=" font-light">Credit or debit card</h1>
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
    
<CardPay cardNumber={cardNumber} expiry={expiry}   cvv={cvv}  handleExpiryChange={handleExpiryChange}  handleCVVChange={handleCVVChange} handleInputChange={handleInputChange} />
    
    ) : (
      <PaypalPay/>
    )}
  </form>
  </Elements  >

      
      <div className="  w-[100%] my-4 h-[1px] bg-gray-200  "> </div>
      <div className="   flex w-full gap-6 items-start  flex-row ">
         <img src={wating} alt="" />
        <p className="  text-xs md:text-base w-[80%] font-normal  ">
       <span className="  font-medium">
            Your reservation won’t be confirmed until the host accepts
          your request (within 24 hours).
       </span>
       <br />
       <span className="  font-light text-sm">
          You won’t be charged until
          then.
       </span>
      
        </p>
      </div>
      <div className=" w-[100%] my-4 h-[1px] bg-gray-200  "> </div>
      <div  className=" w-full   font-medium  ">
        <h1 className=" py-3  text-[20px] md:text-[22px] ">Ground rules</h1>
        <p className=" py-2  font-normal text-[14px]  md:text-[16px] ">
          We ask every guest to remember a few simple things about what
          makes a great guest.
        </p>
        <ul className=" gap-2 flex flex-col pt-2  font-light  text-xs  md:text-base list-disc list-inside   ">
          <li>Follow the house rules</li>
          <li>Treat your Host’s home like your own</li>
        </ul>
      </div>
      <div className=" w-[100%] my-4 h-[1px] bg-gray-200  "> </div>
      <p className="    text-[9px] md:text-xs">
        By selecting the button below, I agree to the Host's House
        Rules, Ground rules for guests, Airbnb's Rebooking and Refund
        Policy and that Airbnb can charge my payment method if I’m
        responsible for damage. I agree to pay the total amount shown if
        the Host accepts my booking request. Payment Terms between you
        and Airbnb Payments UK Ltd
      </p>
      <button  onClick={handleSubmit}  className="     md:text-lg hover:opacity-90 h-14  w-full md:w-[27%]   rounded-lg  bg-main text-white ">
        Request to book
      </button>
    </div>
  </div>





   
  )
}

export default FormPay