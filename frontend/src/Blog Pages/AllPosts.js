import React, { useEffect, useState, Fragment } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './allPosts.css';
import MetaData from '../layout/MetaData';
import { clearErrors, getBlog } from '../actions/blogAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import BlogCard from './blogCard';
import Header from '../layout/Header/Header';
import Footer from '../layout/Footer/Footer';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom'; 
import { Tooltip } from '@mui/material';

const AllPosts = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const alert = useAlert();
  const { loading, error, blogs, resultPerPage, blogsCount, filteredBlogsCount } = useSelector(
    (state) => state.blogs
  );
  const { keyword } = useParams(); 

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  let count = filteredBlogsCount;
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getBlog(keyword, currentPage));
  }, [dispatch, currentPage, keyword, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header />
          <MetaData title="BLUPER" />

          <div className="banner">
            <h1>FIND AMAZING BLOGS BELOW</h1>

              <a href="#container">
              <Tooltip title="Scroll Down" arrow>
              <button>
                <KeyboardArrowDownIcon />
                  </button>
                  </Tooltip>
            </a>
          </div>

          <h2 className="homeHeading">Featured Blogs</h2>

            <div className="container" id="container">
            
              
            {blogs &&
                blogs.map((blog) => 
                  <BlogCard key={blog._id} blog={blog} />
                )}
              
                
                
            
          </div>
          
        </Fragment>
      )}
      {resultPerPage >= count && (
        <div className="paginationBox">
          
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={blogsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
      <Footer />
    </Fragment>
  );
};

export default AllPosts;
