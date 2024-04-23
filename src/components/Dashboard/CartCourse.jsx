import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetAvgRating from "../../utils/GetAvgRating";
import RatingStars from "../Catalogpage/RatingStars";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { getCartCourses } from "../../services/operations/getCartCourses";

export default function CartCourse({ course,refresh }) {
  const dispatch = useDispatch();
  const { loading, setloading } = useState(false);
  const {token}=useSelector((state)=>state.auth);
  const [courseDetails, setcourseDetails] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.post("/api/getCourseDetails", {
          courseId: course,
        });
        console.log(result.data.data);
        setcourseDetails(result.data.data);
      } catch (err) {
        console.log("error in getting course details in cart");
      }
    })();
  }, []);
   const removeCourse =async(e)=>{
   
      try{
          const result = await axios.post("/api/cart/removefromcart",{
            courseId:courseDetails?._id
          });
          if(result.data.success){
            toast.success("Course removed");
          }

        }
        catch(err){
            console.log("Error in removing course from cart");
        }
        window.location.reload();
        getCartCourses(token, dispatch);
         refresh();
   }
  return (
    <div className="flex  gap-6 justify-around my-2 hover:bg-richblack-900 hover:scale-105 transition-all duration-700  border-b-[1px] border-b-richblack-600 pb-6 p-2 ">
      <img src={courseDetails?.thumbnail} className="w-[250px] h-[150px]"></img>
      <div className="flex flex-col gap-2 justify-center">
        <div className="font-semibold text-[1.2rem]">
          {courseDetails?.courseName}
        </div>
        <div>{courseDetails?.category?.name}</div>
        {courseDetails?.ratingAndReviews?.length ? (
          <div className="flex gap-1">
            <div className="text-yellow-50">
              {GetAvgRating(courseDetails?.ratingAndReviews)}
            </div>
            <RatingStars
              Review_Count={GetAvgRating(courseDetails?.ratingAndReviews)}
            />
            <div>
              {" "}
              {courseDetails?.ratingAndReviews?.length}{" "}
              {courseDetails?.ratingAndReviews?.length > 1
                ? "Ratings"
                : "Rating"}{" "}
            </div>
          </div>
        ) : (
          <div>No Ratings Yet</div>
        )}
      </div>
      <div className="flex flex-col justify-center gap-6">
        <div onClick={removeCourse} className="text-pink-400 hover:cursor-pointer font-semibold flex items-center gap-1 p-2 bg-richblack-800 rounded-md">
          {" "}
          <MdDelete className="inline" size={"20px"} /> Remove
        </div>
        <div className="text-caribbeangreen-200 font-semibold  text-[1.1rem] ">
          Rs. {courseDetails?.price}
        </div>
      </div>
    </div>
  );
}
