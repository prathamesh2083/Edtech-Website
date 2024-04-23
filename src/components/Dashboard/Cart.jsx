import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartCourse from "./CartCourse";
import { getCartCourses } from "../../services/operations/getCartCourses";
export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  
  const [totalItems, setTotalItems] = useState(cart.length);
  useEffect(()=>{
    getCartCourses(token,dispatch);
    console.log(cart);
  },[])
  function refresh(){
    window.location.reload();
  }
  

  return (
    <div className="text-white">
      <div className="text-[2rem] font-semibold">My cart</div>
      <div className="border-b-[1px] border-b-richblack-600 mt-16 mb-12 p-2 text-richblack-100 font-semibold ">
        {cart.length} Courses in cart
      </div>
      {cart?.length === 0 ? <div className="text-[1.4rem] font-semibold" >Cart is empty</div> :<div className="flex flex-wrap gap-4 ">
        {/* cart courses */}
        <div className="flex flex-col gap-4">
          {cart?.map((course, index) => {
            return <CartCourse refresh={refresh} course={course} key={index} />;
          })}
        </div>
        {/* checkout page */}

        <div>
          <div>Total</div>
          <div></div>
        </div>
      </div>}
      
    </div>
  );
}
