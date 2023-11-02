import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import './allPosts.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { delBlog,clearErrors } from "../actions/blogAction";
import { useAlert } from "react-alert";
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@mui/material';


const BlogCard = ({ blog }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { isDeleted, error } = useSelector((state) => state.blogs);
  const { role,isAuthenticated } = useSelector((state) => state.user);
 
 
  


  const navigate = useNavigate();
  const options = {
    value: blog.ratings,    
    readOnly: true,
    precision: 0.5,
    };
   
  const Delete = () => {
    if (isAuthenticated) {
      if (role === "admin") {
        dispatch(delBlog(blog._id))
        navigate(0); 
        if (isDeleted) {
          alert.info("Successfully Deleted");
        }
      }
      else {
        alert.info("Login As Admin To Make Changes")
      }
    }
  }
  const Update = (e) => {
      e.preventDefault();
    if (isAuthenticated) {
      if (role === "admin") {
        navigate(`/admin/blog/${blog._id}`)
    }
    else {
      alert.info("Login As Admin To Make Changes")
    }
    }
  };
  

  
  
  useEffect(() => {
    
    
    
    if (error) {
      alert.show(error);
      dispatch(clearErrors());
    }
    
    
  }, [dispatch, error, alert,navigate,isDeleted,role,isAuthenticated]);

  return (
    <div className="blogCard" >
     
          <div>
          <Tooltip title="Visit Blog" arrow>
          <Link to={blog.link}> <h2>{blog.title}</h2></Link>
          </Tooltip>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h6>{blog.category}</h6> 
              <h6>{(String(blog.createdAt)).slice(0, 10)}</h6>  
              
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Rating {...options} />{" "}
          <span className="blogCardSpan">
          {" "}
          <Link to={`/blog/${blog._id}`} className="review" >({blog.numberOfReviews} {blog.numOfReviews} Reviews)</Link>
        </span>
          
          
            
      </div>
      {role==="admin" ? (
             
        <div style={{display:"flex" , justifyContent:"flex-end"}} >
      
        <div  onClick={Update}>
        <Tooltip title="Edit" arrow>
        <EditIcon style={{ color: 'red', fontSize: "medium" ,marginRight:"10px" , cursor:"pointer"}} />  
                  
            </Tooltip>
        </div>
         
        
        <div onClick={Delete}>
          <Tooltip title="Delete" arrow>
            <DeleteIcon style={{ color: 'red', fontSize: "medium", marginLeft: "10px", cursor: "pointer" }} /> 
                  
            </Tooltip>
          </div>
       </div>  
             
         
        ) : (
               <></>
           )}
       
    </div>
  );
};

export default BlogCard;