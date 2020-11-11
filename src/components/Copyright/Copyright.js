import { Typography } from '@material-ui/core';
import useStyles from './styles';

const Copyright = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        <a color="inherit" href="https://www.benkosh.com/">
          Benkosh.com
        </a>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
};

export default Copyright;
