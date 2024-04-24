import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartCourse from "./CartCourse";
import { getCartCourses } from "../../services/operations/getCartCourses";
import Button from "../Homepage/Button";
export default function Cart() {
  const dispatch = useDispatch();
  const{totalItems}=useSelector((state)=>state.cart);
  const navigate = useNavigate();
  
  const [cart,setcart]=useState([]);
  const { token } = useSelector((state) => state.auth);
  const [totalprice,settotalprice]=useState(0);
  
  useEffect(()=>{
    (async()=>{
      const result = await getCartCourses(token, dispatch);
        
          setcart(result.data.cartCourses);
          var pricesum=0;
          for(var i=0;i<result.data.cartCourses.length;i++){
            pricesum+=result.data.cartCourses[i].price;
          }
          settotalprice(pricesum);
         
         
    })()
    
  },[])
 

  return (
    <div className="text-white">
      <div className="text-[2rem] font-semibold">My cart</div>
      <div className="border-b-[1px] border-b-richblack-600 mt-16 mb-12 p-2 text-richblack-100 font-semibold ">
        {cart?.length} Courses in cart
      </div>
      {cart?.length === 0 ? <div className="text-[1.4rem] font-semibold" >Cart is empty</div> :
      <div className="flex flex-wrap  gap-8 ">
        {/* cart courses */}
        <div className="flex flex-col gap-4">
          {cart?.map((course, index) => {
            return <CartCourse totalprice={totalprice} settotalprice={settotalprice} course={course} key={index} />;
          })}
        </div>
        {/* checkout page */}

        <div className="bg-richblack-800 rounded-md w-full max-w-[300px] mx-auto h-fit p-4 flex flex-col  gap-1 py-8" >
          <div className="text-[1.2rem] font-semibold">Total</div>
          <div className="text-yellow-50 text-[2rem] font-semibold  " >Rs. {totalprice}</div>
          <Button active width={"w-full"} >Buy Now</Button>
        </div>
      </div>}
      
    </div>
  );
}
