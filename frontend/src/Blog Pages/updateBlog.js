import React, { Fragment, useState, useEffect } from "react";
import "./Post.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import TitleIcon from '@mui/icons-material/Title';
import CategoryIcon from '@mui/icons-material/Category';
import AddLinkIcon from '@mui/icons-material/AddLink';
import {  useNavigate } from "react-router-dom";
import {clearErrors,editBlog } from "../actions/blogAction";
import { useParams } from "react-router-dom";

const UpdateBlog = () => {
    
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const alert = useAlert();
    const blogId = params.id;
    
    const { error, loading, isUpdated } = useSelector((state) => state.blogs);
    
    

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");

  const Edit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("category", category);
    myForm.set("link", link);
   
    dispatch(editBlog(myForm, blogId));
    navigate(0); 
    if (isUpdated) {
        alert.info("Successfully Updated");
        
    }
    
    
};
   
  useEffect(() => {
    if (error) {
        alert.error(error);
        
      dispatch(clearErrors());
      }
    

  }, [dispatch, error, alert,isUpdated,blogId]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Blog" />
          <div className="postBlogContainer">
            <div className="postBlogBox">
              <h2 className="postBlogHeading">Update Blog</h2>

              <form
                className="postBlogForm"
                onSubmit={Edit}
              >
                <div className="postBlog">
                  <TitleIcon />
                  <input
                    type="text"
                    placeholder="Title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="postBlog">
                  <CategoryIcon />
                  <input
                    type="text"
                    placeholder="Category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="postBlog">
                  <AddLinkIcon />
                  <input
                    type="text"
                    placeholder="Link"
                    required
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="postBlogBtn"
                                      
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateBlog;