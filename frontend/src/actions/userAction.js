
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CLEAR_ERRORS,
  } from "../constants/userConstants";
  import axios from "axios";
const hostname = "13.48.67.62";
const port = "4000";
  // Login
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true // Set withCredentials to true
      };
  
      const { data } = await axios.post(
        `http://${hostname}:${port}/api/v1/login`,
        { email, password },
        
        config
      );
      
  
      dispatch({ type: LOGIN_SUCCESS,payload: { user: data.user, token: data.token } });
    } catch (error) {
      
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };
  
  // Register
  export const register = (userData) => async (dispatch) => {
    try {
      
      dispatch({ type: REGISTER_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data"} ,withCredentials: true};
     
      const { data } = await axios.post(`http://${hostname}:${port}/api/v1/register`, userData, config);
      
      dispatch({ type: REGISTER_USER_SUCCESS,payload: { user: data.user, token: data.token } });
    } catch (error) {
     
      dispatch({
        
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Load User
export const loadUser = () => async (dispatch) => {
    
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const { data } = await axios.get(`http://${hostname}:${port}/api/v1/me`,{ withCredentials: true});
  
      dispatch({ type: LOAD_USER_SUCCESS, payload: { user: data.user, token: data.token } });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
  };
  
  // Logout User
  export const logout = () => async (dispatch) => {
    try {
      await axios.get(`http://${hostname}:${port}/api/v1/logout`,{ withCredentials: true});
  
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
  };
  
  // Update Profile
  export const updateProfile = (userData) => async (dispatch) => {
    try {

      dispatch({ type: UPDATE_PROFILE_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } ,withCredentials: true};
      
  
      const { data } = await axios.put(`http://${hostname}:${port}/api/v1/me/update`, userData, config);
  
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Update Password
  export const updatePassword = (userData) => async (dispatch) => {
    try {
      
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
    
      const config = { headers: { "Content-Type": "multipart/form-data" } ,withCredentials: true };
     
      const { data } = await axios.put(
        `http://${hostname}:${port}/api/v1/password/update`,
        userData,
        config
      );
      
  
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Forgot Password
  export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
      
      const config = { headers: { "Content-Type": "application/json" } ,withCredentials: true };
  
      const { data } = await axios.post(`http://${hostname}:${port}/api/v1/password/forget`, email, config);
  
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Reset Password
  export const resetPassword = (token, password,confirmedPassword) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } ,withCredentials: true };
      
      const { data } = await axios.put(
        `http://${hostname}:${port}/api/v1/password/reset/${token}`,
        { token,password, confirmedPassword },
        config
      );
  
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  

  


  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };