import {
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCESS,
  ALL_BLOG_FAIL,
  CLEAR_ERRORS,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  POST_BLOG_REQUEST,
  POST_BLOG_REQUEST_SUCCESS,
  POST_BLOG_REQUEST_FAIL,
  DEL_BLOG_REQUEST,
  DEL_BLOG_REQUEST_SUCCESS,
  DEL_BLOG_REQUEST_FAIL,
  EDIT_BLOG_REQUEST,
  EDIT_BLOG_REQUEST_SUCCESS,
  EDIT_BLOG_REQUEST_FAIL
} from "../constants/blogConstants"
import axios from "axios"
const hostname = "13.48.67.62";
const port = "4000";


export const getBlog =  (keyword = "", currentPage = 1) => async (dispatch) => {
    try {
        dispatch({ type: ALL_BLOG_REQUEST });
        const { data } = await axios.get(`http://${hostname}:${port}/api/v1/blogs?&page=${currentPage}`,{ withCredentials: true});
        dispatch({
            type: ALL_BLOG_SUCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ALL_BLOG_FAIL,
            payload: error.response.data.message,
        });
    }
};
// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEW_REQUEST });
  
      const { data } = await axios.get(`http://${hostname}:${port}/api/v1/reviews?&id=${id}`);
  
      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data.reviews,
      });
    } catch (error) {
      dispatch({
        type: ALL_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
};
export const postBlog = (blogData) => async (dispatch) => {
  try {
    
    dispatch({ type: POST_BLOG_REQUEST });
  
    const config = { headers: { "Content-Type": "multipart/form-data" } ,withCredentials: true };
   
    const { data } = await axios.post(
      `http://${hostname}:${port}/api/v1/admin/blog/new`,
      blogData,
      config
    );
    

    dispatch({ type: POST_BLOG_REQUEST_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: POST_BLOG_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const editBlog = (blogData,id) => async (dispatch) => {
  try {
   
    dispatch({ type: EDIT_BLOG_REQUEST });
  
    const config = { headers: { "Content-Type": "multipart/form-data" } ,withCredentials: true };
   
    const { data } = await axios.put(
      `http://${hostname}:${port}/api/v1/admin/blog/${id}`,
      blogData,
      config
    );
    

    dispatch({ type: EDIT_BLOG_REQUEST_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: EDIT_BLOG_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const delBlog = (id) => async (dispatch) => {
  try {
    
    dispatch({ type: DEL_BLOG_REQUEST });
  
    const config = { headers: { "Content-Type": "multipart/form-data" } ,withCredentials: true };
   
    const { data } = await axios.delete(
      `http://${hostname}:${port}/api/v1/admin/blog/${id}`,
      config
    );
    

    dispatch({ type: DEL_BLOG_REQUEST_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DEL_BLOG_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
dispatch({ type: CLEAR_ERRORS });
};