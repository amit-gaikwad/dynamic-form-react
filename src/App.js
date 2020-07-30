import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { AppRoutes } from './AppRoutes';
import { store } from './Reducers/store';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Provider store={store}>
      <AppRoutes></AppRoutes>
    </Provider>
  );
}

export default App;
