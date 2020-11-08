import { Avatar, Button, Col, Divider, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { getUserName } from '../../Utils/common-methods';

const ShortInfoComponent = (props) => {
  const user = props.user || {};
  console.log('user on short ', user, getUserName(user));
  return (
    <Row
      style={{
        width: '100%',
        color: 'black',
        background: 'white',
        fontSize: 15,
        paddingTop: '5px',
        cursor: 'pointer',
        border: '1px solid '
      }}
      justify='space-around'
      align='middle'>
      <Col span={4}>
        <Avatar src={user['Photo']} size={30}></Avatar>
      </Col>
      <Col span={18}>{getUserName(user)}</Col>

      <Col
        span={20}
        offset={4}
        style={{
          fontWeight: 'normal',
          fontSize: 10
        }}>{`${user['description'] || `ReactJS | Angular 2 | Angular`}`}</Col>
      <Divider style={{ margin: 10 }}></Divider>
      <Row style={{ width: '100%' }} justify='space-around' align='middle'>
        <Col>
          <Link to={`/message/fromUserId/${user.userId}/toUserId/${user.userId}`}>Message</Link>
        </Col>
        <Col>
          <Link to={`/message/fromUserId/${user.userId}/toUserId/${user.userId}`}>Connect</Link>
        </Col>
        <Col>
          <Link to={`/message/fromUserId/${user.userId}/toUserId/${user.userId}`}>Other</Link>
        </Col>
      </Row>
    </Row>
  );
};

export default ShortInfoComponent;
