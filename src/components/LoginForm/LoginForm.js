import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loginService from '../../services/login';
import { login } from '../../actions/users';
import { setNotification } from '../../actions/notification';
import storage from '../../utils/storage';
import { Link, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import useStyles from './styles';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  let history = useHistory();

  const user = useSelector((state) => state.user);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        email,
        password
      });
      setEmail('');
      setPassword('');
      dispatch(login(user));
      dispatch(setNotification(`Welcome back, ${user.displayName}!`));
      if (e.target[4].checked) {
        storage.saveUser(user);
      }
      history.push('/');
    } catch (err) {
      dispatch(setNotification(err.response.data.message, 'error'));
      setEmail('');
      setPassword('');
      e.target[4].checked = false;
    }
  };
  const classes = useStyles();

  return user ? (
    <Redirect to="/" />
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form onSubmit={handleLogin} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log in
          </Button>

          <Link to="/register" variant="body2" className={classes.register}>
            {"Don't have an account? Sign Up"}
          </Link>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
