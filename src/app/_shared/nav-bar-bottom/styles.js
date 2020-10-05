import css from 'styled-jsx/css';
import { makeStyles } from '@material-ui/core/styles';

export default css`
  .bottom-nav-bar-container > nav {
    position: fixed;
    right: 0px;
    bottom: 0px;
    left: 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-shadow: 0px -3px 5px 0px rgba(0, 0, 0, 0.3);
    height: 34px;
    background-color: #5782d8;
  }
`;

export const stylesMaterialUi = makeStyles({
  goBackIconButton: {
    position: 'absolute !important',
    left: '5% !important',
    padding: '0px !important',
    color: 'black !important'
  },
  homeIconButton: {
    position: 'absolute !important',
    top: '50% !important',
    left: '50% !important',
    transform: 'translate(-50%, -50%) !important',
    padding: '0px !important',
    color: 'black !important'
  },
  icon: {
    fontSize: '30px !important'
  }
});
