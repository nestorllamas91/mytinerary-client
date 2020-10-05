import css from 'styled-jsx/css';

export default css`
  .not-found-container {
    align-items: center;
    justify-content: center !important;
  }
  .error-name {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    font-size: 30px;
  }
  .not-found-image {
    margin: 30px auto;
    width: 192px;
  }
  .error-message {
    text-align: center;
  }
  .error-message > span {
    line-height: 1.3;
    font-size: 16px !important;
  }
`;
