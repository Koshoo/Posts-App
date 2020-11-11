let timeoutId;

export const setNotification = (message, type = 'success') => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, type }
    });

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);
  };
};
export const clearNotification = () => ({ type: 'CLEAR_NOTIFICATION' });
