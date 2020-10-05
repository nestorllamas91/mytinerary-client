import css from 'styled-jsx/css';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

export default css`
  .fields {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 14px 0px 0px -28px;
  }
  .credentials {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
    height: 80px;
  }
  .username,
  .password {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .errors {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    align-self: flex-start;
    margin: 0px auto 10px auto;
    font-size: 12px;
    color: red;
  }
  .register {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    font-size: 13px;
  }
  .register > span {
    margin-right: 6px;
  }
  .login-image {
    margin: 50px auto 0px auto;
    width: 60%;
  }
`;

export const stylesMaterialUi = makeStyles({
  form: {
    display: 'flex !important',
    flexDirection: 'column !important',
    alignItems: 'center !important',
    justifyContent: 'center !important'
  },
  icon: {
    marginRight: '6px !important',
    fontSize: '22px !important'
  },
  rememberSession: {
    alignSelf: 'flex-start !important',
    marginLeft: '-7px !important'
  }
});

export const themeMaterialUi = createMuiTheme({
  typography: {
    fontSize: 11
  }
});
