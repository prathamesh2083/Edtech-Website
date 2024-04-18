import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import IconBtn from '../common/IconBtn';
export default function Profile() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.profile);
    useEffect(()=>{
        console.log("user is : ",user);
    })
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-[2rem] font-semibold text-white w-full mb-8">
        My Profile
      </div>
      <div className="items-center flex-wrap gap-4 justify-between flex w-full bg-richblack-800 border-richblack-700 border-[1px] md:p-6 p-1 rounded-md">
        <div className="flex gap-4 flex-wrap  ">
          <img src={user?.image} className="w-[80px] rounded-full m-auto"></img>
          <div className="text-white w-full md:w-fit text-[1.1rem] font-semibold flex flex-col gap-2  justify-center ">
            <div className='w-full' >{user?.firstName + " " + user?.lastName}</div>
            <div  className='text-wrap  overflow-auto w-full'>{user?.email}</div>
          </div>
        </div>
        <IconBtn
         
          text="Edit"
          active={true}
          customClasses="flex items-center px-8 h-[40px] "
        />
      </div>
      <div className=" text-white items-center justify-between gap-4 flex flex-col w-full bg-richblack-800 border-richblack-700 border-[1px] p-6 rounded-md">
        <div className="flex justify-between w-full">
          <div className="text-[1.4rem] font-semibold">About</div>
          <IconBtn
            
            text="Edit"
            active={true}
            customClasses="flex items-center px-8 h-[40px] "
          />
        </div>
        <div className="text-start w-full">
          {user?.additionalDetails?.about}dd
        </div>
        <div className="text-start font-semibold text-[1.1rem] w-full">
          Account Type : {user?.accountType}
        </div>
      </div>
    </div>
  );
}
