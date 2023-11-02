import React, { Fragment, useEffect, useState } from "react";
import "./blogReview.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllReviews } from "../../actions/blogAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import Star from "@material-ui/icons/Star";
import { useParams } from "react-router-dom";

const BlogReviews = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, reviews, loading } = useSelector((state) => state.blogReviews);
  const [blogId, setBlogId] = useState(params.id);


  const blogReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(blogId));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, blogId]);

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS`} />

      <div className="dashboard">
        <div className="blogReviewsContainer">
          <form className="blogReviewsForm" onSubmit={blogReviewsSubmitHandler}>
            <h1 className="blogReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Blog Id"
                required
                value={blogId}
                onChange={(e) => setBlogId(e.target.value)}
              />
            </div>

            <Button
              id="createBlogBtn"
              type="submit"
              disabled={loading ? true : false || blogId === "" ? true : false}
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <div className="blogListTableContainer">
              <table className="blogListTable">
                <thead>
                  <tr>
                    <th>Review ID</th>
                    <th>User</th>
                    <th>Comment</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.comment}</td>
                      <td className={item.rating >= 3 ? "greenColor" : "redColor"}>
                        {item.rating}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h1 className="blogReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default BlogReviews;
