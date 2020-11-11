import {
  FETCH_ALL,
  CREATE_POST,
  UPDATE,
  DELETE,
  LIKE
} from '../constants/actionTypes';

const reducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE_POST:
      return [...posts, action.payload];
    case LIKE:
      return posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    case UPDATE:
      return posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post.id !== action.payload);
    default:
      return posts;
  }
};

export default reducer;
