import { combineReducers } from "redux";
import alert from "./alert"; // Assuming you have an alert reducer
import authReducer from "./auth"; // Assuming the path to your auth reducer
import profile from "./profile";
import post from "./post";

const rootReducer = combineReducers({
  alert,
  auth: authReducer,
  profile,
  post,
});

// Wrapping rootReducer with a logging function for debugging
const debugReducer = (state, action) => {
  console.log("State Before Action:", state);
  const nextState = rootReducer(state, action);
  console.log("State After Action:", nextState);
  return nextState;
};

export default rootReducer; // Exporting the debugReducer instead of rootReducer
