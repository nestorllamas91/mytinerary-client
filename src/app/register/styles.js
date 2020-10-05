import css from 'styled-jsx/css';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

export default css`
  .photo-selector-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px auto 20px auto;
    border: 2px dashed gray;
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
  .photo-selector-container > .photo-image {
    position: absolute;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  .photo-selector-container > .photo-placeholder {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    font-size: 13px;
    text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
    color: white;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .photo-selector-container > .photo-selector {
    position: absolute;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .fields {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 230px;
  }
  .credentials,
  .name {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .country {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 270px;
  }
  .country > img {
    position: absolute;
    left: 0px;
    border: 2px solid lightgray;
  }
  .country > span {
    position: absolute;
    left: 44px;
    width: 100%;
  }
  .terms-privacy {
    border: 0px;
    padding: 0px;
    font-size: 100%;
    font-weight: bold;
    text-decoration: underline;
    color: #aa4500;
    background-color: transparent;
  }
  .errors {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    align-self: flex-start;
    margin: 10px 0px;
    font-size: 12px;
    color: red;
  }
  .login {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    font-size: 13px;
  }
  .login > span {
    margin-right: 6px;
  }
`;

export const stylesMaterialUi = makeStyles({
  form: {
    display: 'flex !important',
    flexDirection: 'column !important',
    alignItems: 'center !important',
    justifyContent: 'center !important'
  },
  cropPhotoButton: {
    marginTop: '10px !important'
  },
  fieldInputHalfWidth: {
    width: '49% !important'
  },
  fieldInputFullWidth: {
    width: '100% !important'
  },
  termsAndPrivacyLabel: {
    alignSelf: 'flex-start !important'
  },
  noteRequiredFieldsText: {
    alignSelf: 'flex-start !important'
  }
});

export const themeMaterialUi = createMuiTheme({
  typography: {
    fontSize: 11
  }
});

export const stylesModalPhoto = {
  modal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '36px 36px 20px 36px',
    width: '70%'
  },
  closeButton: {
    top: '6px',
    right: '6px'
  }
};

export const stylesModalTermsPrivacy = {
  modal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '36px 36px 20px 36px',
    width: '70%',
    height: '50%'
  },
  closeButton: {
    top: '6px',
    right: '6px'
  }
};
