import axios from "axios";
import { setAlert } from "./alert";


import {
    GET_PROFILE,
    PROFILE_ERROR 
} from './types';

//  get current user's profile

export const getCurrentProfile = () => async (dispatch) => {
    try {
      const res = await axios.get("/api/profile/me"); // Ensure this endpoint is correct
  
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (err) {
      console.error("getCurrentProfile Error:", err); // Debugging log
  
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText || "Unknown Error", // Safe fallback
          status: err.response?.status || 500, // Default to 500 if undefined
        },
      });
    }
  };
  