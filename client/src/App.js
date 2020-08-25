// import React, { useState, useEffect } from "react";
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import "./App.css";

import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Header from './components/Header';
import NotFound from './components/NotFound';
import NotFoundRedirect from './components/NotFoundRedirect';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';

import PrivateRoute from './PrivateRoute';

const App = () => {
  return(
    <Router>
      <div>
        <Header />

        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute path="/courses/create" component={CreateCourse} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOut} />
          <Route path="/error" component={UnhandledError} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/notFound" component={NotFound} />
          <Route component={NotFoundRedirect} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
