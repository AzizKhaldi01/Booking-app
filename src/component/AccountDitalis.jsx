import     { useContext ,React , useState, useEffect } from 'react'
import userimage from "../img/user.webp";
import { Usercontext } from '../context/pagecontext'
import axios from 'axios';

function AccountDitalis() {

const {User} = useContext(Usercontext);

const [FirstName , setFirtsName]=useState('')
const [LastName , setLastName]=useState('')

const [Email , setEmail]=useState('')


const [Update , setUpdate]=useState(false)

 


function handelupdate (){
    setUpdate(!Update)
}

function handelChangeFirstName (e){
    setFirtsName(e.target.value)
} 

function handelChangeLastName (e){
    setLastName(e.target.value)
} 

function handelChangeEmail (e){
    setEmail(e.target.value)
}


function  handelUpdateProfile(e) {
    e.preventDefault();
    axios.post('/updateprofile' , {FirstName , LastName , Email }   ).then((response) =>{

        const {data} = response;

    if(data == 'secsses'){

    }

    else  {
        
    }


    }  )
}




  return (
    <form onSubmit={handelUpdateProfile} className=' hidden  md:flex flex-col mt-16  w-full h-7  gap-10  px-3  md:px-10 mb-20   '>

<div className=' flex flex-row items-center pr-5 gap-4 justify-between w-full'>
<div className=' flex flex-row gap-5 items-center '> 
<img
            className=" p-2    w-[100px]   bg-gray-100  rounded-[50%] "
            src={userimage}
          />
<span className=' flex flex-col gap-2'>
<h1 className=' text-sm font-medium text-gray-900'>Profile Pictures</h1>
<p className=' text-gray-600 text-xs'>PNG,JPG,GIF max size of 5MB</p>
</span>

</div>

{ Update  ?    <div className=' flex flex-row items-center gap-2'>
 <button onClick={()=>  setUpdate(false) } className='   text-main  p-2 px-3 border-solid border-[1px] border-main rounded'>x</button> <button onClick={handelUpdateProfile} className=' bg-main  p-2 px-3 text-white rounded'>Save</button>
</div>    :     <button onClick={handelupdate} className=' bg-main p-2 px-3 rounded text-white'>Update Profile</button>}

</div>

<div className=' flex flex-col w-full  items-center gap-6'>
 <div className=' w-full flex flex-row gap-5'>
    <span className=' flex flex-col w-full gap-3 items-start '>
        <label className='   px-2 text-sm text-gray-700' htmlFor="">First Name</label><input disabled={!Update} className=  {`w-full h-12 ${Update ? '  border-solid border-main border-[1px] ' : 'bg-slate-50' }   rounded-md px-3 `}  placeholder='First Name' onChange={handelChangeFirstName} type="text" value={FirstName}  />
    </span>
    <span className=' flex flex-col  w-full gap-3 items-start'>
        <label className='  px-2  text-sm text-gray-700' htmlFor="">Last Name</label><input disabled={!Update} className={`w-full h-12 ${Update ? '  border-solid border-main border-[1px] ' : 'bg-slate-50' }   rounded-md px-3 `}  placeholder='First Name' type="text" onChange={handelChangeLastName} value={LastName}  />
    </span>
 </div>
 <span className=' flex flex-col  w-full gap-3 items-start'>
        <label className='  px-2  text-sm text-gray-700' htmlFor="">Email Address</label><input disabled={!Update} className={`w-full h-12 ${Update ? '  border-solid border-main border-[1px] ' : 'bg-slate-50' }   rounded-md px-3 `}  placeholder='First Name' type="text" onChange={handelChangeEmail} value={Email}  />
    </span>
 <span className=' flex flex-col  w-full gap-3 items-start'>
        <label className=' px-2   text-sm text-gray-700' htmlFor="">Job</label><input disabled={!Update} className={`w-full h-12 ${Update ? '  border-solid border-main border-[1px] ' : 'bg-slate-50' }   rounded-md px-3 `} placeholder='First Name' type="text" value={'Developer'}  />
    </span>
</div>

<div className=' flex flex-row w-full  justify-between pb-7 font-medium px-2'>

    <span>Change Password</span>
<button  disabled={!Update} className=  {`  text-gray-600  p-2 px-3 rounded  ${ Update  ?  ' border-solid border-[1px] border-main  text-main ' : '' } `}  >Change</button>
</div>
    </form>
  )
}

export default AccountDitalis