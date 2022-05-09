import axios from "./axios";
import { useSelector, useDispatch } from "react-redux";
import { reqAuth } from "../redux/authRedux";

const useRefreshToken = () => {
  const globalData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refToken");
      //PUSH NEW ACCESS TOKEN TO GLOBAL STATE!
      dispatch(
        reqAuth({ ...globalData, accessToken: response.data.accessToken })
      );
      return response.data.accessToken;
    } catch (err) {
      console.log(err);
    }
  };
  return refresh;
};

export default useRefreshToken;
