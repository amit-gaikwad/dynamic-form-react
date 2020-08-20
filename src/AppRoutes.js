import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React from 'react';
import { PersonalDetailsContainer } from './Components/PersonalDetails/PersonalDetails';
import { EducationalDetails } from './Components/EducationalDetails/EducationalDetails';
import { UserDetailsContainer } from './Components/UserDetails/UserDetails';
import { history } from './Utils/history';
import { NotificationsContainer } from './Components/Notifications/Notifications';
import { NetworkContainer } from './Components/Network/Network';

export const AppRoutes = (props) => {
  return (
    <Router history={history}>
      <Route exact path='/' component={PersonalDetailsContainer} />
      <Route exact path='/personal-details' component={PersonalDetailsContainer} />
      <Route exact path='/user/:id/connections' component={NetworkContainer} />
      <Route exact path='/user/:id/notifications' component={NotificationsContainer} />
      <Route exact path='/user/:id' component={UserDetailsContainer} />
    </Router>
  );
};
