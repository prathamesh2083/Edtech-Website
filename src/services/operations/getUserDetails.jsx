import axios from "axios";
import { setUser } from "../../slices/profileSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export async function getUserDetails(token, dispatch) {
  try {
    var url = import.meta.env.VITE_REACT_APP_BASE_URL;
    const result = await axios.post(
      `${url}/profile/getAllDetails`,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

     console.log("token is ",result);
     console.log("user details",result.data.user);
    dispatch(setUser(result.data.user));
    return 1;
  } catch (err) {
    toast.error("Session is expired");
    console.log(err);
    console.log("error in getting user details");
  }
  return 0;
}
