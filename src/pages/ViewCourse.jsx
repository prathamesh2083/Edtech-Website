import React, { useEffect, useState } from "react";

import { Outlet, useParams } from "react-router-dom";
import CourseReviewModal from "../components/ViewCourse/CourseReviewModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import {
  setEntirecourseData,
  setcompletedLectures,
  setcourseSectionData,
  settotalNoOfLectures,
} from "../slices/viewCourse";
import VideoDetailsSidebar from "../components/ViewCourse/VideoDetailsSidebar";

export default function ViewCourse() {
 const [reviewModal,setreviewModal]=useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // fetch and set  course details in courseslice
  const setcourseDetails = async () => {
    try {
      const result = await axios.post("/api/getCourseDetails", {
        courseId,
      });
      
      if (result.data.success) {
        const courseData = result.data.data;
        console.log(courseData);
        dispatch(setcourseSectionData(courseData.courseContent));
        dispatch(setEntirecourseData(courseData));
        dispatch(setcompletedLectures(courseData.completedVideos)); ///////////chance of bug
        let lectures=0;
          courseData.courseContent.forEach((sec)=>{
                lectures+=sec.subSection.length;
          })
          dispatch(settotalNoOfLectures(lectures));
      } else {
        console.log(result);
      }
    } catch (err) {
      
      console.log(err);
    }
  };

  useEffect(() => {
    setcourseDetails();
   
  }, []);
  return (
    <div className="text-white flex">
      <VideoDetailsSidebar setreviewModal={setreviewModal} />
      <div >
        <Outlet />
      </div>
      {reviewModal ? <CourseReviewModal setreviewModal={setreviewModal} />:<div></div>}
    </div>
  );
}
