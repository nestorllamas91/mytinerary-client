import css from 'styled-jsx/css';

export default css`
  .landing-margin-bottom {
    margin-bottom: 0px !important;
  }
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
  .logo > img {
    width: 160px;
  }
  .slogan {
    margin: 20px auto 0px auto;
    text-align: center;
  }
  .slogan > span {
    line-height: 1.3;
    font-size: 14px;
  }
  .explore-cities {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 40px auto;
  }
  .explore-cities > span {
    font-size: 20px;
  }
  .explore-cities img {
    margin-top: 10px;
    width: 64px;
  }
  .popular-mytineraries {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0px auto;
    width: 80%;
  }
  .popular-mytineraries > h3 {
    margin-bottom: 4px;
  }
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const stylesGlobal = css.global`
  .slick-prev::before,
  .slick-next::before {
    color: gray !important;
  }
`;
