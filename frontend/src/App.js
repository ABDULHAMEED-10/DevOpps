import React from 'react';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import "../src/CSS/App.css"
import Profile from './Auth Pages/Profile';
import LoginSignUp from "./Auth Pages/LoginSignUp"
import Forget from "./Auth Pages/ForgotPassword"
import Reset from "./Auth Pages/ResetPassword"
import UpdatePassword from "./Auth Pages/UpdatePassword"
import UpdateProfile from "./Auth Pages/UpdateProfile"
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from './store';
import { loadUser } from './actions/userAction';
import About from "./layout/About/About";
import Contact from "./layout/Contact/Contact";
import AllPosts from './Blog Pages/AllPosts';
import BlogReview from './Blog Pages/Blog Reviews/BlogReview'
import Post from "./Blog Pages/Post"
import UpdateBlog from './Blog Pages/updateBlog';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  React.useEffect(() => {
    
    store.dispatch(loadUser());
  }, []);
  return (
    // password reset route for forget
    // profile -> update Profile or Update password
    <Router>
     
      <div>
      
        <Routes>
          <Route exact path="/" element={<AllPosts />} />
          <Route exact path="/blog/:keyword" element={<AllPosts />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/password/forgot" element={<Forget />} />
          <Route exact path="/password/reset/:token" element={<Reset />} />
          <Route exact path="/blog/:id" element={<BlogReview />} /> 
          {/* Authenticated user can acess only */}
          <Route exact path="/password/update" element={isAuthenticated ? (<UpdatePassword />) : (<Navigate to="/login" replace state={{ from: "/password/update" }} />)} />
          <Route exact path="/me/update" element={isAuthenticated ? (<UpdateProfile />) : (<Navigate to="/login" replace state={{ from: "/me/update"}} />)}/>
          <Route exact path="/me" element={isAuthenticated ? (<Profile />) : (<Navigate to="/login" replace state={{ from: '/me' }} />)} />
          <Route exact path="/admin/blog/new" element={isAuthenticated ? (<Post />) : (<Navigate to="/login" replace state={{ from: '/admin/blog/new' }} />)} />
          <Route exact path='/admin/blog/:id' element={isAuthenticated ? (<UpdateBlog />) : (<Navigate to="/login" replace state={{ from: '/admin/blog/:id' }} />)} />
          
          
          
          
        </Routes>
              
      </div>
 
    </Router>
  )
}

export default App;