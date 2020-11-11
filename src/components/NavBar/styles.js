import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '40px 0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  heading: {
    color: 'rgba(60,80,300, 1)',
    fontSize: '4rem'
  },
  image: {
    marginLeft: '15px'
  },
  button: {
    margin: '5px'
  },
  registerButton: {
    background: 'green',
    margin: '5px'
  }
}));
