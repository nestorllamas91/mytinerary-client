import css from 'styled-jsx/css';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

export default css`
  .activities-section,
  .comments-section {
    box-shadow: 0px 0px 5px 0px lightgray;
    background-color: #fafafa;
  }
  .activities-section {
    padding: 16px 30px 36px 30px;
  }
  .comments-section {
    margin-top: 20px;
    padding: 16px 30px;
  }
  .comment {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

export const stylesGlobal = css.global`
  .slick-prev::before,
  .slick-next::before {
    color: gray !important;
  }
`;

export const stylesMaterialUi = makeStyles({
  commentField: {
    width: '85% !important'
  }
});

export const themeMaterialUi = createMuiTheme({
  typography: {
    fontSize: 11
  }
});
