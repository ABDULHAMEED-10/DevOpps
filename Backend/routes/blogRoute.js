const express = require("express");
const { getAllBlogs, createBlog ,updateBlog ,BlogDetails,deleteBlog,deleteReview, getAllBlogReviews,createBlogReview} = require("../controllers/blogController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/admin/blog/new").post(isAuthenticatedUser, createBlog);
router.route("/admin/blog/:id")
    .put(isAuthenticatedUser,updateBlog)
    .delete(isAuthenticatedUser,deleteBlog)
router.route("/blog/:id").get(BlogDetails);
router.route("/blogs").get(getAllBlogs);
router.route("/review").put(isAuthenticatedUser, createBlogReview);
router.route("/reviews").delete(isAuthenticatedUser,deleteReview).get(getAllBlogReviews);


module.exports = router;
