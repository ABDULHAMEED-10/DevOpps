import {
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCESS,
  ALL_BLOG_FAIL,
  CLEAR_ERRORS,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  POST_BLOG_REQUEST,
  POST_BLOG_REQUEST_SUCCESS,
  POST_BLOG_REQUEST_FAIL,
  DEL_BLOG_REQUEST,
  DEL_BLOG_REQUEST_SUCCESS,
  DEL_BLOG_REQUEST_FAIL,
  EDIT_BLOG_REQUEST,
  EDIT_BLOG_REQUEST_SUCCESS,
  EDIT_BLOG_REQUEST_FAIL
} from "../constants/blogConstants"

export const BlogReducer = (state = { blogs: [] }, action) => {
    switch (action.type) {
      case ALL_BLOG_REQUEST:
      case EDIT_BLOG_REQUEST:
      case DEL_BLOG_REQUEST:
      case POST_BLOG_REQUEST:
            return {
              loading: true,
              blogs: [],
              
        };
      
      case ALL_BLOG_SUCESS:
      
            return {
                loading: false,
                blogs: action.payload.blogs,
                blogsCount: action.payload.blogsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredBlogsCount: action.payload.filteredBlogsCount,
               
        };
        
        case POST_BLOG_REQUEST_SUCCESS:
          return {
            loading: false,
            blogs: action.payload.blogs,
            isPosted: action.payload
           
        };
      case EDIT_BLOG_REQUEST_SUCCESS:
        return {
            loading: false,
            blogs: action.payload.blogs,
            isUpdated: action.payload
        }
      case DEL_BLOG_REQUEST_SUCCESS:
        return {
            loading: false,
            blogs: action.payload.blogs,
            isDeleted: action.payload
        };
      case EDIT_BLOG_REQUEST_FAIL:
      case ALL_BLOG_FAIL:
      case DEL_BLOG_REQUEST_FAIL:
      case POST_BLOG_REQUEST_FAIL:  
            return {
                loading: false,
                error: action.payload,

        };
      
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,

            };
        default:
            return state;
    }
};
export const blogReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case ALL_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_REVIEW_SUCCESS:
        return {
          loading: false,
          reviews: action.payload,
        };
      case ALL_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };