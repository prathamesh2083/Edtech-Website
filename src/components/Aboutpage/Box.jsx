import React from 'react'

export default function Box({heading,body,active}) {
  return (
    <div
      className={` aspect-square flex flex-col justify-start gap-16 pt-16 p-8 w-[25%] min-w-[310px] text-center px-2  min-h-[220px]  ${
        active ? "bg-richblack-800 text-white" : "bg-richblack-600"
      } `}
    >
      <div className="text-start w-[80%] mx-auto">{heading}</div>
      <div className="text-start w-[80%] mx-auto">{body}</div>
    </div>
  );
}
