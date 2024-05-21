import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Player } from 'video-react';

export default function VideoDetails() {
  const location=useLocation();
  const {courseSectionData}=useSelector((state)=>state.viewCourse);
  const [video,setvideo]=useState("");
  const {subSectionId,sectionId}=useParams();
  useEffect(()=>{
  const currentSectionIndex = courseSectionData.findIndex(
    (data) => data._id === sectionId
  );

  const currentsubSectionIndex = courseSectionData?.[
    currentSectionIndex
  ]?.subSection.findIndex((data) => data._id === subSectionId);

  const activeSubsection =
    courseSectionData[currentSectionIndex]?.subSection?.[currentsubSectionIndex];
  console.log(activeSubsection);
  setvideo(activeSubsection.videoUrl);
  
  },[subSectionId,sectionId,location.pathname]);
  return (
    <div className="">
      <Player aspectRatio="16:9" playsInline src={video} />
      {video}
    </div>
  );
}
