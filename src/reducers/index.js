import { combineReducers } from 'redux';
import posts from './posts';
import user from './user';
import notification from './notification';

export default combineReducers({
  posts,
  user,
  notification
});
