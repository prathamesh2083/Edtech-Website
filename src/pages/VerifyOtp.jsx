import React from 'react'
import Button from '../components/Homepage/Button'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { HiRefresh } from "react-icons/hi";
export default function VerifyOtp() {
  return (
    <div className="text-white w-full  min-w-[280px] m-auto p-4    flex flex-col gap-2">
      <div className=" bg-richblack-800 max-w-[450px] m-auto p-8 flex flex-col gap-4 rounded-lg">
        <div className="text-[2rem] font-semibold">Verify Email</div>
        <div className="text-richblack-200">
          A verification code has been sent to you. Enter the code below.
        </div>
        <div>input field</div>
        <Button active={true} width={"full"}>
          Enter OTP
        </Button>
        <div className="flex justify-between text-richblack-400">
          <Link to="/login">
            {" "}
            <FaArrowLeft className="inline" /> Back to login
          </Link>
          <Link className="text-blue-200">
            <HiRefresh className="inline" /> Resend it
          </Link>
        </div>
      </div>
    </div>
  );
}
