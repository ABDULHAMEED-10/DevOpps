const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true,"Please Enter Blog Name"]
    },
    
    link: {
        type: String,
        required:[true,"Please Enter Blog Website Link"]
    },
    
    category: {
        type: String,
        required:[true,"Please Enter Blog Category"]
            
    },
    ratings: {
        type: Number,
        default:0
    },
    
    numberOfReviews: {
        type: Number,
        default:0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required:true,
            },
            name: {
                type: String,
                required:true
            },
            rating: {
                type: Number,
                required:true
            },
            comment: {
                type: String,
                required:true
            }

        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required:true,
    },
    createdAt: {
        type: Date,
        default:Date.now()
    }
})
module.exports = mongoose.model("Blog", BlogSchema);