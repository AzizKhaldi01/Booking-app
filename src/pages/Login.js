import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import { useEffect , useState } from 'react';
import { Link , Navigate } from 'react-router-dom';
import { Usercontext } from '../context/pagecontext';
import { useContext } from 'react';
import axios from 'axios';
function Login() {
const { setUser} = useContext(Usercontext)

 const [password , setPassword]=useState('')
    const [email , setEmail]=useState('')
     
    const [redirect, setRedirect] = useState('');

    const loginUser = async (e) => {
      e.preventDefault();
      try {
        const {data} = await axios.post('/login', {email,password,} );
        setUser(data)
        alert('Login Success! You can log in now.');
        setRedirect(true)
      
      
      } catch (e) {
        alert('Login Failed');
      }
    };
    


if (redirect){
  return  <Navigate to={'/'} />
}



   
  return (
    <div className=' h-full w-full flex justify-center items-center '>
        
        <div className=' items-center flex flex-col  h-[90vh] mb-44  w-full  md:w-[60%]   p-1 md:p-6  m-5 md:m-10 '>
       
        <form  onSubmit={loginUser} className=' flex flex-col w-full h-full items-center justify-center gap-2  '>
        <div className=' text-4xl pb-10'>Login   </div>
      
         <input     onChange={ ev => setEmail(ev.target.value)}  value={email}  className='  bg-[#fdfbf6] h-12  w-full  md:w-[50%] px-3 rounded-sm border-none  hover:border-b border-[1px] border-green-400 ' placeholder='Email' type='Email'/>

         <input   onChange={ ev => setPassword(ev.target.value)}  value={password}  className='  bg-[#fdfbf6] h-12  w-full  mt-3  md:w-[50%] px-3 rounded-sm border-none  hover:border-b border-[1px] border-green-400 ' placeholder='Password' type='Password'/> 

       
      <div className=' flex gap-2 w-full   md:w-[50%]  flex-col'>

        
          <button  className=' h-10  w-full rounded-lg   font-semibold bg-lightColor '> Login </button> 
          <button  className=' h-10  w-full  rounded-lg  flex flex-row items-center text-white   justify-center gap-3  font-semibold  bg-darckColor '> <GoogleIcon/> Login With Google </button> 
          </div>
          
          <div className=' text-sm items-center justify-center mt-2  gap-2 flex-row flex  w-full   md:w-[50%]'>
       <div className=' text-gray-400 '>Don't have an acount yet?    </div> 
        <Link to='/Registre' ><div className=' font-semibold underline cursor-pointer' >Register now   </div>  </Link>
        </div> 
        </form>
        </div>
    </div>
  )
}

export default Login