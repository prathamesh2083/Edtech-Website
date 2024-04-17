import React, { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Navbar from "./components/common/Navbar";
import Catalog from "./pages/Catalog";
import Course from "./pages/Course";
import VerifyOtp from "./pages/VerifyOtp";
import { setToken } from "./slices/authSlice";
import { setUser } from "./slices/profileSlice";
import { getUserDetails } from "./services/operations/getUserDetails";
import { useDispatch } from "react-redux";
import Dashboard from "./pages/Dashboard";
export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      dispatch(setToken(token));
      getUserDetails(token, dispatch);
    }
  }, []);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex-col flex font-inter">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/verify-email" element={<VerifyOtp></VerifyOtp>}></Route>
        <Route
          path="/catalog/:catalogName"
          element={<Catalog></Catalog>}
        ></Route>
        <Route path="/courses/:courseId" element={<Course></Course>}></Route>
        <Route path="/dashboard/:section" element={<Dashboard></Dashboard>}></Route>

        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}
