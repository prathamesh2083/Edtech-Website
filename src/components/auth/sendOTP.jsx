import  axios  from "axios";
export default async function sendOTP(email){
 try{
      const result = await axios.post("/api/sendOTP", {
        email: email,
      });
      console.log("result in opt is : ",result);
      return result;
 }
 catch(err){
    return err;
 }
}