import React, { useEffect, useState } from "react";
import axios from "axios";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { GrFormNextLink } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import toast from "react-hot-toast";
export default function CourseInfo() {
  const [categories, setcategories] = useState([]);
  const [tags, settags] = useState([]);
  const [thumbnail, setthumbnail] = useState(null);
  const [image, setimage] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setthumbnail(URL.createObjectURL(acceptedFiles[0]));
    setimage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [info, setinfo] = useState({
    courseName: "",
    courseDescription: "",
    price: 0,
    categoryId: "",
    courselevel: "All",
    courseLanguage: "English",
    tag: tags,
    benefits: "",
  });
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get("/api/showAllCategories");

        setcategories(result?.data?.data);
      } catch (err) {
        console.log("Error in fetching categories in add course");
      }
    })();
  }, []);
  const handleaddtag = (e) => {
    if (e.keyCode === 13) {
      let val = e.target.value;
      if (!tags || !tags?.includes(val)) {
        settags((prev) => [...prev, val]);
      }
      e.target.value = "";
    }
    setinfo((prev) => {
      return {
        ...prev,
        tag: tags,
      };
    });
  };
  const removetag = (e) => {
    var val = e.target.getAttribute("value");

    var array = tags.filter((tag) => {
      return val !== tag;
    });
    settags(array);
  };
  const handlechange = (e) => {
    const term = e.target.name;
    const val = e.target.value;
    setinfo((prev) => {
      return {
        ...prev,
        [term]: val,
      };
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (
        !info.courseName ||
        !info.courseDescription ||
        !info.benefits ||
        !info.price ||
        info.tag.length == 0 ||
        !image ||
        !info.categoryId ||
        !info.courselevel ||
        !info.courseLanguage
      ) {
        toast.error("All fields are required ");
        
        return;
      }
     
      var form = new FormData();
      Object.entries(info).forEach(([key, value]) => {
        form.append(key, value);
      });
      form.append("thumbnail", image);
      console.log("form is ", form);
      const result = await axios.post("/api/createCourse", form);
      console.log("result is ", result);
      if (result.data.data) {
        toast.success("Course details added successfully ");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error in adding course details");
      console.log("Error in creating course");
    }
    
  };
  return (
    <div onSubmit={handlesubmit} className="w-full">
      <form className="flex flex-col gap-8 mt-16 bg-richblack-800 md:p-8 p-4 rounded-lg ">
        <div className="flex flex-col gap-1">
          <label>Course Title</label>
          <input
            onChange={handlechange}
            name="courseName"
            type="text"
            placeholder="Enter Course Title"
            className=" h-[45px] shadow-sm shadow-richblack-400 p-2 rounded-md  bg-richblack-700"
          ></input>
        </div>
        <div className="flex flex-col gap-1">
          <label>Course Description</label>
          <textarea
            type="textarea"
            onChange={handlechange}
            name="courseDescription"
            placeholder="Enter Course Description"
            className=" resize-x-none min-h-[130px] shadow-sm shadow-richblack-400 p-2 rounded-md  bg-richblack-700"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1 relative ">
          <label>Course Price</label>

          <IoCloudUploadOutline
            size={"25px"}
            className="h-[45px]  text-richblack-300 absolute  box-border translate-y-[30px] translate-x-2 "
          />
          <input
            onChange={handlechange}
            name="price"
            type="number"
            placeholder="Enter Course Price"
            className="h-[45px] px-[50px] shadow-sm shadow-richblack-400 p-2 rounded-md  bg-richblack-700"
          ></input>
        </div>

        <div className="flex flex-col gap-1 w-full ">
          <label>Thumbnail of Course</label>
          <div
            {...getRootProps()}
            className="bg-richblack-700  min-h-[200px] flex flex-col items-center gap-4 justify-center rounded-md p-4 text-richblack-300 "
          >
            {thumbnail ? (
              <div className="flex flex-col gap-2 items-center w-[90%]">
                <img src={thumbnail} className="w-full max-h-[300px]"></img>
                <div
                  className="p-1"
                  onClick={() => {
                    setthumbnail(null);
                  }}
                >
                  Cancel{" "}
                </div>
              </div>
            ) : (
              <div>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div className="flex flex-col items-center justify-center">
                    <p>Drop the files here ...</p>
                    <IoCloudUploadOutline
                      color="yellow"
                      size={"20px"}
                      className="bg-black rounded-full w-[50px] h-[50px] p-2 aspect-square "
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                    <IoCloudUploadOutline
                      color="yellow"
                      size={"20px"}
                      className="bg-black rounded-full w-[50px] h-[50px] p-2 aspect-square "
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label>Course Category</label>
          <select
            onChange={handlechange}
            name="categoryId"
            data-gtm-form-interact-field-id="3"
            type="text"
            placeholder="Enter Course Category"
            className="h-[45px]  flex flex-col gap-2 shadow-sm shadow-richblack-400 p-2 py-[15px] rounded-md  bg-richblack-700"
          >
            {" "}
            {categories?.map((category, index) => {
              return (
                <option
                  key={index}
                  value={category?._id}
                  className="form-style p-2 bg-richblack-700 "
                >
                  {category?.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label>Course Level</label>
          <select
            onChange={handlechange}
            name="courselevel"
            type="text"
            placeholder="Enter Course Level"
            className="h-[45px] shadow-sm shadow-richblack-400 p-2 rounded-md  bg-richblack-700"
          >
            <option value="All">All</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label>Course Language</label>
          <select
            onChange={handlechange}
            name="courseLanguage"
            type="text"
            placeholder="Enter Course Language"
            className="h-[45px] shadow-sm shadow-richblack-400 p-2 rounded-md  bg-richblack-700"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Marathi">Marathi</option>
          </select>
        </div>
        <div className=" flex flex-col gap-1 my-2 ">
          <label>Course Tags</label>
          <div className="flex flex-wrap gap-2 ">
            {tags?.map((tag, index) => (
              <div
                key={index}
                className="text-black p-1 my-2 min-w-[50px] text-center px-2 bg-yellow-100 rounded-full flex  items-center justify-center"
              >
                {" "}
                <span className="w-full">{tag}</span>{" "}
                <span
                  onClick={removetag}
                  value={tag}
                  className="hover:cursor-pointer mx-1 w-[20px] flex justify-center items-center"
                >
                  x
                </span>
              </div>
            ))}
          </div>
          <input
            type="text"
            onKeyDown={handleaddtag}
            placeholder="Enter Tag and press Enter"
            className="shadow-sm shadow-richblack-400 p-2 rounded-md  bg-richblack-700"
          ></input>
        </div>
        <div className=" flex flex-col gap-1">
          <label>Benefits of Course</label>
          <textarea
            onChange={handlechange}
            name="benefits"
            type="textarea"
            placeholder="Enter Benefits of course"
            className=" resize-x-none min-h-[130px] shadow-sm shadow-richblack-400 p-2 rounded-md  bg-richblack-700"
          ></textarea>
        </div>
        <div className="w-full  flex justify-end">
          <button
            type="submit"
            className="bg-yellow-200 p-2 px-4 text-black hover:scale-105 transition-all duration-700 rounded-md  flex items-center "
          >
            Next
            <GrFormNextLink className="inline  " size={"25px"} />
          </button>
        </div>
      </form>
    </div>
  );
}
