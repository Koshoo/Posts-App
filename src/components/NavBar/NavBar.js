import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import storage from '../../utils/storage';

import { logout } from '../../actions/users';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import memories from '../../images/memories.png';

import useStyles from './styles';

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    storage.logoutUser();
  };

  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <img
        className={classes.image}
        src={memories}
        height="60"
        alt="memories"
      />
      <Typography className={classes.heading} variant="h2" align="center">
        Social Board
      </Typography>

      {user ? (
        <div>
          <Button
            className={classes.button}
            disableElevation
            variant="contained"
            color="primary"
            onClick={null}
          >
            My Account
          </Button>
          <Button
            className={classes.button}
            disableElevation
            variant="contained"
            color="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <Button
            className={classes.button}
            disableElevation
            variant="contained"
            color="primary"
            onClick={() => history.push('/login')}
          >
            Log In
          </Button>
          <Button
            className={classes.registerButton}
            disableElevation
            variant="contained"
            color="primary"
            onClick={() => history.push('/register')}
          >
            Sign Up
          </Button>
        </div>
      )}
    </AppBar>
  );
};

export default NavBar;
