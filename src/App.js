import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import storage from './utils/storage';
import { login } from './actions/users';
import userService from './services/users';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import Copyright from './components/Copyright/Copyright';
import NavBar from './components/NavBar/NavBar';

import { getPosts } from './actions/posts';

import Notification from './components/Notification/Notification';

import { Container, Grow, Grid } from '@material-ui/core';
import useStyles from './styles';

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    const user = storage.loadUser();
    if (!user) {
      return;
    }
    const checkTokenAndSetUser = async function () {
      const { data } = await userService.tokenIsValid(user.token);
      if (!data) {
        return;
      }

      dispatch(login(user));
    };
    checkTokenAndSetUser();
  }, [dispatch]);

  const classes = useStyles();

  return (
    <Router>
      <Container maxWidth="lg">
        <NavBar />
        <Notification />
        <Switch>
          <Route path="/register">
            <SignUpForm />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/">
            <Grow in>
              <Container>
                <Grid
                  className={classes.mainContainer}
                  container
                  justify="space-between"
                  alignItems="stretch"
                  spacing={3}
                >
                  <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                  </Grid>
                </Grid>
              </Container>
            </Grow>
          </Route>
        </Switch>
        <Copyright />
      </Container>
    </Router>
  );
};

export default App;
