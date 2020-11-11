import axios from 'axios';

const baseUrl = 'https://ben-posts-app.herokuapp.com/posts';

export const fetchPosts = () => axios.get(baseUrl);
export const createPost = (newPost, token) =>
  axios.post(baseUrl, newPost, { headers: { 'x-auth-token': token } });
export const deletePost = (id, token) => {
  return axios.delete(`${baseUrl}/${id}`, {
    data: {},
    headers: { 'x-auth-token': token }
  });
};
export const likePost = (id, token) => {
  return axios.put(`${baseUrl}/${id}/likePost`, null, {
    headers: { 'x-auth-token': token }
  });
};
export const updatePost = (id, post, token) =>
  axios.put(`${baseUrl}/${id}`, post, { headers: { 'x-auth-token': token } });
