import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React from 'react';
import { PersonalDetails } from './Components/PersonalDetails/PersonalDetails';
import { EducationalDetails } from './Components/EducationalDetails/EducationalDetails';
import { UserDetailsContainer } from './Components/UserDetails/UserDetails';
import { history } from './Utils/history';
import { NotificationsContainer } from './Components/Notifications/Notifications';
import { NetworkContainer } from './Components/Network/Network';
import { NonEditableUserDetailsContainer } from './Components/UserDetails/NonEditableUserDetails';
import { HomeContainer } from './Components/HomeComponent/HomeComponent';
import { EventContainer } from './Components/Event/Event';
import { PersonalChatContainer } from './Components/Chat/PersonalChat';
import { CreateeditpostcomponentContainer } from './Components/Posts/CreateEditPostComponent';

export const AppRoutes = (props) => {
  return (
    <Router history={history}>
      {/* <Route exact path='/' component={PersonalDetails} />
      <Route exact path='/personal-details' component={PersonalDetails} /> */}
      <Route exact path='/user/:id/connections' component={NetworkContainer} />
      <Route exact path='/user/:id/notifications' component={NotificationsContainer} />
      <Route exact path='/user/:id/' component={UserDetailsContainer} />
      <Route exact path='/user/:id/home' component={HomeContainer} />
      <Route exact path='/user/:id/create-event' component={EventContainer} />
      <Route exact path='/user/:id/post' component={CreateeditpostcomponentContainer} />
      <Route exact path='/user/:id/post/:postId' component={CreateeditpostcomponentContainer} />
      <Route
        exact
        path='/user/:id/post/:editPostId/edit'
        component={CreateeditpostcomponentContainer}
      />
      <Route
        exact
        path='/user/fromUserId/:id/toUserId/:toUserId'
        component={NonEditableUserDetailsContainer}
      />

      <Route
        exact
        path='/message/fromUserId/:id/toUserId/:toUserId'
        component={PersonalChatContainer}
      />
    </Router>
  );
};
