import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../features/blogSlice";
import { v4 as uuidv4 } from "uuid";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addBlog({
        id: uuidv4(),
        title,
        description,
        coverImage,
      })
    );
    setTitle("");
    setDescription("");
    setCoverImage("");
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Submit Blog</button>
    </form>
  );
};

export default BlogForm;
