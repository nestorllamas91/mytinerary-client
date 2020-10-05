import css from 'styled-jsx/css';
import { makeStyles } from '@material-ui/core/styles';

export default css`
  .user-image {
    border: 2px solid darkgray;
    border-radius: 50%;
    width: 25px;
  }
`;

export const stylesMaterialUi = makeStyles({
  menuIconButton: {
    padding: '0px !important'
  },
  menuIcon: {
    fontSize: '30px !important',
    color: 'black !important'
  },
  menuItemText: {
    color: 'black !important'
  }
});
