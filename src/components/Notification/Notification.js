import React from 'react';
import { useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (!notification) {
    return null;
  }
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={true}
      style={{ width: '100%' }}
    >
      <Alert variant="filled" severity={notification.type}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};
export default Notification;
