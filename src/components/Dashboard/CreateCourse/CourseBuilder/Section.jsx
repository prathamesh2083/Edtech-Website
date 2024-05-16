import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
export default function Section({ section, seteditSectionName, setsection }) {
  const [showSubSection, setshowSubSection] = useState(false);
  const handleeditsection = () => {
    setsection(section.sectionName);
    seteditSectionName(section._id);
  };
  return (
    <div className="w-full my-4 flex justify-between md:px-8 bg-richblack-700 p-4 rounded-lg ">
      <div>{section.sectionName}</div>
      <div className="flex gap-1 items-center">
        <MdEdit
          onClick={handleeditsection}
          size={"25px"}
          className="text-richblack-200"
        />
        <MdDelete size={"25px"} className="text-richblack-200" />
        <FaCaretDown className="text-richblack-200" />
      </div>
    </div>
  );
}
