import css from 'styled-jsx/css';
import { makeStyles } from '@material-ui/core/styles';

export default css``;

export const stylesMaterialUi = makeStyles({
  navBarTop: {
    position: 'fixed !important',
    top: '0px !important',
    right: '0px !important',
    left: '0px !important',
    display: 'flex !important',
    flexDirection: 'row !important',
    justifyContent: 'space-between !important',
    alignItems: 'center !important',
    boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.5) !important',
    minHeight: '44px !important',
    backgroundColor: '#5782d8 !important'
  }
});
