import css from 'styled-jsx/css';
import { makeStyles } from '@material-ui/core/styles';

export default css``;

export const stylesMaterialUi = makeStyles({
  headerExpandedPanel: {
    display: 'flex !important',
    flexDirection: 'row !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    minHeight: '60px !important'
  },
  bodyExpandedPanel: {
    display: 'flex !important',
    flexDirection: 'column !important',
    justifyContent: 'center !important',
    marginBottom: '20px !important',
    padding: '0px 16px !important'
  }
});
