import axios from "axios";
import { setUser } from "../../slices/profileSlice";
export async function getUserDetails(token,dispatch){
 
     try{
       const result = await axios.post(
         "/api/profile/getAllDetails",
         {},
         {
           Authorization: `Bearer ${token}`,
         }
       );
       
       dispatch(setUser(result.data.user));
   
     }
     catch(err){
       console.log("error in getting user details");
       
     }
}
