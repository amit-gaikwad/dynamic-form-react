import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React from 'react';
import { PersonalDetailsContainer } from './Components/PersonalDetails/PersonalDetails';
import { EducationalDetails } from './Components/EducationalDetails/EducationalDetails';
import { UserDetailsContainer } from './Components/UserDetails/UserDetails';
import { Layout, Menu, Breadcrumb, Input } from 'antd';
import { history } from './Utils/history';
const { Header, Content, Footer, Sider } = Layout;

export const AppRoutes = (props) => {
  console.log('props', props);
  return (
    <Router history={history}>
      <Layout className='layout'>
        <Header
          style={{
            backgroundColor: '#283e4a',
            padding: '0 15%',
            position: 'fixed',
            width: '100%',
            zIndex: 1
          }}>
          <div className='logo' />
          <Menu
            style={{ backgroundColor: '#283e4a', color: '#b4bfc7' }}
            mode='horizontal'
            defaultSelectedKeys={['1']}>
            <Menu.Item>
              <Input placeholder='search' />
            </Menu.Item>
            <Menu.Item key='1'>
              <Link style={{ color: '#b4bfc7' }} to='/'>
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key='2'>
              <Link style={{ color: '#b4bfc7' }} to='/'>
                My Network
              </Link>
            </Menu.Item>
            <Menu.Item key='3'>
              <Link
                style={{ color: '#b4bfc7' }}
                to={'/user/amit' + (Math.floor(Math.random() * 100) % 3)}>
                My Profile
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout style={{ marginTop: 64 }}>
          <Sider width={'15%'} style={{ background: '#f0f2f5' }}></Sider>

          <Content>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item> */}
            </Breadcrumb>
            <div className='site-layout-content'>
              <Route exact path='/' component={PersonalDetailsContainer} />
              <Route path='/personal-details' component={PersonalDetailsContainer} />
              <Route path='/educational-details' component={EducationalDetails} />
              <Route path='/user/:id' component={UserDetailsContainer} />
            </div>
          </Content>
          <Sider width={'15%'} style={{ background: '#f0f2f5' }}></Sider>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>Mentor Link App ©2020</Footer>
      </Layout>
    </Router>
  );
};
