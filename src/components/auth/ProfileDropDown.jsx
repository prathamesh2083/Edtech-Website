import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Logout from '../../services/auth/Logout';
import { useNavigate } from 'react-router-dom';
export default function ProfileDropDown() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const logoutUser=async()=>{
      Logout(dispatch,navigate);
  }
  return (
    <div className=' relative top-12 bg-richblack-600    text-white px-4 py-1    z-10 rounded-md flex flex-col' >
       <Link to="/dashboard/my-profile" >dashboard</Link>
       <div onClick={logoutUser} >Logout</div>
    </div>
  )
}
