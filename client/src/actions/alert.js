import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid"; // Correct way to import v4 from uuid

// Action creator to set an alert
export const setAlert = (msg, alertType , timeout=5000) => (dispatch) => {
  const id = uuidv4(); // Generate a unique ID
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  // Automatically remove the alert after 5 seconds
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout); // Fixed "payload" typo
};

// Optionally, you can add a remove alert action (if used elsewhere)
export const removeAlert = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id,
  });
};
