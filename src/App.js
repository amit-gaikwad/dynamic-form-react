import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { AppRoutes } from './AppRoutes';
import { store } from './Reducers/store';

function App() {
  return (
    <Provider store={store}>
      <AppRoutes></AppRoutes>
    </Provider>
  );
}

export default App;
