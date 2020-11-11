import api from '../services/users';

export const login = (user) => {
  return {
    type: 'LOGIN',
    payload: user
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export const getUpdatedUser = (token) => async (dispatch) => {
  const { data } = await api.getUpdatedUser(token);
  return dispatch({
    type: 'GET_USER',
    payload: data
  });
};
