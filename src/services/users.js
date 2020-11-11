import axios from 'axios';
const baseUrl = 'https://ben-posts-app.herokuapp.com/users';

const createUser = (user) => axios.post(`${baseUrl}/register`, user);

const tokenIsValid = (token) =>
  axios.post(`${baseUrl}/tokenIsValid`, null, {
    headers: { 'x-auth-token': token }
  });

const getUpdatedUser = (token) =>
  axios.get(`${baseUrl}/getUser`, { headers: { 'x-auth-token': token } });
// eslint-disable-next-line import/no-anonymous-default-export
export default { createUser, tokenIsValid, getUpdatedUser };
