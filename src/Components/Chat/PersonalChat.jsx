import React from 'react';
import { PageLayout } from '../Layout/PageLayout';
import { connect } from 'react-redux';
import { Button, Col, Divider, Input, Row, List, Avatar, Tooltip } from 'antd';
import {
  getFieldsFromAttributeModels,
  getFieldsValueFromAtributes
} from '../../Utils/common-methods';
import { DynamicFormContainer } from '../../Utils/getDynamicForm';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import { IconText } from '../Posts/PostWrapperComponent';
import { StarOutlined } from '@ant-design/icons';
import './ChatList.css';
import { fetchPersonalDetailsByUserId } from '../../Actions/ResourceAction';
import { get } from 'lodash';
import ShortInfoComponent from '../PersonalDetails/ShortInfo';
import { getOneToOneChatHistoryBetweenTwoUsers } from '../../Actions/ChatAction';
import { Chatboxcomponent } from './ChatBoxComponent';
var stompClient = null;

let broadcastMessageBkup = [];
const PersonalChat = (props) => {
  const [broadcastMessage, setbroadcastMessage] = useState([]);
  const [toUserDetails, settoUserDetails] = useState({});
  const [fromUserDetails, setfromUserDetails] = useState({});
  const [, setrefresh] = useState();
  const [messageText, setmessageText] = useState('');
  const username = props.match.params.id;
  const toUsername = props.match.params.toUserId;
  let sessionId = username + toUsername;
  if (toUsername > username) {
    sessionId = toUsername + username;
  }

  const onMessageReceived = (payload) => {
    var message = JSON.parse(payload.body);
    console.log('onMessageReceived  >>', message, broadcastMessageBkup);
    const arr = [...broadcastMessageBkup];
    if (message.type === 'CHAT') {
      arr.push({
        content: message.content,
        sender: message.from,
        time: message.time
      });
      setbroadcastMessage(arr);
    }
  };

  useEffect(() => {
    broadcastMessageBkup = [...broadcastMessage];
  }, [broadcastMessage]);

  const sendMessage = () => {
    var messageContent = messageText.trim();
    if (messageContent && stompClient) {
      var message = {
        sender: username,
        sendee: toUsername,
        content: messageText,
        uniqueId: sessionId,
        type: 'CHAT',
        userId: username
      };
      stompClient.send('/app/secured/room', {}, JSON.stringify(message));
      setmessageText('');
    }
  };

  const onConnected = () => {
    const fromusername = username;
    const tousername = toUsername;
    let user = {};
    props.fetchPersonalDetailsByUserId(fromusername, true).then((res) => {
      const response = get(res, 'data[0]');
      if (response) {
        user = getFieldsValueFromAtributes(get(res, 'data[0].attributes', []));
      }
      setfromUserDetails({ ...user, resourceId: response.resourceId });
      stompClient.subscribe(
        '/secured/user/queue/' + tousername + '/' + sessionId,
        onMessageReceived
      );
      var message = {
        sender: fromusername,
        sendee: tousername,
        content: 'hi',
        uniqueId: response.resourceId,
        type: 'JOIN',
        userId: username
      };
      stompClient.send('/app/secured/room', {}, JSON.stringify(message));
    });
  };

  useEffect(() => {
    const Stomp = require('stompjs');
    var SockJS = require('sockjs-client');
    var socket = new SockJS('http://localhost:8110/secured/room');
    stompClient = Stomp.over(socket);

    props
      .getOneToOneChatHistoryBetweenTwoUsers(username, sessionId)
      .then((res) => {
        setbroadcastMessage(res.data);
        stompClient.connect({}, onConnected);
      })
      .catch(() => {
        stompClient.connect({}, onConnected);
      });

    props.fetchPersonalDetailsByUserId(toUsername, true).then((res) => {
      let user = {};
      if (get(res, 'data[0]')) {
        user = getFieldsValueFromAtributes(get(res, 'data[0].attributes', []));
      }
      settoUserDetails(user);
    });
  }, []);

  const onTextChange = (event) => {
    setmessageText(event.target.value);
  };

  return (
    <PageLayout
      {...props}
      content={
        <Row style={{ width: '100%' }}>
          <Row style={{ width: '100%', borderBottom: '2px solid white' }} className='chat_parent'>
            <div class='chat_header'>
              <Avatar
                size='large'
                src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              />
              <div class='chat_about'>
                <div class='chat_with'>
                  <Tooltip
                    placement='left'
                    color='white'
                    title={<ShortInfoComponent user={toUserDetails}></ShortInfoComponent>}>
                    <a>{`${toUserDetails['First Name']} ${toUserDetails['Last Name']}`}</a>
                  </Tooltip>
                </div>
                <div class='chat_num_messages'>
                  <IconText icon={StarOutlined} text='156' key='list-vertical-star-o' />
                </div>
              </div>
            </div>
          </Row>

          <Chatboxcomponent messages={broadcastMessage} username={username}></Chatboxcomponent>
          <Row style={{ width: '100%', marginTop: 10 }} className='chat_bottom_section'>
            <Col span={21}>
              <Input.TextArea
                autoSize={{ minRows: 3, maxRows: 3 }}
                className='chat_textbox'
                onChange={onTextChange}
                value={messageText}
                placeholder='Type your message'
              />
            </Col>
            <Col span={3} offset={0}>
              <Button onClick={sendMessage}>Send</Button>
            </Col>
          </Row>
        </Row>
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  fetchPersonalDetailsByUserId: (user, notDispatch) =>
    dispatch(fetchPersonalDetailsByUserId(user, notDispatch)),
  getOneToOneChatHistoryBetweenTwoUsers: (userId, uniqueId) =>
    dispatch(getOneToOneChatHistoryBetweenTwoUsers(userId, uniqueId))
});

export const PersonalChatContainer = connect(mapStateToProps, mapDispatchToProps)(PersonalChat);
