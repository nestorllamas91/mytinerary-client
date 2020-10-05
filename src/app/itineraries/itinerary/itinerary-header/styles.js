import css from 'styled-jsx/css';

export default css`
  .itinerary-author {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: -120px;
  }
  .itinerary-author-image {
    border: 2px solid darkgray;
    border-radius: 50%;
    width: 48px;
  }
  .itinerary-author-name {
    margin-top: 4px;
    font-size: 10px;
    font-weight: bold;
  }
  .itinerary-details {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .itinerary-title {
    font-size: 12px;
    font-weight: bold;
  }
  .itinerary-rating-duration-price {
    margin: 10px auto;
    font-size: 10px;
  }
  .itinerary-duration {
    margin: 0px 14px;
  }
  .itinerary-hashtags {
    font-size: 10px;
  }
  .itinerary-hashtag:not(:last-child) {
    margin-right: 6px;
  }
`;
