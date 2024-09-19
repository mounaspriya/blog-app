import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    posts: [], 
    currentPage: 1,
    postsPerPage: 5,
  },
  reducers: {
    addBlog: (state, action) => {
      state.posts.push(action.payload);
    },
    deleteBlog: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    updateBlog: (state, action) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { addBlog, deleteBlog, updateBlog, setCurrentPage } = blogSlice.actions;
export default blogSlice.reducer;


export const selectPaginatedPosts = (state) => {
  const { posts, currentPage, postsPerPage } = state.blogs;
  const startIndex = (currentPage - 1) * postsPerPage;
  return posts.slice(startIndex, startIndex + postsPerPage);
};
