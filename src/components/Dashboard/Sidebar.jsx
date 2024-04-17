import React, { useEffect, useState } from "react";
import Logout from "../../services/auth/Logout";
import SidebarLink from "./SidebarLink";
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../data/dashboard-links";
import ConfirmationModal from "../common/ConfirmationModal";
import { GrLogout } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const [confirmationmodal, setconfirmationmodal] = useState(false);
  useEffect(()=>{
   console.log(confirmationmodal);
  },[confirmationmodal])
  const handlelogout = async (e) => {
    setconfirmationmodal(true);
  };
  return (
    <div className="text-white flex flex-col  w-[15%] pt-12 bg-richblack-800 py-4">
      {sidebarLinks?.map((sidelink, index) => {
        return sidelink.type && sidelink?.type !== user?.accountType ? null : (
          <SidebarLink
            name={sidelink.name}
            path={sidelink.path}
            icon={sidelink.icon}
          ></SidebarLink>
        );
      })}
      <div className="w-[90%] mx-auto border-[1px] my-4  border-richblack-600"></div>
      <SidebarLink
        name={"Settings"}
        path={"/dashboard/setting"}
        icon={"VscSettingsGear"}
      />
      <div
        className="text-sm font-medium  py-4 pl-4  flex gap-1 items-center  px-2 w-full"
        onClick={handlelogout}
      >
        <GrLogout className="inline" size={"17px"} /> Logout
      </div>
      {confirmationmodal && (
        <ConfirmationModal
          modalData={{
            text1: "Are you sure?",
            text2: "You will loggout from account",
            btn1handler: () => dispatch(Logout(dispatch, navigate)),
            btn2handler:()=>setconfirmationmodal(false),
            btntext1: "Logout",
            btntext2: "Cancel",
          }}
        ></ConfirmationModal>
      )}
    </div>
  );
}
