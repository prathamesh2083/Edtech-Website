import axios from "axios";
import mongoose from "mongoose";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import RatingStars from "../components/Catalogpage/RatingStars";
import GetAvgRating from "../utils/GetAvgRating";
import Button from "../components/Homepage/Button";
import { FaShareSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Homepage/Footer";
import { IoIosPerson } from "react-icons/io";
import Section from "../components/Coursepage/Section";
import CourseReviewSlider from "../components/Coursepage/CourseReviewSlider";
import CourseSlider from "../components/Catalogpage/CourseSlider";

export default function Course() {
  // const {user}=useSelector((state)=>state.profile);
  // const {token}=useSelector((state)=>state.auth);
  // const {loading}=useSelector((state)=>state.profile);
  // const {paymentLoading}=useSelector((state)=>state.course);
  // const dispatch=useDispatch();
  const navigate = useNavigate();
  const [courseinfo, setcourseinfo] = useState(null);
  const [totalNoOfLectures, settotalNoOfLectures] = useState(0);
  const [othercourses,setothercourses]=useState(null);
  var courseId = useParams();
  useEffect(() => {
    try {
      (async () => {
        courseId = courseId.courseId;

        if (courseId) {
          const result = await axios.post("/api/getCourseDetails", {
            courseId,
          });
          console.log(result.data.data);
          setcourseinfo(result.data.data);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, [courseId]);

  useEffect(() => {
     
    try{
       (async()=>{

         const result =await axios.get("/api/getAllCourses");
           setothercourses(result.data.allCourses);
        

       })();
    }
    catch(err){
      console.log(err);

    }

    let total_lectures = 0;
    courseinfo?.courseContent?.forEach((sec) => {
      total_lectures += sec?.subSection?.length || 0;
    });
    settotalNoOfLectures(total_lectures);
  }, [courseinfo]);
  return (
    <div className="text-white w-full  ">
      {/* section 1 */}
      <div className="w-full  flex justify-around  bg-richblack-800 md:p-10 p-6 gap-6 lg:h-[350px]  flex-wrap ">
        <div className="flex flex-col gap-4 w-full md:w-[55%] md:p-10 h-fit">
          <div className="text-[2rem] md:text-[3rem] font-semibold">
            {courseinfo?.courseName}
          </div>
          <div className="text-richblack-300 text-[1.2rem]">
            {courseinfo?.courseDescription}
          </div>
          <div className="flex gap-4 text-[1rem] flex-wrap">
            <RatingStars
              Review_Count={GetAvgRating(courseinfo?.ratingAndReviews)}
            />
            <span className="text-yellow-50">
              Total Reviews : {courseinfo?.ratingAndReviews?.length}{" "}
            </span>

            <span>
              {courseinfo?.studentsEnrolled?.length
                ? courseinfo?.studentsEnrolled?.length
                : 0}{" "}
              Students Enrolled
            </span>
          </div>
          <div className="text-[1.1rem]">
            Created By :{" "}
            {courseinfo?.Instructor.firstName +
              " " +
              courseinfo?.Instructor.lastName}
          </div>
          <div>Created at : </div>
        </div>

        <div className="md:relative  w-full md:w-[30%] md:p-8 p-4 md:min-w-[350px] max-w-[350px] flex flex-col h-fit  gap-4  text-center bg-richblack-700">
          <img
            src={courseinfo?.thumbnail}
            className="md:h-[250px]  w-full object-cover m-auto max-w-[250px] lg:max-w-[1000px]"
          ></img>
          <div className="text-[2rem] md:text-start font-semibold ">
            Rs.{courseinfo?.price}
          </div>
          <Button active width="w-full text-[17px]">
            Buy Now
          </Button>
          <Button width="w-full text-[17px]">Add to cart</Button>
          <div>30 day money back Guarantee</div>
          <div className="text-yellow-100">
            <FaShareSquare className="inline" /> Share
          </div>
        </div>
      </div>

      {/* section 2 */}
      <div className="w-[95%] m-auto  ">
        <div className="border-[1px] border-solid border-richblack-700 lg:px-20    lg:w-[60%] w-full h-fit mt-4 flex flex-col gap-2 p-6 ">
          <div className="text-[2rem] font-semibold">What will You learn </div>
          <div>{courseinfo?.whatYouWillLearn}</div>
        </div>

        <div className="text-center md:text-start  lg:px-20    lg:w-[60%] w-full h-fit mt-4 flex flex-col gap-2 md:p-6">
          <div className="text-[2rem] font-semibold  ">Course Content</div>
          <div className="">
            {" "}
            {courseinfo?.courseContent?.length} sections {totalNoOfLectures}{" "}
            lectures{" "}
          </div>
          {courseinfo?.courseContent?.length !== 0 ? (
            <div className="bg-richblack-800 w-full flex flex-col gap-2 rounded-xl mt-4 p-4  ">
              {courseinfo?.courseContent?.map((section, index) => {
                return <Section id={index} section={section} />;
              })}
            </div>
          ) : (
            <div>No Lectures found</div>
          )}
        </div>
      </div>
      {/* section 3  */}
      <div className=" text-center md:text-start lg:px-28    lg:w-[60%] w-full h-fit mt-4 flex flex-col gap-2 p-6 ">
        <div className="text-[1.9rem] font-semibold">Author </div>
        <div className="text-caribbeangreen-200 text-[1.2rem] ">
          <IoIosPerson className="inline mr-1" color="white" />
          {courseinfo?.Instructor?.firstName.slice(0, 1).toUpperCase() +
            courseinfo?.Instructor?.firstName.slice(1) +
            " " +
            courseinfo?.Instructor?.lastName.slice(0, 1).toUpperCase() +
            courseinfo?.Instructor?.lastName.slice(1)}
        </div>
        <div>{courseinfo?.Instructor?.additionalDetails?.about} </div>
      </div>

      {/* section 4 reviews about course */}
      <div className="w-full md:w-[95%] m-auto text-center">
        <CourseReviewSlider reviews={courseinfo?.ratingAndReviews} />
      </div>
      {/* section 5 other courses */}
      <div className="w-full md:w-[95%] m-auto text-center  ">
        <div className="text-[1.8rem] font-semibold my-4 " >
          Other Courses by{" "}
          {courseinfo?.Instructor?.firstName.slice(0, 1).toUpperCase() +
            courseinfo?.Instructor?.firstName.slice(1) +
            " " +
            courseinfo?.Instructor?.lastName.slice(0, 1).toUpperCase() +
            courseinfo?.Instructor?.lastName.slice(1)}
        </div>
        <CourseSlider Courses={othercourses} />
      </div>
      <Footer></Footer>
    </div>
  );
}