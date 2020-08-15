import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React from 'react';
import { PersonalDetailsContainer } from './Components/PersonalDetails/PersonalDetails';
import { EducationalDetails } from './Components/EducationalDetails/EducationalDetails';
import { UserDetailsContainer } from './Components/UserDetails/UserDetails';
import { history } from './Utils/history';

export const AppRoutes = (props) => {
  console.log('props', props);
  return (
    <Router history={history}>
      <Route exact path='/' component={PersonalDetailsContainer} />
      <Route path='/personal-details' component={PersonalDetailsContainer} />
      <Route path='/user/:id' component={UserDetailsContainer} />
    </Router>
  );
};
