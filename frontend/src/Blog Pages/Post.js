import React, { Fragment, useState, useEffect } from "react";
import "./Post.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, postBlog } from "../actions/blogAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import TitleIcon from '@mui/icons-material/Title';
import CategoryIcon from '@mui/icons-material/Category';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { useNavigate } from "react-router-dom";

const PostBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isPosted, loading } = useSelector((state) => state.blogs);
  

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");

  const postBlogSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("category", category);
    myForm.set("link", link);
   
    dispatch(postBlog( myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      }
      if (isPosted) {
          navigate("/");
      }
    

  }, [dispatch, error, alert, navigate,isPosted]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Post Blog" />
          <div className="postBlogContainer">
            <div className="postBlogBox">
              <h2 className="postBlogHeading">Post New Blog</h2>

              <form
                className="postBlogForm"
                onSubmit={postBlogSubmit}
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
                  value="Post"
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

export default PostBlog;