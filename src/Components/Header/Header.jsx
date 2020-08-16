import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Input, Row, Col } from 'antd';
import { SearchContainer } from '../SearchComponent/SearchComponent';
import { get } from 'lodash';

const { Header, Content, Footer, Sider } = Layout;

export const HeaderComponent = (props) => {
  const userId = get(props, 'match.params.id', '');
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
        <Col span={2}>
          <div className='logo' />
        </Col>
        <Col span={10}>
          <SearchContainer {...props} userId={userId}></SearchContainer>
        </Col>
        <Col span={12}>
          <Menu
            style={{ backgroundColor: '#283e4a', color: '#b4bfc7' }}
            mode='horizontal'
            defaultSelectedKeys={['1']}>
            <Menu.Item key='1'>
              <Link style={{ color: '#b4bfc7' }} to='/'>
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key='2'>
              <Link style={{ color: '#b4bfc7' }} to={`/user/${userId || 'amit'}/connections`}>
                My Network
              </Link>
            </Menu.Item>
            <Menu.Item key='3'>
              <Link style={{ color: '#b4bfc7' }} to={`/user/${userId || 'amit'}/notifications`}>
                Notifications
              </Link>
            </Menu.Item>
            <Menu.Item key='4'>
              <Link style={{ color: '#b4bfc7' }} to={`/user/${userId || 'amit'}`}>
                My Profile
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>
  );
};
