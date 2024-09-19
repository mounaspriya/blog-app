// src/components/BlogList.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPaginatedPosts, setCurrentPage } from '../features/blogSlice';
import '../styles/home.css'; // Ensure this path is correct

const BlogList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPaginatedPosts);
  const { posts: allPosts, currentPage, postsPerPage } = useSelector((state) => state.blogs);
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  console.log("Current Page:", currentPage);
  console.log("Total Pages:", totalPages);
  console.log("Posts:", posts);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      <ul>
        {posts.length === 0 ? (
          <li>No blogbknljk posts available</li>
        ) : (
          posts.map(post => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              {/* Include buttons for edit and delete if needed */}
            </li>
          ))
        )}
      </ul>
      <div className="pagination">
        {totalPages > 1 && (
          
          Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={index + 1 === currentPage}
            >
              {index + 1}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;
