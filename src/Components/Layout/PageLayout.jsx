import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Card, Avatar, Button, Menu, Skeleton, List, Row, Input } from 'antd';
import { connect } from 'react-redux';

import { HeaderComponent } from '../Header/Header';
import { useEffect } from 'react';
import { fetchNotificationsByUserId } from '../../Actions/NotificationsAction';
import Meta from 'antd/lib/card/Meta';
import { fetchPersonalDetailsByUserId, fetchSystemTemplates } from '../../Actions/ResourceAction';
import { getFieldsValueFromAtributes } from '../../Utils/common-methods';
import { get, isEmpty } from 'lodash';
import { URL_PATH } from '../../Utils/config';

import { useState } from 'react';
import { ChatListContainer } from '../Chat/ChatList';
import { Link } from 'react-router-dom';
import { LeftSectionContainer } from './LeftSection';
const { SubMenu } = Menu;

const { Header, Content, Footer, Sider } = Layout;

const PageLayoutComponent = (props) => {
  const [collapsed, setcollapsed] = useState(false);
  useEffect(() => {
    props.fetchNotificationsByUserId(localStorage.getItem('userID'));
    props.fetchPersonalDetailsByUserId(localStorage.getItem('userID'));
    props.fetchSystemTemplates();
  }, []);
  let user = {};
  const userId = get(props, 'match.params.id', '');
  if (props.personalDetailsByUserId[0]) {
    user = getFieldsValueFromAtributes(props.personalDetailsByUserId[0].attributes);
  }
  const toggleCollapsed = () => {
    setcollapsed(!collapsed);
  };
  return (
    <>
      <Layout className='layout'>
        <HeaderComponent {...props}></HeaderComponent>
        <Layout style={{ marginTop: 64 }}>
          <Sider
            width={'25%'}
            style={{ background: '#f0f2f5' }}
            className={props.blurBackground ? 'blurBg' : ''}>
            {/* <Button type='primary' onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button> */}
            <div
            // style={{
            //   position: props.blurBackground && 'fixed',
            //   width: props.blurBackground && '25%'
            // }}
            >
              <LeftSectionContainer {...props}></LeftSectionContainer>
            </div>
          </Sider>
          <Content
            className={props.blurBackground ? 'blurBg' : ''}
            style={{
              marginTop: '20px',
              boxShadow: '0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2)'
            }}>
            <div className='site-layout-content'>{props.content}</div>
          </Content>
          <Sider
            width={'30%'}
            style={{ background: '#f5f5f5' }}
            className={props.blurBackground ? 'blurBg' : ''}>
            {/* <ChatList></ChatList> */}
          </Sider>
        </Layout>
        {/* <Footer style={{ textAlign: 'center' }}>Mentor Link App ©2020</Footer> */}
      </Layout>
      <ChatListContainer {...props}></ChatListContainer>
    </>
  );
};

PageLayoutComponent.propTypes = {
  header: PropTypes.node,
  content: PropTypes.node.isRequired
};

const mapStateToProps = (state) => {
  return {
    notificationsByUserId: state.notificationsReducer.notificationsByUserId,
    personalDetailsByUserId: state.resources.personalDetailsByUserId || [],
    blurBackground: state.userReducer.blurBackground
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchNotificationsByUserId: (id) => dispatch(fetchNotificationsByUserId(id)),
  fetchPersonalDetailsByUserId: (userId) => dispatch(fetchPersonalDetailsByUserId(userId)),
  fetchSystemTemplates: () => dispatch(fetchSystemTemplates())
});

export const PageLayout = connect(mapStateToProps, mapDispatchToProps)(PageLayoutComponent);
