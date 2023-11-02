import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { BlogReducer, blogReviewsReducer } from "./reducers/blogReducer";

const middleware = [thunk];

const reducer = {

  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  blogs: BlogReducer,
  review : blogReviewsReducer,

};

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
