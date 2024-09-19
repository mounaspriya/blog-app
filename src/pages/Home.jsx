// src/pages/Home.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBlog, updateBlog, deleteBlog } from '../features/blogSlice';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import '../styles/home.css'; // Import the CSS file

const Home = () => {
  const blogs = useSelector((state) => state.blogs.posts);
  const dispatch = useDispatch();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Number of posts per page

  // Calculations for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogs.length / postsPerPage);

  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');

  // Handlers for modals and form submissions
  const handleAddButtonClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setTitle('');
    setDescription('');
    setCoverImage('');
  };

  const handleEditButtonClick = (blog) => {
    setCurrentBlog(blog);
    setTitle(blog.title);
    setDescription(blog.description);
    setCoverImage(blog.coverImage);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentBlog(null);
    setTitle('');
    setDescription('');
    setCoverImage('');
  };

  const handleDeleteButtonClick = (blog) => {
    setCurrentBlog(blog);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentBlog(null);
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    if (title && description && coverImage) {
      dispatch(
        addBlog({
          id: uuidv4(),
          title,
          description,
          coverImage,
        })
      );
      handleCloseAddModal(); // Close modal after submission
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (title && description && coverImage && currentBlog) {
      dispatch(
        updateBlog({
          id: currentBlog.id,
          title,
          description,
          coverImage,
        })
      );
      handleCloseEditModal(); // Close modal after updating
    }
  };

  const handleDelete = () => {
    if (currentBlog) {
      dispatch(deleteBlog(currentBlog.id));
      handleCloseDeleteModal(); // Close modal after deletion
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="home-container">
      <Navbar />
      <h1>Blog Posts</h1>
      {currentPosts.length === 0 ? (
        <div className="welcome-message">
          <p>Welcome! There are no blog posts yet.</p>
        </div>
      ) : (
        <div className="blog-list">
          {currentPosts.map((blog) => (
            <div key={blog.id} className="blog-item">
              <Link to={`/blog/${blog.id}`}>
                <h2>{blog.title}</h2>
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                />
              </Link>
              <button onClick={() => handleEditButtonClick(blog)}>Edit</button>
              <button onClick={() => handleDeleteButtonClick(blog)}>Delete</button>
            </div>
          ))}
        </div>
      )}
      <button className="add-button" onClick={handleAddButtonClick}>Add New Blog Post</button>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseAddModal}>&times;</span>
            <h2>Add a New Blog Post</h2>
            <form onSubmit={handleSubmitAdd}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog Title"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Blog Description"
              />
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Cover Image URL"
              />
              <button type="submit">Add Blog Post</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseEditModal}>&times;</span>
            <h2>Edit Blog Post</h2>
            <form onSubmit={handleSubmitEdit}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog Title"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Blog Description"
              />
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Cover Image URL"
              />
              <button type="submit">Update Blog Post</button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseDeleteModal}>&times;</span>
            <h2>Delete Blog Post</h2>
            <p>Are you sure you want to delete "{currentBlog?.title}"?</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleCloseDeleteModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
