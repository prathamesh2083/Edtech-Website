import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import CourseCard from "./Instructorcourses/CourseCard";
import toast from "react-hot-toast";
import Loading from "../../pages/Loading";
export default function InstructorCourses() {
  const navigate=useNavigate();
  const[courses,setcourses]=useState([]);
  const [loading,setloading]=useState(false);
  useEffect(()=>{

    (async()=>{
     
       try{
            setloading(true);
            const result = await axios.get("/api/getAllCourses");

            setcourses(result.data.allCourses);
            setloading(false);
       }
       catch(err){
           console.log("Error in fetching courses");
           toast.error("Error in getting your courses");
       }
       
         setloading(false);
    })()
  },[])
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="text-white">
          <div className="flex justify-between w-full">
            <div className="text-[2rem] font-semibold ">My Courses</div>
            <Link
              to="/dashboard/add-course"
              className="bg-yellow-50 text-black p-2 px-4 rounded-lg flex justify-center items-center"
            >
              Add Course <IoMdAdd className="inline " size={"22px"} />
            </Link>
          </div>

          <div className=" text-richblack-100 w-full flex  justify-between mt-12 border-[1px] p-8 border-richblack-800">
            <div className="w-[70%]">COURSES</div>
            <div>DURATION</div>
            <div>PRICE</div>
            <div>ACTION</div>
          </div>
          <div>
            {courses?.map((course, index) => {
              return <CourseCard key={index} course={course} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}
