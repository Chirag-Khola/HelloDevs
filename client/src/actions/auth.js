import axios from "axios";
import { setAlert } from "./alert";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

// Register User

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/users", body, config);
      const { token, user } = res.data;
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          token,
          user,
          isAuthenticated: true,
          loading: false,
        },
      });

      console.log("Dispatching REGISTER_SUCCESS:", {
        token,
        user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
