import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import { HeaderComponent } from '../Header/Header';

const { Header, Content, Footer, Sider } = Layout;
export const PageLayout = (props) => {
  console.log('new Props in page layout', props);
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

PageLayout.propTypes = {
  header: PropTypes.node,
  content: PropTypes.node.isRequired
};
