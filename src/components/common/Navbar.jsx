import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks as links } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from "../auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import axios from "axios";
import { IoIosArrowDropdownCircle } from "react-icons/io";
export default function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  function matchRoute(route) {
    return matchPath({ path: route }, location.pathname);
  }


  const [sublinks,setsublinks]=useState([]);

  const fetchsublinks=async()=>{
    
           try {
           
              const result=await axios.get("/api/showAllCategories");
             
              setsublinks(result.data.data);
             
           } catch (err) {
            console.log(err);
          
           }
  }
  useEffect(()=>{
   fetchsublinks();
  },[])
  return (
    <div className="flex flex-wrap h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex flex-wrap w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img src={logo} width={160} height={42} loading="lazy"></img>
        </Link>

        <nav>
          <ul className="flex flex-wrap gap-x-6 text-richblack-25 ">
            {links.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="group relative">
                      <p className="flex items-center gap-1 ">
                        {link.title}
                        <IoIosArrowDropdownCircle />
                      </p>

                      <div
                        className=" invisible absolute left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-[100%] z-10 w-[300px] text-black
                      translate-x-[-45%] translate-y-[15%] "
                      >
                        <div className="absolute left-[50%] top-1 h-6 w-6 rotate-45 rounded bg-richblack-5 translate-y-[-30%]"></div>
                        <div className="flex flex-col gap-1 p-2 text-[17px]">
                          {sublinks.map((lnk, index) => {
                          return (
                            <Link

                            className=" hover:bg-richblack-50 p-3 rounded-md"
                              key={index}
                              to={`/catalog/${lnk.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                            >
                              {lnk.name}
                            </Link>
                          );
                        })}
                        </div>
                        
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link?.path}
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* login / signup /dashboard */}
        <div className="flex gap-x-4 items-center">
          {user && user.accountType != "Instructor" ? (
            <Link to="/dashboard/cart" className="relative">
              <FaShoppingCart />
              {totalItems > 0 ? <span>{totalItems}</span> : <div></div>}
            </Link>
          ) : (
            <div></div>
          )}

          {token === null && (
            <Link to="/login" className="text-white">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup" className="text-white">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                signup
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
}
