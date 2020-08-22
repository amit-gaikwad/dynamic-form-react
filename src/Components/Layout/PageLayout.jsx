import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { connect } from 'react-redux';

import { HeaderComponent } from '../Header/Header';
import { useEffect } from 'react';
import { fetchNotificationsByUserId } from '../../Actions/NotificationsAction';

const { Header, Content, Footer, Sider } = Layout;
const PageLayoutComponent = (props) => {
  useEffect(() => {
    props.fetchNotificationsByUserId(localStorage.getItem('userID'));
  }, []);

  return (
    <Layout className='layout'>
      <HeaderComponent {...props}></HeaderComponent>
      <Layout style={{ marginTop: 64 }}>
        <Sider width={'20%'} style={{ background: '#f0f2f5' }}></Sider>
        <Content>
          <div className='site-layout-content'>{props.content}</div>
        </Content>
        <Sider width={'30%'} style={{ background: '#f0f2f5' }}></Sider>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Mentor Link App ©2020</Footer>
    </Layout>
  );
};

PageLayoutComponent.propTypes = {
  header: PropTypes.node,
  content: PropTypes.node.isRequired
};

const mapStateToProps = (state) => {
  return {
    notificationsByUserId: state.notificationsReducer.notificationsByUserId
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchNotificationsByUserId: (id) => dispatch(fetchNotificationsByUserId(id))
});

export const PageLayout = connect(mapStateToProps, mapDispatchToProps)(PageLayoutComponent);
