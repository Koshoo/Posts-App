import React, { useState, useEffect } from 'react';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const [currentUserLikes, setCurrentUserLikes] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const user = useSelector((state) => state.user);

  const handleDelete = () => {
    setCurrentId(0);
    if (window.confirm(`Are you sure you want to delete this post?`)) {
      dispatch(deletePost(post.id, user.token));
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    if (post.likedFrom.includes(user.id)) {
      setCurrentUserLikes(true);
    } else {
      setCurrentUserLikes(false);
    }
  }, [user, post.likedFrom]);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {!user ? null : user.id === post.user ? (
          <Button
            style={{ color: 'white' }}
            size="small"
            onClick={() => setCurrentId(post.id)}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        ) : null}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.message}
        gutterBottom
        variant="h5"
        component="p"
      >
        {post.message}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          By {post.creator}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {!user ? null : (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(likePost(post.id, user.token))}
          >
            <ThumbUpAltIcon
              color={currentUserLikes ? 'inherit' : 'disabled'}
              fontSize="small"
            />{' '}
            Like {post.likeCount}{' '}
          </Button>
        )}

        {!user ? null : user.id === post.user ? (
          <Button size="small" color="secondary" onClick={handleDelete}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default Post;
