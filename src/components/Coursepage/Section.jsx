import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { FaVideo } from "react-icons/fa6";
export default function Section({ section }) {
  const [open, setopen] = useState(false);
  const changeopen = () => {
    setopen(!open);
  };
  return (
    <>
      <div
        onClick={changeopen}
        className="flex justify-between m-auto  border-b-[1px]  w-full md:w-[95%] items-center border-richblack-700 p-6 border-b-w-[80%]"
      >
        <div className="font-bold text-[1.1rem]">{section?.sectionName}</div>

        <IoIosArrowUp
          className={` ${
            !open ? "rotate-180" : ""
          } transition-all duration-700  `}
        />
      </div>
      <div
        className={`${
          !open ? "hidden" : ""
        }  duration-700 bg-richblack-700 w-full md:w-[95%] m-auto rounded-lg  transition-[height]  ease-out `}
      >
        {section?.subSection?.map((subsection, index) => {
          return (
            <div id={index} className="flex justify-between md:px-4 px-1  ">
              <div className="p-4 flex items-center w-[90%] ">
                <div>
                  <FaVideo className="inline mr-4 w-[20px] " size={"20px"} />
                </div>
                <div> {subsection.title} </div>
              </div>
              <div className="flex items-center w-[10%] min-w-[60px]">
                {subsection.timeDuration} hours{" "}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
