import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Input, Row, Col, Badge } from 'antd';
import { SearchContainer } from '../SearchComponent/SearchComponent';
import { get } from 'lodash';
import logo from './logo3.png';

const { Header, Content, Footer, Sider } = Layout;

export const HeaderComponent = (props) => {
  const userId = get(props, 'match.params.id', '');
  localStorage.setItem('userID', userId);
  return (
    <Header
      style={{
        backgroundColor: '#283e4a',
        padding: '0 15%',
        position: 'fixed',
        width: '100%',
        zIndex: 1
      }}>
      <Row>
        <Col span={1}>
          <div className='logo'>
            <img src={logo} width={'100%'} height={'100%'}></img>
          </div>
        </Col>
        <Col span={10}>
          <SearchContainer {...props} userId={userId}></SearchContainer>
        </Col>
        <Col span={12}>
          <Menu style={{ backgroundColor: '#283e4a', color: '#b4bfc7' }} mode='horizontal'>
            <Menu.Item key='1'>
              <Link style={{ color: '#b4bfc7' }} to={`/user/${userId}/home`}>
                Home
              </Link>
            </Menu.Item>
            {/* <Menu.Item key='2'>
              <Link style={{ color: '#b4bfc7' }} to={`/user/${userId}/connections`}>
                My Network
              </Link>
            </Menu.Item> */}
            <Menu.Item key='3'>
              {props.notificationsByUserId.length > 0 ? (
                <Badge
                  count={props.notificationsByUserId.length}
                  overflowCount={5}
                  offset={[10, 0]}>
                  <Link style={{ color: '#b4bfc7' }} to={`/user/${userId}/notifications`}>
                    Notifications
                  </Link>
                </Badge>
              ) : (
                <Link style={{ color: '#b4bfc7' }} to={`/user/${userId}/notifications`}>
                  Notifications
                </Link>
              )}
            </Menu.Item>
            <Menu.Item key='4'>
              <Link style={{ color: '#b4bfc7' }} to={`/user/${userId}`}>
                My Profile
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>
  );
};
