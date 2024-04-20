import React from "react";
import { useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import Personal_Info from "./setting/Personal_Info";
import UpdatePass from "./setting/UpdatePass";
import DeleteAccount from "./setting/DeleteAccount";
export default function Settings() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="text-white">
      <div className="text-[2rem] font-semibold w-full   ">Edit Profile</div>
      <div className=" w-full flex flex-wrap justify-center md:justify-start bg-richblack-800 border-[1px] border-richblack-700 p-2 md:p-8 gap-4 my-8 rounded-md  ">
        <img
          src={user?.image}
          className=" w-[70px] h-[70px] rounded-full"
        ></img>
        <div className="flex flex-col gap-2">
          <div>Change Profile Picture</div>
          <div className="flex gap-4">
            <div className="w-[100px] font-semibold bg-richblack-700 p-2 text-center rounded-md hover:scale-105 duration-700 transition-all">
              Select
            </div>
            <div className="w-[100px]flex gap-2 items-center font-bold  bg-yellow-50 p-2 text-center text-black  rounded-md hover:scale-105 duration-700 transition-all">
              Update
              <FiUpload className="inline mx-2" size={"20px"} />
            </div>
          </div>
        </div>
      </div>
      <Personal_Info user={user} />
      <UpdatePass user={user} />
      <DeleteAccount user={user} />
    </div>
  );
}
