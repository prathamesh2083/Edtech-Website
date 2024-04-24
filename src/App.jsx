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
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./services/auth/PrivateRoute";
import PageNotFound from "./pages/PageNotFound";
import { getCartCourses } from "./services/operations/getCartCourses";
import { setcart } from "./slices/cartSlice";
import Logout from "./services/auth/Logout";
import toast from "react-hot-toast";
import { setTotalItems } from "./slices/cartSlice";
export default function App() {
  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (localStorage.getItem("token")) {
        const token = JSON.parse(localStorage.getItem("token"));

        dispatch(setToken(token));
        if (!(await getUserDetails(token, dispatch))) {
          toast.error("Your session is expired");
          alert("not valid token");
          Logout(dispatch, navigate);
          return;
        }
        if(user?.accountType==="Student"){

          const cartresult = await getCartCourses(token, dispatch);
  
          dispatch(setTotalItems(cartresult.data.cartCourses.length));
        }
      }
    })();
  }, [totalItems]);
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

        {/* <Route path="/dashboard/:section" element={<Dashboard></Dashboard>}></Route> */}
        <Route
          path="/dashboard/:section"
          element={
            <PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>
          }
        ></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}
