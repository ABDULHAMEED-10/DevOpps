const Blog = require("../models/blogModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsncError = require("../middleware/catchAsncError");
const ApiFeatures = require("../utils/apifeatures");

//create Blog
exports.createBlog = catchAsncError(async (req, res, next) => {
    let message = `Role:${req.user.role} is not allowed to access this role`;
    if (req.user.role == "user") {
        // User doesn't have the required role, return an error response
        return next(new ErrorHandler(message, 403));
    } 
    // User has the required role, proceed to the next middleware or route handler
    req.body.user = req.user.id;

    const blog = await Blog.create(req.body);
    res.status(201).json({
        success: true,
        message,
        blog
    });


        
    
});



exports.getAllBlogs = catchAsncError(async (req, res) => {
    const resultPerPage = 8;
    const blogsCount = await Blog.countDocuments();

    const blog = Blog.find();
    
    const apifeatures = new ApiFeatures(blog, req.query).search().filter().pagination(resultPerPage);
    const blogs = await apifeatures.query;
    let filteredBlogsCount = blogs.length;
    res.status(200).json({
        success: true,
        blogs,
        blogsCount,
        resultPerPage,
        filteredBlogsCount
    });
});

exports.updateBlog = catchAsncError(async (req, res, next) => {
    if (req.user.role == "user") {
        // User doesn't have the required role, return an error response
        return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this role`, 403));
    } 
    
    // User has the required role, proceed to the next middleware or route handler
    let blog = Blog.findById(req.params.id);
    if (!blog) {
        return next(new ErrorHandler("Blog not found", 404))
    }
    
    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidator: true,
        useFindAndModify: false
    
    });
    res.status(200).json({
        success: true,
        message:"Sucessfully Updated",
        blog
    });
    
        
    
});
exports.deleteBlog = catchAsncError(async (req, res, next) => {
    const message = `Role:${req.user.role} is not allowed to access this role`;
    if (req.user.role == "user") {
        // User doesn't have the required role, return an error response
        return next(new ErrorHandler(message, 403));
    } 
    // User has the required role, proceed to the next middleware or route handler
    const deletedBlog = await Blog.findByIdAndRemove(req.params.id);

    if (!deletedBlog) {
        // If the Blog with the provided _id doesn't exist
        return next(new ErrorHandler("Blog not found", 404))
    }

    // Blog successfully removed
    return res.json({ success: true, message });

   
        
});
exports.BlogDetails =catchAsncError(async(req, res,next)=>{
    let Blog =await Blog.findById(req.params.id);
    if (!Blog) {
        return next(new ErrorHandler("Blog not found",404))
    }
    res.status(200).json({
        success: true,
        Blog
    });

});
exports.createBlogReview = catchAsncError(async (req, res, next) => {
    const { rating, comment, BlogId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };
    const Blog = await Blog.findById(BlogId);
    const isReviewed = Blog.reviews.find(rev => rev.user.toString() === req.user._id.toString());
    
    if (isReviewed) {
        Blog.reviews.forEach(rev => {
            rev.rating = rating,
                rev.comment = comment
        })
    } else {
        Blog.reviews.push(review)
        //number of rows is in schmea
        Blog.numberOfReviews = Blog.reviews.length;

    }
    //rating is in schmea
    let sum = 0;
    Blog.reviews.forEach(rev => {
        sum += rev.rating
    })
    Blog.ratings = sum / Blog.reviews.length;

    await Blog.save({validateBeforeSave:false
    })
    res.status(200).json({
        success: true,
       
    });
});
exports.getAllBlogReviews = catchAsncError(async (req, res, next) => { 
    const Blog =await Blog.findById(req.query.BlogId);
    if (!Blog) {
        return next(new ErrorHandler("Blog not found",404))
    }
    res.status(200).json({
        success: true,
        reviews: Blog.reviews
        
    });
})
//delete review
exports.deleteReview = catchAsncError(async (req, res, next) => {
    const Blog = await Blog.findById(req.query.BlogId);

    if (!Blog) {
        // If the Blog with the provided _id doesn't exist
        return next(new ErrorHandler("Blog not found", 404))
    }

    const reviews = Blog.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString());
    //rating is in schmea
    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating
    });
    const ratings = avg / reviews.length;
    const numberOfReviews = reviews.length;
    await Blog.findByIdAndUpdate(req.query.BlogId, {
        reviews,
        ratings,
        numberOfReviews,
    },
       { new: true,
        runValidator: true,
        useFindAndModify: false
        
    } 
    );

    // Blog successfully removed
    return res.json({ success: true, message: 'Review deleted successfully' });

});