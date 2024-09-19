// src/pages/BlogDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';

const BlogDetail = () => {
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.posts.find((post) => post.id === id)
  );

  if (!blog) return <div>Blog not found</div>;

  return (
    <div>
      <Navbar />
      <h1>{blog.title}</h1>
      <img src={blog.coverImage} alt={blog.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      <p>{blog.description}</p>
    </div>
  );
};

export default BlogDetail;
