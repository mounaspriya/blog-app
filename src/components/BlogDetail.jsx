import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.posts.find((post) => post.id === id)
  );

  if (!blog) return <div>Blog not found</div>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <img src={blog.coverImage} alt={blog.title} />
      <p>{blog.description}</p>
    </div>
  );
};

export default BlogDetail;
