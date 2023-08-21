import {React , useState , useEffect} from 'react'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';


function CardPay({cardNumber ,expiry ,  cvv ,handleExpiryChange ,handleCVVChange, handleInputChange}) {
   
  return (
    <>
    <div className=" flex flex-col font-light   ">
      {/* <input
       value={cardNumber}
       onChange={handleInputChange}
       maxLength="19"
        placeholder="Card number"
        className=" px-4  border-solid border-[1px]    hover:border-gray-300  border-[#b6b5b5]  w-full h-14 rounded-t-lg   "
        type="text"
      /> */}


<CardNumberElement options={{/* Element options */}} />
      <div className="    flex flex-row w-full">
        {/* <input
         value={expiry}
         onChange={handleExpiryChange}
          placeholder="MM / YY"
          className=" px-4 border-solid border-[1px]   hover:border-gray-300  border-[#b6b5b5] border-t-0  rounded-bl-lg   h-14 w-full  "
          type="text"
          
        />
        <input
        value={cvv}
        onChange={handleCVVChange}
          placeholder="CVV"
          className=" px-4 border-solid border-[1px]   hover:border-gray-300  border-[#b6b5b5] border-t-0 border-l-0 rounded-br-lg  h-14   w-full"
          type="text"
          maxLength={4}
        /> */}


<CardExpiryElement options={{/* Element options */}} />
<CardCvcElement options={{/* Element options */}} />
      </div>
    </div>

    <input
      placeholder="Postcode"
      className=" px-4 rounded-lg font-light border-solid border-[1px]   hover:border-gray-300  border-[#b6b5b5]   h-14   w-full"
    />
  </>
  )
}

export default CardPay