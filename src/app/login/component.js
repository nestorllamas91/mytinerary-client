import React, { useState, useEffect } from 'react';
import styles, { stylesMaterialUi, themeMaterialUi } from '$client/app/login/styles';

import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logInUser, loadUser } from '$client/app/_shared/user/slice';
import jwtDecode from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { ThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import image_login from '$client/assets/images/misc/login.png';

export default function LoginPage() {
  const { userIsLoading, userData, userError } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const { register, watch, errors } = useForm({ mode: 'onBlur', reValidateMode: 'onChange' });
  const watchFieldUsername = watch('username');
  const watchFieldPassword = watch('password');
  const watchFieldRememberSession = watch('rememberSession');
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [isRedirectToLanding, setIsRedirectToLanding] = useState(false);
  const classes = stylesMaterialUi();

  useEffect(() => {
    if (Object.keys(errors).length === 0 && watchFieldUsername && watchFieldPassword) {
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
      handleRedirectToHome();
    }
  }, [userData, userError]);

  async function handleLogIn() {
    const credentials = {
      username: watchFieldUsername,
      password: watchFieldPassword,
      rememberSession: watchFieldRememberSession
    };
    dispatch(logInUser(credentials));
  }

  function handleRedirectToHome() {
    setIsRedirectToLanding(true);
  }

  return (
    <div className="main-container">
      {isRedirectToLanding ? <Redirect to="/" /> : null}
      <ThemeProvider theme={themeMaterialUi}>
        <FormControl classes={{ root: classes.form }}>
          <h2>Log In</h2>
          <hr />
          {userError ? <span className="alert alert-error">{userError.output.message}</span> : null}
          <div className="fields">
            <div className="credentials">
              <div className="username">
                <AccountCircleIcon classes={{ root: classes.icon }} />
                <TextField
                  id="username"
                  name="username"
                  type="text"
                  label="Username"
                  size="small"
                  variant="outlined"
                  inputRef={register({
                    validate: {
                      isString: value => value.length === 0 || isNaN(value) || 'The username must be a string.'
                    },
                    maxLength: {
                      value: 20,
                      message: 'The username must have a maximum length of 20 characters.'
                    }
                  })}
                  error={errors.username ? true : false}
                  classes={{ root: classes.fieldInput }}
                />
              </div>
              <div className="password">
                <LockIcon classes={{ root: classes.icon }} />
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  size="small"
                  variant="outlined"
                  inputRef={register({
                    minLength: {
                      value: 8,
                      message: 'The password must have a minimum length of 8 characters.'
                    }
                  })}
                  error={errors.password ? true : false}
                  classes={{ root: classes.fieldInput }}
                />
              </div>
            </div>
            <FormControlLabel
              id="remember-session"
              name="rememberSession"
              control={<Checkbox color="primary" inputRef={register({})} />}
              label={<span>Remember me</span>}
              classes={{ root: classes.rememberSession }}
            />
          </div>
          <div className="errors">
            {Object.keys(errors).map(fieldName => (
              <p key={fieldName}>{errors[fieldName].message}</p>
            ))}
          </div>
          <Button variant="contained" color="primary" disabled={isFormCompleted ? false : true} onClick={handleLogIn}>
            LOG IN
          </Button>
        </FormControl>
      </ThemeProvider>
      <div className="register">
        <span>Don&apos;t have an account?</span>
        <Link to="/register">Register</Link>
      </div>
      <img src={image_login} alt="Login" className="login-image" />
      <style jsx>{styles}</style>
    </div>
  );
}
