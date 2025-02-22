import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR , UPDATE_LIKES , DELETE_POST} from "./types";

// get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response?.statusText || "Unknown Error", // Safe fallback
        status: err.response?.status || 500, // Default to 500 if undefined
      },
    });
  }
};
// Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response?.statusText || "Unknown Error", // Safe fallback
        status: err.response?.status || 500, // Default to 500 if undefined
      },
    });
  }
};

// remove  like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response?.statusText || "Unknown Error", // Safe fallback
        status: err.response?.status || 500, // Default to 500 if undefined
      },
    });
  }
};

// delete post
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      payload: { postId },
    });

    dispatch(setAlert('Pst Removed' , 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response?.statusText || "Unknown Error", // Safe fallback
        status: err.response?.status || 500, // Default to 500 if undefined
      },
    });
  }
};