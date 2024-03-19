import React from "react";
import logo from "../../assets/Logo/rzp_logo.png";
import image from "../../assets/Images/TimelineImage.png";
export default function () {
  return (
    <div className="w-full p-2 flex justify-center gap-5 flex-wrap  my-10">
      <div className="w-[40%] flex flex-col gap-4 p-2 min-w-[350px]">
        <div className="flex gap-4">
          <img src={logo} className="w-[5rem] rounded-full"></img>
          <div>
            <p className="font-semibold">Leardeship</p>
            <p>Fully committed to the success company</p>
          </div>
        </div>
        <div className="flex gap-4">
          <img src={logo} className="w-[5rem] rounded-full"></img>
          <div>
            <p className="font-semibold">Leardeship</p>
            <p>Fully committed to the success company</p>
          </div>
        </div>
        <div className="flex gap-4">
          <img src={logo} className="w-[5rem] rounded-full"></img>
          <div>
            <p className="font-semibold">Leardeship</p>
            <p>Fully committed to the success company</p>
          </div>
        </div>
        <div className="flex gap-4">
          <img src={logo} className="w-[5rem] rounded-full"></img>
          <div>
            <p className="font-semibold">Leardeship</p>
            <p>Fully committed to the success company</p>
          </div>
        </div>
      </div>

      <div className="md:w-[50%] text-center min-w-[350px] w-full justify-start items-center flex flex-col md:mx-5 ">
        <img
          src={image}
          className="max-w-[600px] min-w-[250px]  md:min-w-[450px]  shadow-lg shadow-blue-200 w-[90%] mx-auto md:m-0"
        ></img>
        <div className="bg-yellow-25 px-2 lg:w-[70%] lg:flex lg:left-0 min-h-[100px] max-h-[100px] w-full items-center md:relative lg:bottom-10 md:w-[70%] justify-around
          hidden ">
          <div className="font-semibold text-2xl ">10</div>
          <div>YEARS OF EXPERIENCE</div>
          <div className="font-semibold text-2xl ">250</div>
          <div>TYPE OF COURSES</div>
        </div>
      </div>
    </div>
  );
}
