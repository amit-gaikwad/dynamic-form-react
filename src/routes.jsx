import React from 'react';

export const Routes = () => {
  return (
    <Router history={history}>
      <div className='site-layout-content'>
        <Route exact path='/' component={PersonalDetailsContainer} />
        <Route path='/personal-details' component={PersonalDetailsContainer} />
        <Route path='/educational-details' component={EducationalDetails} />
        <Route path='/user/:id' component={UserDetailsContainer} />
      </div>
    </Router>
  );
};
