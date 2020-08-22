import React from 'react';
import { Row, Col, Divider, Button, Skeleton, Avatar, List } from 'antd';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { getFieldsValueFromAtributes } from '../../Utils/common-methods';
import { PageLayout } from '../Layout/PageLayout';
import { useEffect } from 'react';
import { fetchConnectionsByUserId, disconnectConnection } from '../../Actions/ConnectionsAction';
import { Collapse } from 'antd';
import { useState } from 'react';
import { connectFromToUser } from '../../Actions/ConnectionsAction';

const { Panel } = Collapse;

const text = 'This is text';
const NetworkComponent = (props) => {
  const [connectionsByUser, setconnectionsByUser] = useState([]);

  useEffect(() => {
    const userId = get(props, 'match.params.id', '');
    props.fetchConnectionsByUserId(userId);
  }, []);

  useEffect(() => {
    const connections = [];
    props.connectionsByUserId.forEach((item) => {
      connections.push(getFieldsValueFromAtributes(item.attributes));
    });
    console.log('connections', connections);
    setconnectionsByUser(connections);
  }, [props.connectionsByUserId]);

  const onDisconnectClick = (item) => {
    const userId = get(props, 'match.params.id', '');
    props.disconnectConnection({ fromUserId: userId, toUserId: item.userId });
  };

  return (
    <PageLayout
      {...props}
      content={
        <Row style={{ width: '100%' }}>
          <Col> My Network</Col>
          <Divider></Divider>
          <Col span={24}>
            <List
              itemLayout='horizontal'
              dataSource={connectionsByUser}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      type='danger'
                      onClick={() => {
                        onDisconnectClick(item);
                      }}>
                      Disconnect
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
          </Col>
          <Divider></Divider>
        </Row>
      }></PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    counter: state.resource,
    connectionsByUserId: state.connectionReducer.connectionsByUserId
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchConnectionsByUserId: (id) => dispatch(fetchConnectionsByUserId(id)),
  disconnectConnection: (obj) => dispatch(disconnectConnection(obj))
});

export const NetworkContainer = connect(mapStateToProps, mapDispatchToProps)(NetworkComponent);