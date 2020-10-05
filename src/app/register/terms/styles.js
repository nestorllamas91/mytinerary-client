import css from 'styled-jsx/css';

export default css`
  .terms-body {
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);
    margin-top: 6px;
    padding: 0px 10px 10px 10px;
    width: 100%;
    height: 100%;
    font-size: 12px;
    overflow-y: scroll;
  }
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
