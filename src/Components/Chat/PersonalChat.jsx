import React from 'react';
import { PageLayout } from '../Layout/PageLayout';
import { connect } from 'react-redux';
import { Button, Col, Divider, Input, Row, List, Avatar } from 'antd';
import { getFieldsFromAttributeModels } from '../../Utils/common-methods';
import { DynamicFormContainer } from '../../Utils/getDynamicForm';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import { IconText } from '../Posts/PostWrapperComponent';
import {
  MessageOutlined,
  StarOutlined,
  DownCircleOutlined,
  CreditCardOutlined,
  BookOutlined,
  SaveOutlined,
  QuestionCircleOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import './ChatList.css';
var stompClient = null;
const sessionId = '12';

const PersonalChat = (props) => {
  const [broadcastMessage, setbroadcastMessage] = useState([]);
  const [messageText, setmessageText] = useState('');
  const username = props.match.params.id;
  const toUsername = props.match.params.toUserId;

  const onMessageReceived = (payload) => {
    var message = JSON.parse(payload.body);
    const arr = [...broadcastMessage];
    if (message.type === 'CHAT') {
      broadcastMessage.push({
        message: message.text,
        sender: message.from,
        dateTime: message.time
      });
      setbroadcastMessage([...broadcastMessage]);
    }
  };

  const sendMessage = () => {
    var messageContent = messageText.trim();
    if (messageContent && stompClient) {
      var message = {
        from: username,
        to: toUsername,
        text: messageText,
        uniqueID: sessionId,
        type: 'CHAT'
      };
      stompClient.send('/app/secured/room', {}, JSON.stringify(message));
      setmessageText('');
    }
  };

  const onConnected = () => {
    const fromusername = username;
    const tousername = toUsername;

    //	 var user = message.
    // Subscribe to the Public Topic
    stompClient.subscribe('/secured/user/queue/' + tousername + '/' + sessionId, onMessageReceived);

    var message = {
      from: fromusername,
      to: tousername,
      text: 'hi', // messageInput.value || '',
      uniqueID: sessionId,
      type: 'JOIN'
    };

    // Tell your username to the server
    stompClient.send('/app/secured/room', {}, JSON.stringify(message));

    //  connectingElement.classList.add('hidden');
  };

  useEffect(() => {
    const Stomp = require('stompjs');
    var SockJS = require('sockjs-client');
    var socket = new SockJS('http://localhost:8080/secured/room');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected);

    const username = props.match.params.id;
    const toUsername = props.match.params.toUserId;
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
                <div class='chat_with'>Amit Gaikwad</div>
                <div class='chat_num_messages'>
                  <IconText icon={StarOutlined} text='156' key='list-vertical-star-o' />
                </div>
              </div>
            </div>
          </Row>

          <Row style={{ width: '100%', padding: 10 }} className='chat_parent'>
            <div className='msg_history_container' id='search-result'>
              {broadcastMessage.map((msg, index) => {
                return msg.sender !== username ? (
                  <div className='msg_history_left' key={index}>
                    <div className='incomming_msg_avatar'>
                      <Avatar
                        size='large'
                        src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                      />
                    </div>
                    <div className='received_msg'>
                      <div className='received_msg_text'>
                        <div className='msg_actual_text'>{msg.message}</div>
                        <div>12:30pm</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='msg_history_right' key={index}>
                    <div className='outgoing_msg'>
                      <div className='outgoing_msg_text'>
                        <div className='msg_actual_text'>{msg.message}</div>
                        <div>12:31pm</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Row>
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

const mapDispatchToProps = (dispatch) => ({});

export const PersonalChatContainer = connect(mapStateToProps, mapDispatchToProps)(PersonalChat);
