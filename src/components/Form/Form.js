import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { getUpdatedUser } from '../../actions/users';
// import { setNotification } from '../../actions/notification';

import { TextField, Button, Typography, Paper } from '@material-ui/core';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message.id === currentId) : null
  );

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    post && setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!postData.creator) {
    //   return dispatch(setNotification('Please specify a creator!', 'error'));
    // }

    if (currentId === 0) {
      postData.creator = user.displayName;
      dispatch(createPost(postData, user.token));
      clear();
    } else {
      if (user.posts.includes(currentId)) {
        dispatch(updatePost(currentId, postData, user.token));
        clear();
      }
    }
    dispatch(getUpdatedUser(user.token));
  };

  return (
    <Paper elevation={2} className={classes.paper}>
      {!user ? (
        <Typography align="center" variant="h6">
          Please log in to create posts
        </Typography>
      ) : (
        <form
          autoComplete="off"
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {currentId ? `Editing "${post.title}"` : 'Create A New Post'}
          </Typography>
          {/* <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
          /> */}
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            required
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
            required
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags (coma separated)"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(',') })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            style={{ marginBottom: '10px' }}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      )}
    </Paper>
  );
};

export default Form;
