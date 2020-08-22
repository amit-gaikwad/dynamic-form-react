import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Card, Avatar, Button, Skeleton, List } from 'antd';
import { connect } from 'react-redux';

import { HeaderComponent } from '../Header/Header';
import { useEffect } from 'react';
import { fetchNotificationsByUserId } from '../../Actions/NotificationsAction';
import Meta from 'antd/lib/card/Meta';
import { fetchPersonalDetailsByUserId } from '../../Actions/ResourceAction';
import { getFieldsValueFromAtributes } from '../../Utils/common-methods';
import { isEmpty } from 'lodash';

const { Header, Content, Footer, Sider } = Layout;
const data = [
  {
    title: 'Upcoming Event 1'
  },
  {
    title: 'Upcoming Event 2'
  },
  {
    title: 'Upcoming Event 3'
  }
];
const PageLayoutComponent = (props) => {
  useEffect(() => {
    props.fetchNotificationsByUserId(localStorage.getItem('userID'));
    props.fetchPersonalDetailsByUserId(localStorage.getItem('userID'));
  }, []);
  let user = {};
  if (props.personalDetailsByUserId[0]) {
    user = getFieldsValueFromAtributes(props.personalDetailsByUserId[0].attributes);
  }
  return (
    <Layout className='layout'>
      <HeaderComponent {...props}></HeaderComponent>
      <Layout style={{ marginTop: 64 }}>
        <Sider width={'20%'} style={{ background: '#f0f2f5' }}>
          {!isEmpty(user) ? (
            <Card
              style={{ width: 300, margin: 20 }}
              cover={<div style={{ background: 'black', height: '100px' }}></div>}
              actions={[<Button key='setting'>View Profile</Button>]}>
              <Meta
                avatar={<Avatar src={user['Photo']} />}
                title={
                  <a
                    href={
                      'https://localhost:3000/user/' + user.userId
                    }>{`${user['First Name']} ${user['Last Name']}`}</a>
                }
                description={`${user['First Name']} ${user['Last Name']}`}
              />
            </Card>
          ) : (
            <Skeleton>
              <Card style={{ width: 300, margin: 20 }}></Card>
            </Skeleton>
          )}
        </Sider>
        <Content>
          <div className='site-layout-content'>{props.content}</div>
        </Content>
        <Sider width={'30%'} style={{ background: '#f0f2f5' }}>
          <Card title='Upcoming Events' bordered={true} style={{ width: 350, margin: 20 }}>
            <List
              itemLayout='horizontal'
              dataSource={data}
              renderItem={(item) => {
                debugger;
                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                      }
                      title={<a href='https://ant.design'>{item.title}</a>}
                      description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                    />
                  </List.Item>
                );
              }}
            />
          </Card>
        </Sider>
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
    notificationsByUserId: state.notificationsReducer.notificationsByUserId,
    personalDetailsByUserId: state.resources.personalDetailsByUserId || []
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchNotificationsByUserId: (id) => dispatch(fetchNotificationsByUserId(id)),
  fetchPersonalDetailsByUserId: (userId) => dispatch(fetchPersonalDetailsByUserId(userId))
});

export const PageLayout = connect(mapStateToProps, mapDispatchToProps)(PageLayoutComponent);
