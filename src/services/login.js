import axios from 'axios';
const baseUrl = 'https://ben-posts-app.herokuapp.com/users/login';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);

  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
