import { Avatar, Col, Divider, Menu, Row } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { get } from 'lodash';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPersonalDetailsByUserId } from '../../Actions/ResourceAction';
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
import { getFieldsValueFromAtributes, getUserName } from '../../Utils/common-methods';
import { history } from '../../Utils/history';

const LeftSection = (props) => {
  const [collapsed, setcollapsed] = useState(false);
  const userId = get(props, 'match.params.id', '');

  useEffect(() => {
    props.fetchPersonalDetailsByUserId(localStorage.getItem('userID'));
  }, []);

  const toggleCollapsed = () => {
    setcollapsed(!collapsed);
  };
  let user = {};
  if (props.personalDetailsByUserId[0]) {
    user = getFieldsValueFromAtributes(props.personalDetailsByUserId[0].attributes);
  }
  console.log('user', user, history);

  return (
    <Row style={{ width: '80%', margin: '20px' }}>
      <Row
        style={{
          width: '100%',
          background: 'white',
          borderBottom: '1px solid black',
          flexDirection: 'column',
          padding: 10,
          fontWeight: 'bold',
          fontSize: 20,
          cursor: 'pointer'
        }}
        onClick={() => {
          window.location.href = `/user/${userId}`;
          //history.push(`/user/${userId}`);
        }}
        justify='space-around'
        align='middle'>
        <Col>
          <Avatar src={user['Photo']} size={150}></Avatar>
        </Col>

        <Col>{getUserName(user)}</Col>
        <Col
          style={{
            fontWeight: 'normal',
            fontSize: 13
          }}>{`${
          user['description'] || `ReactJS | Angular 2 | Angular 7 | NodeJS Developer`
        }`}</Col>
      </Row>
      <Menu
        // defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode='inline'
        //  style={{ border: '1px dashed gray' }}
        inlineCollapsed={collapsed}>
        {/* <div key='1' icon={<PieChartOutlined />} onClick={toggleCollapsed}>
                    Hide Menu
                  </div> */}

        {/* <SubMenu key='sub1' icon={<UsergroupAddOutlined />} title='Connections'>
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
        </SubMenu> */}
        <Menu.Item key='sub1' icon={<UsergroupAddOutlined />}>
          <Link style={{ color: '#b4bfc7' }} to={`/user/${userId}/connections`}>
            Connections
          </Link>
        </Menu.Item>
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
  );
};

const mapStateToProps = (state) => {
  return {
    personalDetailsByUserId: state.resources.personalDetailsByUserId || []
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPersonalDetailsByUserId: (userId) => dispatch(fetchPersonalDetailsByUserId(userId))
});

export const LeftSectionContainer = connect(mapStateToProps, mapDispatchToProps)(LeftSection);
