import toast from "react-hot-toast";

import rzp_logo from "../../assets/Logo/rzp_logo.png";
function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script");
        script.src=src;

        script.onload=()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(){
    const toastId=toast.loading("Loading...");

    try{
      const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if(!res){
        toast.error("Razorpay failed to load");
      }

      const orderResponse=await axios.post("/api/payments/capturePayment",{courses},{
        Authorization:`Bearer ${token}`
      })
      if(!orderResponse.data.success){
        throw new Error(orderResponse.data.message);
      }
      const options={
        key:process.env.RAZORPAY_KEY,
        currency:orderResponse.data.data.currency,
        amount:orderResponse.data.data.price,
        order_id:orderResponse.data.data.id,
        name:"studyNotion",
        description:"Thank you for purchasing thr course",
        image:rzp_logo ,
        prefill:{
            name:`${userDetails.firstName}`,
            email:userDetails.email
        } ,
        handler: {
            sendPaymentSuccessEmail(response, orderResponse.data.data.amount,token);
            verifyPayment({...Response,courses},token,navigate,dispatch);
        }
      };

      
    }
    catch(err){

      console.log("Payment error");
      console.log(err);
    }
}

async function sendPaymentSuccessEmail(response,amount,token){
    try{
        await axios.post("/api/payment/sendPaymentSuccessEmail",{
            orderId:response.razorpay_order_id,
            paymenId:response.razorpay_payment_id,
            amount,
        },{
            Authorization:`Bearer ${token}`
        })
    }
    catch(err){
      console.log("Payment success email error");
    }
}