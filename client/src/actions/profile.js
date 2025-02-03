import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR , UPDATE_PROFILE } from "./types";

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

//  create or update a profile

export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert(edit ? "Profile Updated" : "Profile Created" , 'success'));

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText || "Unknown Error", // Safe fallback
          status: err.response?.status || 500, // Default to 500 if undefined
        },
      });
    }
  };

// Add Experience
export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    // Redirect to dashboard (Use navigate function)
    navigate("/dashboard");

  } catch (err) {
    console.error("Error in addExperience:", err);

    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText || "Unknown Error", // Safe fallback
        status: err.response?.status || 500, // Default to 500 if undefined
      },
    });
  }
};


    // add education

    export const addEducation = (formData , history) => async (dispatch) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
  
        const res = await axios.put("/api/profile/education", formData, config);
  
        dispatch({
          type: UPDATE_PROFILE,
          payload: res.data,
        });
  
        dispatch(setAlert('Education Added' , 'success'));
  
        
          history.push("/dashboard");
         
      } catch (err) {
        const errors = err.response.data.errors;
  
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
  
        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: err.response?.statusText || "Unknown Error", // Safe fallback
            status: err.response?.status || 500, // Default to 500 if undefined
          },
        });
      } 
    }
  
