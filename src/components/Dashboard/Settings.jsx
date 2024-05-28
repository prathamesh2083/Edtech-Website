import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import Personal_Info from "./setting/Personal_Info";
import UpdatePass from "./setting/UpdatePass";
import DeleteAccount from "./setting/DeleteAccount";
import axios from "axios";

import toast from "react-hot-toast";
export default function Settings() {
  const { user } = useSelector((state) => state.profile);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [uploading,setuploading]=useState(false);
  const fileInputRef = useRef();
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
   
    if (file) {
      setImageFile(file);
      
      previewFile(file);
    }
  };
    const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    };
    
  const handleFileUpload = async(e) => {
     e.preventDefault();
    try {
      console.log("uploading..." ,imageFile);
      setuploading(true);
     
     
      if(!imageFile){
        console.log("not found");
        
      }
      const formData=new FormData();
      formData.append('imageFile', imageFile);

      
      var url = import.meta.env.VITE_REACT_APP_BASE_URL;
       const result = await axios.post(
         `${url}/profile/updateProfilePicture`,
         formData
       );
       console.log( "result is  ",result);
       toast.success("Profile updated successfully");
       setuploading(false);
       window.location.reload();
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);
  return (
    <div className="text-white">
      <div className="text-[2rem] font-semibold w-full   ">Edit Profile</div>
      <div className=" w-full flex flex-wrap justify-center md:justify-start bg-richblack-800 border-[1px] border-richblack-700 p-2 md:p-8 gap-4 my-8 rounded-md  ">
        <img
          src={previewSource || user?.image}
          className=" w-[70px] h-[70px] rounded-full"
        ></img>
        <div className="flex flex-col gap-2">
          <div>Change Profile Picture</div>
          
            <div className="flex gap-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg,image/jpg"
              />
              <div
                onClick={handleClick}
                className="w-[100px] font-semibold bg-richblack-700 p-2 text-center rounded-md hover:scale-105 duration-700 transition-all"
              >
                Select
              </div>
              <div
                onClick={handleFileUpload}
                className="w-[100px]flex gap-2 items-center font-bold  bg-yellow-50 p-2 text-center text-black  rounded-md hover:scale-105 duration-700 transition-all"
              >
                {uploading ? "Updating..." : "Update"}
                <FiUpload
                  className={`inline mx-2 ${uploading && "animate-bounce"}   `}
                  size={"20px"}
                />
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
