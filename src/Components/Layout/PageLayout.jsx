import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Card, Avatar, Button, Skeleton, List } from 'antd';
import { connect } from 'react-redux';

import { HeaderComponent } from '../Header/Header';
import { useEffect } from 'react';
import { fetchNotificationsByUserId } from '../../Actions/NotificationsAction';
import Meta from 'antd/lib/card/Meta';
import { fetchPersonalDetailsByUserId, fetchSystemTemplates } from '../../Actions/ResourceAction';
import { getFieldsValueFromAtributes } from '../../Utils/common-methods';
import { isEmpty } from 'lodash';
import { URL_PATH } from '../../Utils/config';

const { Header, Content, Footer, Sider } = Layout;
const data = [
  {
    title: 'Renegade San Francisco',
    description:
      'Renegade San Francisco returns with 275+ creatives for a springtime marketplace on August 29 + 30 at Fort Mason Center Festival Pavilion. Renegade Craft is free to attend & all are welcome.'
  },
  {
    title: 'REIMAGINE 2020',
    description:
      'Get an exclusive inside look at the future of blockchain and crypto in our system. Join the Reimagine "Disrupt The System" Virtual Conference, a 72-hour live event bringing together industry leaders, universities, and enterprises innovating to solve real problems, now.'
  },
  {
    title: 'COMEDY AT ZINQUE',
    description:
      'Comedy for the classy has a spot at Zinque in Downtown Los Angeles.New comics every Sunday at 830p. Produced by Mitchell Lamar.939 S Broadway.'
  }
];
const PageLayoutComponent = (props) => {
  useEffect(() => {
    props.fetchNotificationsByUserId(localStorage.getItem('userID'));
    props.fetchPersonalDetailsByUserId(localStorage.getItem('userID'));
    props.fetchSystemTemplates();
  }, []);
  let user = {};
  if (props.personalDetailsByUserId[0]) {
    user = getFieldsValueFromAtributes(props.personalDetailsByUserId[0].attributes);
  }
  return (
    <Layout className='layout'>
      <HeaderComponent {...props}></HeaderComponent>
      <Layout style={{ marginTop: 64 }}>
        <Sider
          width={'20%'}
          style={{ background: '#f0f2f5' }}
          className={props.blurBackground ? 'blurBg' : ''}>
          {!isEmpty(user) ? (
            <Card
              style={{ width: '80%', margin: 20 }}
              cover={<div style={{ background: 'black', height: '100px' }}></div>}
              actions={[<Button key='setting'>View Profile</Button>]}>
              <Meta
                avatar={<Avatar src={user['Photo']} />}
                title={
                  <a
                    href={`${URL_PATH}/user/${user.userId}`}>{`${user['First Name']} ${user['Last Name']}`}</a>
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
        <Content className={props.blurBackground ? 'blurBg' : ''}>
          <div className='site-layout-content'>{props.content}</div>
        </Content>
        <Sider
          width={'30%'}
          style={{ background: '#f0f2f5' }}
          className={props.blurBackground ? 'blurBg' : ''}>
          <Card title='Upcoming Events' bordered={true} style={{ width: 350, margin: 20 }}>
            <List
              itemLayout='horizontal'
              dataSource={data}
              renderItem={(item) => {
                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                      }
                      title={<a href='https://ant.design'>{item.title}</a>}
                      description={item.description}
                      //description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget bibendum elit. Fusce facilisis accumsan dui, efficitur commodo ante facilisis ut.'
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
