import React, { useState } from 'react';

import userService from '../../services/users';
import { setNotification } from '../../actions/notification';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import useStyles from './styles';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [displayName, setDisplayName] = useState('');

  const user = useSelector((state) => state.user);
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const returnedUser = await userService.createUser({
        email,
        password,
        passwordCheck,
        displayName
      });

      if (returnedUser) {
        history.push('/login');
      }
    } catch (err) {
      setPassword('');
      setPasswordCheck('');
      dispatch(setNotification(err.response.data.message, 'error'));
    }
  };

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
          Sign up
        </Typography>
        <form onSubmit={handleCreateUser} className={classes.form}>
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
            id="displayName"
            label="Display Name"
            name="displayName"
            autoFocus
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordCheck"
            label="Password Confirmation"
            type="password"
            id="passwordCheck"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
