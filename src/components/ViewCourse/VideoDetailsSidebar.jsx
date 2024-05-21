import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../common/IconBtn";
export default function VideoDetailsSidebar({ setreviewModal }) {
  const [activeSection, setactiveSection] = useState("");
  const [activesubSection, setactivesubSection] = useState("");
  const [videobaractive, setvideobaractive] = useState("");
  const navigate = useNavigate();
  const { sectionId, subSectionId, courseId } = useParams();
  const location = useLocation();
  const {
    courseSectionData,
    EntirecourseData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);
  useEffect(() => {
    (() => {
      if (courseSectionData.length === 0) {
        toast.error("No lectures found in this course");
        return;
      }
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentsubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      const activeSubsectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentsubSectionIndex
        ]?._id;

      setactiveSection(courseSectionData?.[currentSectionIndex]?._id);
      setactivesubSection(activeSubsectionId);
    })();
  }, [courseSectionData, EntirecourseData, location.pathname]);
  return (
    <>
      <div>
        <div>
          <div className="flex gap-x-3">
            <div onClick={() => navigate("/dashboard/enrolled-courses")}>
              <IoChevronBackCircleOutline size={"30px"} />
            </div>
            <div>
              <IconBtn
                text="Add Review"
                active
                onClick={()=>setreviewModal(true)}
              />
            </div>
          </div>
          <div>
            <p>{EntirecourseData?.courseName}</p>
            <p>
              {completedLectures ? completedLectures : 0}/{totalNoOfLectures}
            </p>
          </div>
        </div>

        <div>
          {courseSectionData?.map((section, index) => (
            <div onClick={() => setactiveSection(section._id)}>
              <div key={index} className="flex gap-x-3">
                <div> {section.sectionName}</div>
                <div>^</div>
              </div>

              <div>
                {activeSection === section._id && (
                  <div>
                    {section.subSection?.map((subsection, index) => (
                      <div
                        onClick={() =>{

                          navigate(
                            `/view-course/${courseId}/section/${section._id}/sub-section/${subsection._id}`
                          )
                          setactivesubSection(subsection._id)
                        }
                        }
                        className={`flex ${
                          subsection._id === activesubSection
                            ? "bg-yellow-50 text-black "
                            : "bg-black text-white"
                        } `}
                      >
                        <div>
                          <input
                            type="checkbox"
                            checked={completedLectures?.includes(
                              subsection?._id
                            )}
                          ></input>
                        </div>
                        <div>{subsection.title}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
