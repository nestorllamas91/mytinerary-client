import React, { Fragment } from 'react';
import stylesReset from '$client/app/styles-reset';
import stylesGlobal from '$client/app/styles-global';

import { BrowserRouter as Router, Switch as Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from '$client/app/_shared/user/slice';
import jwtDecode from 'jwt-decode';

import NavBarTop from '$client/app/_shared/nav-bar-top/component';
import NavBarBottom from '$client/app/_shared/nav-bar-bottom/component';
import LandingPage from '$client/app/landing/component';
import CitiesPage from '$client/app/cities/component';
import ItinerariesPage from '$client/app/itineraries/component';
import RegisterPage from '$client/app/register/component';
import LoginPage from '$client/app/login/component';
import NotFoundPage from '$client/app/not-found/component';

export default function App() {
  const dispatch = useDispatch();

  const token = window.localStorage.getItem('token');
  if (token) {
    const user = jwtDecode(token);
    dispatch(loadUser(user));
  }

  return (
    <Fragment>
      <Router>
        <NavBarTop />
        <main>
          <Routes>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/cities" component={CitiesPage} />
            <Route exact path="/cities/:cityId" component={ItinerariesPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route component={NotFoundPage} />
          </Routes>
        </main>
        <NavBarBottom />
      </Router>
      <style jsx global>
        {stylesReset}
      </style>
      <style jsx global>
        {stylesGlobal}
      </style>
    </Fragment>
  );
}
