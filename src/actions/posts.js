import * as api from '../services/posts';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const createPost = (post, token) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post, token);

    dispatch({ type: 'CREATE_POST', payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const deletePost = (id, token) => async (dispatch) => {
  try {
    await api.deletePost(id, token);
    dispatch({ type: 'DELETE', payload: id });
  } catch (err) {
    console.log(err.message);
  }
};

export const updatePost = (id, updatedPost, token) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, updatedPost, token);

    dispatch({ type: 'UPDATE', payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const likePost = (id, token) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id, token);

    dispatch({ type: 'LIKE', payload: data });
  } catch (err) {
    console.log(err.message);
  }
};
