import axios from "axios";
import { setcart } from "../../slices/cartSlice";
export async function getCartCourses(token, dispatch) {
  try {
    const result = await axios.get(
      "/api/cart/getcartcourses",

      {
        Authorization: `Bearer ${token}`,
      }
    );
     
    dispatch(setcart(result.data.cartCourses));
    // window.location.reload();
  } catch (err) {
    console.log(err);
    console.log("error in getting cart courses");
  }
}
