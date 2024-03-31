import React, { useState } from "react";
import loginImage from "../assets/Images/login.webp";
import HighlightText from "../components/Homepage/HighlightText";
import { FaEye } from "react-icons/fa";
// <FaEye />
import { IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import ReviewSlider from "../components/common/ReviewSlider";
// <IoIosEyeOff />
export default function Login() {
  const [info, setinfo] = useState({
    
    email: "",
    password: "",
 
  });
  const [showpass,setshowpass]=useState(false);
  function hidepassfun(){
       setshowpass(false);
  }
  function showpassfun(){
       setshowpass(true);
  }
  function handlechange(e) {
    const term = e.target.name ;
    const newval = e.target.value ;

    setinfo((prev) => {
      return {
        ...prev,
        [term]: newval,
      };
    });
    
  }
  return (
    <div className="text-white w-full flex my-24 px-20 gap-10 justify-around flex-wrap-reverse">
      <div className="lg:w-[35%] w-[100%] flex flex-col gap-4  min-w-[330px] p-3 md:min-w-[400px] max-w-[500px]">
        <div className="text-[2rem] font-semibold w-full md:w-[80%] text-center lg:text-start">
          Welcome Back
        </div>
        <div className="text-richblack-300 text-center lg:text-start">
          Build skills for today, tomorrow, and beyond.{" "}
          <span className="text-[1.3rem]">
            <HighlightText>
              {" "}
              Education to future-proof your career.
            </HighlightText>{" "}
          </span>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label>Email Address</label>
            <input
              name="email"
              value={info.email}
              onChange={handlechange}
              type="text"
              className="w-full bg-richblack-800 rounded-lg  h-[45px] p-2 text-richblack-50 shadow-sm shadow-blue-200"
              placeholder="Enter Email Address"
            ></input>
          </div>

          <div className="flex flex-col gap-2">
            <label>Password</label>

            <input
              name="password"
              value={info.password}
              onChange={handlechange}
              type={showpass ? "text" : "password"}
              className=" w-[99%] bg-richblack-800 rounded-lg  h-[45px] p-2 text-richblack-50 shadow-sm shadow-blue-200"
              placeholder="Enter Password"
            ></input>
            <span className="relative bottom-[38%]  left-[88%] w-[30px]">
              {showpass ? (
                <IoIosEyeOff onClick={hidepassfun} size={"25px"} />
              ) : (
                <FaEye onClick={showpassfun} size={"25px"} />
              )}
            </span>
          </div>

          <button
            type="submit"
            className="bg-yellow-100  h-[45px] rounded-lg text-black text-lg hover:bg-yellow-50 "
          >
            Create Account
          </button>
        </form>
        <div className="text-blue-100 px-4 ">
          {" "}
          <Link to={"/signup"}>Don't have an account ?</Link>{" "}
        </div>
      </div>
      <div className="max-w-[500px] min-w-[300px] flex items-center">
        <img src={loginImage}></img>
      </div>
      
    </div>
  );
}
