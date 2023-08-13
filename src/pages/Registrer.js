import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import { useEffect , useState } from 'react';
import axios from 'axios';
 

function Registrer() {

    const [name , setName]=useState('')
    const [email , setEmail]=useState('')
    const [password , setPassword]=useState('') 
   
 
  
        // Make an API call to your Node.js server
      
     
    const registerUser = async (e) => {
      e.preventDefault();
  
       
      try {
        const response = await axios.post('/Registre', {
          name,
          password, 
          email,
        });
        alert('Registration Seccsses u can log in now ')
        console.log(response.data); // Assuming the server returns the created user data
      } catch (error) {
         alert('Registration Faild')
      }

 

    };
  return (

   
    <div className=' h-full w-full flex justify-center items-center '>
        
        <div className=' items-center flex flex-col  h-[90vh] mb-44  w-full  md:w-[60%]   p-1 md:p-6  m-5 md:m-10 '>
       
        <form   onSubmit={registerUser} className=' flex flex-col w-full h-full items-center justify-center gap-2  '>
        <div className=' text-4xl pb-10'>Register   </div>
        <input value={name}  onChange={ ev => setName(ev.target.value)}  className='  bg-[#fdfbf6] h-12  w-full  md:w-[50%] px-3 rounded-sm border-none  hover:border-b border-[1px] border-green-400 ' placeholder='UserName' type='text'/>
         <input value={email}  onChange={ ev => setEmail(ev.target.value)}  className='  bg-[#fdfbf6] h-12  w-full  md:w-[50%] px-3 rounded-sm border-none  hover:border-b border-[1px] border-green-400 ' placeholder='Email' type='Email'/>

         <input value={password}  onChange={ ev => setPassword(ev.target.value)}  className='  bg-[#fdfbf6] h-12  w-full  mt-3  md:w-[50%] px-3 rounded-sm border-none  hover:border-b border-[1px] border-green-400 ' placeholder='Password' type='Password'/> 

       
      <div className=' flex gap-2 w-full   md:w-[50%]  flex-col'>

        
          <button  className=' h-10  w-full rounded-lg   font-semibold bg-lightColor '> Register </button> 
          <button  className=' h-10  w-full  rounded-lg  flex flex-row items-center text-white   justify-center gap-3  font-semibold  bg-darckColor '> <GoogleIcon/> Register With Google </button> 
          </div>
          
          <div className=' text-sm items-center justify-center mt-2  gap-2 flex-row flex  w-full   md:w-[50%]'>
       <div className=' text-gray-400 '> Allready a member?     </div> 
       <Link to='/Login' ><div className=' font-semibold underline cursor-pointer' >Login now   </div> </Link>
        </div> 
        </form>
        </div>
    </div>
  )
}

export default Registrer