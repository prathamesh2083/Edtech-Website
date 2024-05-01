import axios from "axios";
import { setUser } from "../../slices/profileSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export async function getUserDetails(token, dispatch) {
  try {
    const result = await axios.post(
      "/api/profile/getAllDetails",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    
    dispatch(setUser(result.data.user));
    return 1;
  } catch (err) {
    toast.error("Session is expired");

    console.log("error in getting user details");
  }
  return 0;
}
