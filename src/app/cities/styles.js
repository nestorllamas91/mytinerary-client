import css from 'styled-jsx/css';
import { makeStyles } from '@material-ui/core/styles';

export default css`
  .cities-filter {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    margin-bottom: 10px;
  }
  .cities-filter > label {
    margin-right: 8px;
  }
  .cities {
    margin-top: 10px;
  }
`;

export const stylesMaterialUi = makeStyles({
  filterInputDisabled: {
    backgroundColor: 'lightgray !important'
  }
});
