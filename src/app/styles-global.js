import css from 'styled-jsx/css';
import quicksandBold from '$client/assets/fonts/Quicksand-Bold.ttf';
import oxygenRegular from '$client/assets/fonts/Oxygen-Regular.ttf';

export default css.global`
  @font-face {
    font-family: QuicksandBold;
    src: url(${quicksandBold});
  }
  @font-face {
    font-family: OxygenRegular;
    src: url(${oxygenRegular});
  }
  html,
  body,
  #app,
  #app > main {
    height: 100%;
  }
  #app > main {
    display: flex;
    flex-direction: column;
  }
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    flex-grow: 1;
    margin: 44px 0px 34px 0px;
    padding: 20px;
    background-color: #f0f0f0;
  }
  h1,
  h2,
  h3 {
    font-family: 'QuicksandBold';
    text-align: center;
    color: black;
  }
  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 26px;
  }
  h3 {
    font-size: 18px;
  }
  div,
  p,
  span,
  label,
  input,
  button,
  li {
    font-family: 'OxygenRegular' !important;
  }
  p {
    line-height: 1.4;
  }
  p:not(:last-child) {
    margin-bottom: 2px;
  }
  a {
    font-weight: bold;
    color: #aa4500;
  }
  hr {
    margin: 4px 0px 10px 0px;
    border-top: 1px solid gray;
    width: 100%;
  }
  .alert {
    margin: 10px auto;
    border-radius: 10px;
    padding: 10px 20px;
    text-align: center;
  }
  .alert-info {
    border: 1px solid #b8daff;
    color: #195494;
    background-color: #cce5ff;
  }
  .alert-success {
    border: 1px solid #c3e6cb;
    color: #2c693a;
    background-color: #d4edda;
  }
  .alert-error {
    border: 1px solid #f5c6cb;
    color: #975057;
    background-color: #f8d7da;
  }
  .swal2-title {
    margin-bottom: 14px;
    font-size: 22px;
  }
  .swal2-content {
    font-size: 13px;
  }
`;
