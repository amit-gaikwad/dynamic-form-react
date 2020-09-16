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
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import { ChatList } from '../Chat/ChatList';
import { Link } from 'react-router-dom';
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
            <div style={{ position: 'fixed', width: '25%' }}>
              <Row style={{ width: '80%', margin: '20px' }}>
                <Menu
                  // defaultSelectedKeys={['1']}
                  // defaultOpenKeys={['sub1']}
                  mode='inline'
                  style={{ border: '1px dashed gray' }}
                  inlineCollapsed={collapsed}>
                  {/* <div key='1' icon={<PieChartOutlined />} onClick={toggleCollapsed}>
                    Hide Menu
                  </div> */}
                  <Menu.Item key='2' icon={<UserOutlined />}>
                    <Link style={{ color: '#b4bfc7' }} to={`/user/${userId}`}>
                      My Profile
                    </Link>
                  </Menu.Item>
                  <SubMenu key='sub1' icon={<UsergroupAddOutlined />} title='Connections'>
                    <Menu.Item key='5'>
                      <Link style={{ color: '#b4bfc7' }} to={`/user/${userId}/connections`}>
                        Connections
                      </Link>
                    </Menu.Item>
                    <Menu.Item key='6'>
                      <Link style={{ color: '#b4bfc7' }} to={`/user/${userId}/connections`}>
                        Groups
                      </Link>
                    </Menu.Item>
                    <Menu.Item key='7'>
                      <Link style={{ color: '#b4bfc7' }} to={`/user/${userId}/connections`}>
                        Broadcast List
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key='4' icon={<ContainerOutlined />}>
                    Send Invite To Friend
                  </Menu.Item>
                  <Menu.Item key='19' icon={<ContainerOutlined />}>
                    Inbox
                  </Menu.Item>
                  <SubMenu key='sub2' icon={<AppstoreOutlined />} title='Settings'>
                    <Menu.Item key='9'>Option 9</Menu.Item>
                    <Menu.Item key='10'>Option 10</Menu.Item>
                    <SubMenu key='sub3' title='Submenu'>
                      <Menu.Item key='11'>Option 11</Menu.Item>
                      <Menu.Item key='12'>Option 12</Menu.Item>
                    </SubMenu>
                  </SubMenu>
                  <Menu.Item key='13' icon={<ContainerOutlined />}>
                    CAREER RESOURCES
                  </Menu.Item>
                </Menu>
              </Row>
            </div>
          </Sider>
          <Content className={props.blurBackground ? 'blurBg' : ''} style={{ marginTop: '20px' }}>
            <div className='site-layout-content'>{props.content}</div>
          </Content>
          <Sider
            width={'30%'}
            style={{ background: '#f0f2f5' }}
            className={props.blurBackground ? 'blurBg' : ''}>
            {/* <ChatList></ChatList> */}
          </Sider>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>Mentor Link App ©2020</Footer>
      </Layout>
      <ChatList></ChatList>
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
