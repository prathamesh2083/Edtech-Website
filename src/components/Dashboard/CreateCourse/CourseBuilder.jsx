import React from 'react'
import { seteditCourseInfo } from '../../../slices/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function CourseBuilder() {
  const {editCourseInfo}=useSelector((state)=>state.course);
  const dispatch=useDispatch();
  return (
    <div className='text-white mt-12 bg-richblack-800 ' >
      <p className='text-[1.2rem]' >Course Builder</p>
      <form className='flex flex-col' >
          <div>

          <label>Section Name : </label>
          <sup className='text-pink-300 '>*</sup>
          <input placeholder='Enter section name'></input>
          </div>
      </form>
    </div>
  )
}
