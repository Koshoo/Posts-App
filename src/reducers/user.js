const reducer = (user = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    case 'CREATE_USER':
      return action.payload;
    case 'GET_USER':
      return action.payload;
    default:
      return user;
  }
};

export default reducer;
