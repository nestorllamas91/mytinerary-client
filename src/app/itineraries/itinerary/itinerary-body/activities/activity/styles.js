import css from 'styled-jsx/css';

export default css`
  .activity-container {
    margin: 0px 4px;
  }
  .activity-image-title {
    position: relative;
  }
  .activity-image {
    width: 100%;
    vertical-align: middle;
  }
  .activity-title {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1.2;
    font-size: 14px;
    text-align: center;
    text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
    color: white;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .activity-description {
    margin-top: 4px;
    font-size: 12px;
  }
`;
