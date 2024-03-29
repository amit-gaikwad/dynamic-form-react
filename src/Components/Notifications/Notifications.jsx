import React from 'react';
import { Row, Col, Divider, Button, Skeleton, Avatar, List } from 'antd';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { getFieldsValueFromAtributes } from '../../Utils/common-methods';
import { PageLayout } from '../Layout/PageLayout';
import { useEffect } from 'react';
import { fetchNotificationsByUserId } from '../../Actions/NotificationsAction';
import { Collapse } from 'antd';
import { useState } from 'react';
import { connectFromToUser, rejectConnection } from '../../Actions/ConnectionsAction';
import { URL_PATH } from '../../Utils/config';

const { Panel } = Collapse;

const text = 'This is text';
const Notifications = (props) => {
  const [connectionRequests, setconnectionRequests] = useState([]);
  const userId = get(props, 'match.params.id', '');

  useEffect(() => {
    props.fetchNotificationsByUserId(userId);
  }, []);

  useEffect(() => {
    const connections = [];
    props.notificationsByUserId.forEach((item) => {
      connections.push(getFieldsValueFromAtributes(item.attributes));
    });
    setconnectionRequests(connections);
  }, [props.notificationsByUserId]);

  const onAcceptClick = (item) => {
    props.connectFromToUser({ fromUserId: userId, toUserId: item.userId });
  };

  const onDeclineClick = (item) => {
    props.rejectConnection({ fromUserId: userId, toUserId: item.userId });
  };

  return (
    <PageLayout
      {...props}
      content={
        <Row style={{ width: '100%' }}>
          <Col span={24}>
            <Collapse defaultActiveKey={['1']}>
              <Panel header='Connection Invitations' key='1'>
                <List
                  itemLayout='horizontal'
                  dataSource={connectionRequests}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button
                          key='list-loadmore-edit'
                          onClick={() => {
                            onDeclineClick(item);
                          }}>
                          Decline
                        </Button>,
                        <Button
                          type='primary'
                          onClick={() => {
                            onAcceptClick(item);
                          }}>
                          Accept
                        </Button>
                      ]}>
                      <List.Item.Meta
                        avatar={<Avatar src={item['Photo']} />}
                        title={
                          <a
                            href={`${URL_PATH}/user/fromUserId/${userId}/toUserId/${item.userId}`}
                            target='_blank'>{`${item['First Name']} ${item['Last Name']}`}</a>
                        }
                        description={`${item['First Name']} ${item['Last Name']}`}
                      />
                    </List.Item>
                  )}
                />
              </Panel>
              <Panel header='Event Invitations' key='2'>
                <List
                  itemLayout='horizontal'
                  dataSource={[]}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button
                          key='list-loadmore-edit'
                          onClick={() => {
                            onDeclineClick(item);
                          }}>
                          Decline
                        </Button>,
                        <Button
                          type='primary'
                          onClick={() => {
                            onAcceptClick(item);
                          }}>
                          Accept
                        </Button>
                      ]}>
                      <List.Item.Meta
                        avatar={
                          <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                        }
                        title={
                          <a href='https://ant.design'>{`${item['First Name']} ${item['Last Name']}`}</a>
                        }
                        description={`${item['First Name']} ${item['Last Name']}`}
                      />
                    </List.Item>
                  )}
                />
              </Panel>
              <Panel header='Feedback Invitations' key='3'>
                <List
                  itemLayout='horizontal'
                  dataSource={[]}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button
                          key='list-loadmore-edit'
                          onClick={() => {
                            onDeclineClick(item);
                          }}>
                          Decline
                        </Button>,
                        <Button
                          type='primary'
                          onClick={() => {
                            onAcceptClick(item);
                          }}>
                          Accept
                        </Button>
                      ]}>
                      <List.Item.Meta
                        avatar={
                          <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                        }
                        title={
                          <a href='https://ant.design'>{`${item['First Name']} ${item['Last Name']}`}</a>
                        }
                        description={`${item['First Name']} ${item['Last Name']}`}
                      />
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
          </Col>
        </Row>
      }></PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    counter: state.resource,
    notificationsByUserId: state.notificationsReducer.notificationsByUserId
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchNotificationsByUserId: (id) => dispatch(fetchNotificationsByUserId(id)),
  connectFromToUser: (obj) => dispatch(connectFromToUser(obj)),
  rejectConnection: (obj) => dispatch(rejectConnection(obj))
});

export const NotificationsContainer = connect(mapStateToProps, mapDispatchToProps)(Notifications);
