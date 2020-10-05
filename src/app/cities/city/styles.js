import css from 'styled-jsx/css';

export default css`
  .city-container {
    position: relative;
  }
  .city-small {
    margin: 0px 2px 4px 2px;
  }
  .city-big:not(:last-child) {
    margin-bottom: 10px;
  }
  .city-image {
    width: 100%;
    vertical-align: middle;
  }
  .city-image-big {
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px black;
  }
  .city-data {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
    color: white;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .city-data-small > .city-name {
    margin-bottom: 4px;
    font-size: 16px;
  }
  .city-data-small > .country {
    font-size: 10px;
  }
  .city-data-big {
    border-radius: 10px;
  }
  .city-data-big > .city-name {
    margin-bottom: 8px;
    font-size: 20px;
  }
  .city-data-big > .country {
    font-size: 14px;
  }
  .country {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .city-data-small > .country > .image-country-flag {
    margin-right: 2px;
    border: 1.5px solid lightgray;
    width: 16px;
  }
  .city-data-big > .country > .image-country-flag {
    margin-right: 4px;
    border: 1.5px solid lightgray;
    width: 24px;
  }
`;
