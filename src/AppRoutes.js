import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React from 'react';
import { PersonalDetailsContainer } from './Components/PersonalDetails/PersonalDetails';
import { EducationalDetails } from './Components/EducationalDetails/EducationalDetails';
import { UserDetailsContainer } from './Components/UserDetails/UserDetails';

export const AppRoutes = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to='/personal-details'>Personal Details</Link>
        </li>
        <li>
          <Link to='/educational-details'>Education Details</Link>
        </li>
      </ul>
      <Route exact path='/' component={PersonalDetailsContainer} />
      <Route path='/personal-details' component={PersonalDetailsContainer} />
      <Route path='/educational-details' component={EducationalDetails} />
      <Route path='/user/:id' component={UserDetailsContainer} />
    </Router>
  );
};
