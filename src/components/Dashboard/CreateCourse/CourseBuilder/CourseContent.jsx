import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Section from './Section';
export default function CourseContent({ seteditSectionName ,setsection}) {
  const dispatch = useDispatch();
  const { editCourseInfo } = useSelector((state) => state.course);

  return (
    <div className="my-4">
      {editCourseInfo?.courseContent?.map((section, index) => {
        return (
          <Section
            key={index}
            section={section}
            setsection={setsection}
            seteditSectionName={seteditSectionName}
          />
        );
      })}
    </div>
  );
}
