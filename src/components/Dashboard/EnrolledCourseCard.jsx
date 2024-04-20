import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";
export default function EnrolledCourseCard({ course }) {
  return (
    <div className="w-full flex justify-between items-center my-2 ">
      <div className="flex gap-[8px] flex-wrap items-center w-[40%] ">
        <Link to={`/courses/${course?._id}`}>
          <img
            src={course?.thumbnail}
            className="w-[60px] h-[60px] rounded-lg m-auto md:m-0"
          ></img>
        </Link>

        <div className="flex flex-col justify-center items-center md:items-start gap-1">
          <div className="text-[0.9rem]">{course?.courseName}</div>
          <div className="text-[0.8rem] text-richblack-100 text-center md:text-start ">
            {course?.courseDescription.slice(0, 50)}
          </div>
        </div>
      </div>
      <div className="w-[30%] "> 1 hr 20 min</div>
      <div className="w-[25%] min-w-[100px] flex gap-1">
        {" "}
        <ProgressBar
          completed={course?.progressPercentage || 35}
          height="15px"
          borderRadius="7px"
          labelSize="12px"
          maxCompleted={100}
          className="w-[90%] inline"
        />
      </div>
    </div>
  );
}
