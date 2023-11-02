const Blog = require("../models/blogModels");
class ApiFeatures{
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword? {
            name: {
                $regex: this.queryStr.keyword,
                $options:"i",
            },
        } : {}
       
        this.query = this.query.find({ ...keyword });
        
        return this;
    }
    //category filter
    filter() {
        //assing copy not refernce
        const queryCopy = { ...this.queryStr }
        //removing some field (skip)
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);
        //filter for price
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        queryStr = JSON.parse(queryStr);
        //this.query = Blog.find()
        this.query = this.query.find(queryStr);
        return this;
    }
    pagination(RPP) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skipPage = RPP * (currentPage - 1);//5*(3-1)
        this.query = this.query.limit(RPP).skip(skipPage);
        return this;

    
    }
    

}
module.exports = ApiFeatures;