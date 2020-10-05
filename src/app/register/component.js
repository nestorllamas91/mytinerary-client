import React, { Fragment, useState, useEffect } from 'react';
import styles, {
  stylesMaterialUi,
  themeMaterialUi,
  stylesModalPhoto,
  stylesModalTermsPrivacy
} from '$client/app/register/styles';
import 'react-responsive-modal/styles.css';
import 'react-image-crop/dist/ReactCrop.css';

import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, loadUser, resetUser } from '$client/app/_shared/user/slice';
import jwtDecode from 'jwt-decode';
import { useForm } from 'react-hook-form';
import withReactContent from 'sweetalert2-react-content';
import { ThemeProvider } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';
import { Modal } from 'react-responsive-modal';
import ReactCrop from 'react-image-crop';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TermsOfService from '$client/app/register/terms/component';
import PrivacyPolicy from '$client/app/register/privacy/component';
import FormHelperText from '@material-ui/core/FormHelperText';
import Swal from 'sweetalert2';
import { readDataCountries } from '$client/app/_shared/countries/slice';
import * as images_countries_flags from '$client/app/_shared/countries/images';

export default function RegisterPage() {
  const { userIsLoading, userData, userError } = useSelector(({ user }) => user);
  const { countriesIsLoading, countriesData, countriesError } = useSelector(({ countries }) => countries);
  const countries = countriesData ? countriesData.output.data : [];
  const dispatch = useDispatch();
  const [isModalPhotoOpen, setIsModalPhotoOpen] = useState(false);
  const [isModalTermsOpen, setIsModalTermsOpen] = useState(false);
  const [isModalPrivacyOpen, setIsModalPrivacyOpen] = useState(false);
  const [photoOriginal, setPhotoOriginal] = useState({ filename: '', dataUrl: null, element: null });
  const [photoCropped, setPhotoCropped] = useState({ datUrl: null, blob: null });
  const [cropArea, setCropArea] = useState({ unit: '%', aspect: 1, width: 60 });
  const { register, watch, errors } = useForm({ mode: 'onBlur', reValidateMode: 'onChange' });
  const watchFieldUsername = watch('username');
  const watchFieldPassword = watch('password');
  const watchFieldEmail = watch('email');
  const watchFieldFirstName = watch('firstName');
  const watchFieldLastName = watch('lastName');
  const [countryId, setCountryId] = useState(-1);
  const watchFieldTermsAndPrivacy = watch('termsAndPrivacy');
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const MySwal = withReactContent(Swal);
  const [isRedirectToLanding, setIsRedirectToLanding] = useState(false);
  const classes = stylesMaterialUi();

  useEffect(() => {
    dispatch(readDataCountries());
  }, []);

  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      watchFieldUsername &&
      watchFieldPassword &&
      watchFieldEmail &&
      watchFieldFirstName &&
      watchFieldLastName &&
      countryId &&
      watchFieldTermsAndPrivacy
    ) {
      setIsFormCompleted(true);
    } else {
      setIsFormCompleted(false);
    }
  });

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (userData && !token) {
      const token = userData.output.data;
      window.localStorage.setItem('token', token);
      const user = jwtDecode(token);
      dispatch(loadUser(user));
      MySwal.fire({
        icon: 'success',
        title: 'User registered!',
        text: userData.output.message,
        width: '80%',
        onClose: handleRedirectToHome
      });
    }
    if (userError) {
      dispatch(resetUser());
      let html = '';
      if (userError.output.errorsConflict) {
        const errors = userError.output.errorsConflict;
        for (let i = 0; i < errors.length; i++) {
          html += `<p>${errors[i]}</p>`;
        }
      } else {
        html = `<p>${userError.output.message}</p>`;
      }
      MySwal.fire({
        icon: 'error',
        title: 'User not registered!',
        html,
        width: '80%'
      });
    }
  }, [userData, userError]);

  function handleResetPhoto(e) {
    e.target.value = null;
  }

  function handleSelectPhoto(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPhotoOriginal({ ...photoOriginal, filename: file.name, dataUrl: fileReader.result });
      toggleModalPhoto();
    };
    fileReader.readAsDataURL(file);
  }

  function toggleModalPhoto() {
    setIsModalPhotoOpen(prevIsModalPhotoOpen => !prevIsModalPhotoOpen);
  }

  function handlePhotoLoad(photoElement) {
    setPhotoOriginal({ ...photoOriginal, element: photoElement });
  }

  function handleCropChange(cropArea) {
    setCropArea(cropArea);
  }

  async function handleCropPhoto() {
    let photoCroppedDataUrl = null;
    let photoCroppedBlob = null;
    if (cropArea.width === 0 && cropArea.height === 0) {
      photoCroppedDataUrl = photoOriginal.dataUrl;
      photoCroppedBlob = await new Promise(resolve => photoOriginal.toBlob(resolve, 'image/jpeg', 1));
    } else {
      const { element } = photoOriginal;
      const canvasElement = document.createElement('canvas');
      const scaleX = element.naturalWidth / element.width;
      const scaleY = element.naturalHeight / element.height;
      canvasElement.width = cropArea.width;
      canvasElement.height = cropArea.height;
      const ctx = canvasElement.getContext('2d');
      ctx.drawImage(
        element,
        cropArea.x * scaleX,
        cropArea.y * scaleY,
        cropArea.width * scaleX,
        cropArea.height * scaleY,
        0,
        0,
        cropArea.width,
        cropArea.height
      );
      photoCroppedDataUrl = canvasElement.toDataURL('image/jpeg', 1);
      photoCroppedBlob = await new Promise(resolve => canvasElement.toBlob(resolve, 'image/jpeg', 1));
    }
    setPhotoCropped({ dataUrl: photoCroppedDataUrl, blob: photoCroppedBlob });
    toggleModalPhoto();
  }

  function handleCountry(newCountry) {
    if (newCountry) setCountryId(newCountry.countryId);
  }

  function toggleModalTerms() {
    setIsModalTermsOpen(prevIsModalTermsOpen => !prevIsModalTermsOpen);
  }

  function toggleModalPrivacy() {
    setIsModalPrivacyOpen(prevIsModalPrivacyOpen => !prevIsModalPrivacyOpen);
  }

  function handleSignUp() {
    const data = {
      username: watchFieldUsername,
      password: watchFieldPassword,
      email: watchFieldEmail,
      name: {
        first: watchFieldFirstName,
        last: watchFieldLastName
      },
      countryId
    };
    let newUser = new FormData();
    newUser.append('photo', photoCropped.blob);
    newUser.append('data', JSON.stringify(data));
    dispatch(registerUser(newUser));
  }

  function handleRedirectToHome() {
    setIsRedirectToLanding(true);
  }

  return (
    <div className="main-container">
      {isRedirectToLanding ? <Redirect to="/" /> : null}
      {countriesIsLoading ? (
        <LinearProgress />
      ) : (
        <Fragment>
          {countriesError ? (
            <span className="alert alert-error">
              {countriesError.status.code} {countriesError.status.name}
            </span>
          ) : (
            <Fragment>
              <ThemeProvider theme={themeMaterialUi}>
                <FormControl classes={{ root: classes.form }}>
                  <h2>Sign Up</h2>
                  <hr />
                  <div className="photo-selector-container">
                    {photoCropped.dataUrl ? (
                      <img src={photoCropped.dataUrl} alt={photoOriginal.filename} className="photo-image" />
                    ) : null}
                    <span className="photo-placeholder">Select photo...</span>
                    <input
                      type="file"
                      accept="image/*"
                      onClick={handleResetPhoto}
                      onChange={handleSelectPhoto}
                      className="photo-selector"
                    />
                  </div>
                  <Modal center open={isModalPhotoOpen} onClose={toggleModalPhoto} styles={stylesModalPhoto}>
                    <ReactCrop
                      src={photoOriginal.dataUrl}
                      crop={cropArea}
                      ruleOfThirds
                      onImageLoaded={handlePhotoLoad}
                      onChange={handleCropChange}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCropPhoto}
                      classes={{ root: classes.cropPhotoButton }}
                    >
                      CROP PHOTO
                    </Button>
                  </Modal>
                  <div className="fields">
                    <div className="credentials">
                      <TextField
                        id="username"
                        name="username"
                        type="text"
                        label="Username"
                        size="small"
                        variant="outlined"
                        required
                        inputRef={register({
                          required: {
                            value: true,
                            message: 'The username is required.'
                          },
                          validate: {
                            isString: value => value.length === 0 || isNaN(value) || 'The username must be a string.'
                          },
                          maxLength: {
                            value: 20,
                            message: 'The username must have a maximum length of 20 characters.'
                          }
                        })}
                        error={errors.username ? true : false}
                        classes={{ root: classes.fieldInputHalfWidth }}
                      />
                      <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        size="small"
                        variant="outlined"
                        required
                        inputRef={register({
                          required: {
                            value: true,
                            message: 'The password is required.'
                          },
                          minLength: {
                            value: 8,
                            message: 'The password must have a minimum length of 8 characters.'
                          }
                        })}
                        error={errors.password ? true : false}
                        classes={{ root: classes.fieldInputHalfWidth }}
                      />
                    </div>
                    <TextField
                      id="email"
                      name="email"
                      type="email"
                      label="Email address"
                      size="small"
                      variant="outlined"
                      required
                      inputRef={register({
                        required: {
                          value: true,
                          message: 'The email address is required.'
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'The email address must be a string in a valid email address format.'
                        }
                      })}
                      error={errors.email ? true : false}
                      classes={{ root: classes.fieldInputFullWidth }}
                    />
                    <div className="name">
                      <TextField
                        id="first-name"
                        name="firstName"
                        type="text"
                        label="First name"
                        size="small"
                        variant="outlined"
                        required
                        inputRef={register({
                          required: {
                            value: true,
                            message: 'The first name is required.'
                          },
                          validate: {
                            isString: value => value.length === 0 || isNaN(value) || 'The first name must be a string.'
                          },
                          maxLength: {
                            value: 30,
                            message: 'The first name must have a maximum length of 30 characters.'
                          }
                        })}
                        error={errors.firstName ? true : false}
                        classes={{ root: classes.fieldInputHalfWidth }}
                      />
                      <TextField
                        id="last-name"
                        name="lastName"
                        type="text"
                        label="Last name"
                        size="small"
                        variant="outlined"
                        required
                        inputRef={register({
                          required: {
                            value: true,
                            message: 'The last name is required.'
                          },
                          validate: {
                            isString: value => value.length === 0 || isNaN(value) || 'The last name must be a string.'
                          },
                          maxLength: {
                            value: 30,
                            message: 'The last name must have a maximum length of 30 characters.'
                          }
                        })}
                        error={errors.lastName ? true : false}
                        classes={{ root: classes.fieldInputHalfWidth }}
                      />
                    </div>
                    <Autocomplete
                      options={countries}
                      filterOptions={createFilterOptions({ matchFrom: 'start' })}
                      autoHighlight
                      getOptionLabel={option => option.shortName}
                      renderInput={params => (
                        <TextField
                          {...params}
                          id="country"
                          name="country"
                          type="text"
                          label="Country of residence"
                          size="small"
                          variant="outlined"
                          required
                          inputRef={register({
                            required: {
                              value: true,
                              message: 'The country is required.'
                            }
                          })}
                          error={errors.country ? true : false}
                        />
                      )}
                      renderOption={option => (
                        <div className="country">
                          <img src={images_countries_flags[`image_country${option.countryId}`]} />
                          <span>{option.shortName}</span>
                        </div>
                      )}
                      noOptionsText="No country has been found."
                      onChange={(e, newCountry) => handleCountry(newCountry)}
                      classes={{ root: classes.fieldInputFullWidth }}
                    />
                    <FormControlLabel
                      id="terms-and-privacy"
                      name="termsAndPrivacy"
                      control={
                        <Checkbox
                          color="primary"
                          required
                          inputRef={register({
                            required: {
                              value: true,
                              message: 'You must agree to the Terms of Service and Privacy Policy.'
                            }
                          })}
                        />
                      }
                      label={
                        <span>
                          I agree to the{' '}
                          <button onClick={toggleModalTerms} className="terms-privacy">
                            Terms of Service
                          </button>{' '}
                          and{' '}
                          <button onClick={toggleModalPrivacy} className="terms-privacy">
                            Privacy Policy
                          </button>
                          .
                        </span>
                      }
                      classes={{ root: classes.termsAndPrivacyLabel }}
                    />
                    <Modal center open={isModalTermsOpen} onClose={toggleModalTerms} styles={stylesModalTermsPrivacy}>
                      <h2>Terms of Service</h2>
                      <hr />
                      <TermsOfService />
                    </Modal>
                    <Modal
                      center
                      open={isModalPrivacyOpen}
                      onClose={toggleModalPrivacy}
                      styles={stylesModalTermsPrivacy}
                    >
                      <h2>Privacy Policy</h2>
                      <hr />
                      <PrivacyPolicy />
                    </Modal>
                  </div>
                  <FormHelperText classes={{ root: classes.noteRequiredFieldsText }}>
                    Note: all the fields marked with the symbol * are required.
                  </FormHelperText>
                  <div className="errors">
                    {Object.keys(errors).map(fieldName => (
                      <p key={fieldName}>{errors[fieldName].message}</p>
                    ))}
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isFormCompleted ? false : true}
                    onClick={handleSignUp}
                  >
                    CREATE ACCOUNT
                  </Button>
                </FormControl>
              </ThemeProvider>
              <div className="login">
                <span>Already have an account?</span>
                <Link to="/login">Login</Link>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
      <style jsx>{styles}</style>
    </div>
  );
}
