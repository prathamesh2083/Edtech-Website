import React, { useEffect } from 'react'
import *as Icons from "react-icons/vsc";
import { Link, useLocation } from 'react-router-dom';
export default function SidebarLink({name,path,icon}) {
    const loaction=useLocation();
    
    const Icon=Icons[icon];
  return (
    <Link to={path} className={`text-sm font-medium ${path==location.pathname?"bg-yellow-800 border-l-4 border-yellow-5 transition-all duration-200 opacity-95 text-yellow-50 ":""} py-4 pl-4  flex gap-1 items-center  px-2 w-full`} >
    <Icon size={"17px"} />
    <div>{name}</div>
    
    </Link>
  )
}
