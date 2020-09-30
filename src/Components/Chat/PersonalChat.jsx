import React from 'react';
import { PageLayout } from '../Layout/PageLayout';
import { connect } from 'react-redux';
import { Button, Col, Divider, Input, Row, List, Avatar } from 'antd';
import { getFieldsFromAttributeModels } from '../../Utils/common-methods';
import { DynamicFormContainer } from '../../Utils/getDynamicForm';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
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
    console.log('message', message);
    if (message.type === 'CHAT') {
      broadcastMessage.push({
        message: message.text,
        sender: message.from,
        dateTime: message.time
      });
      setbroadcastMessage(broadcastMessage);
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
  }, []);

  const onTextChange = (event) => {
    setmessageText(event.target.value);
  };

  return (
    <PageLayout
      {...props}
      content={
        <Row style={{ width: '100%' }}>
          <Row style={{ width: '100%' }}>Private Messages</Row>

          <Row style={{ width: '100%' }}>
            <div className='msg_history_container' id='search-result'>
              {broadcastMessage.map((msg) => {
                return msg.sender !== username ? (
                  <div className='msg_history_left'>
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
                  <div className='msg_history_right'>
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

            {broadcastMessage.map((msg) => {
              return (
                <></>
                // <div className='msg_history_container'>
                //   <div className='msg_history'>
                //     <div className='incomming_msg_avatar'>(())</div>
                //     <div className='received_msg'>
                //       <div className='received_msg_text'>
                //         <p>This is text from sender</p>
                //         <div>12:30pm</div>
                //       </div>
                //     </div>
                //   </div>
                //   <div className='msg_history'>
                //     <div className='outgoing_msg'>
                //       <div className='outgoing_msg_text'>
                //         <p>This is text from me</p>
                //         <div>12:31pm</div>
                //       </div>
                //     </div>
                //   </div>
                // </div>

                // <List.Item
                //   style={{
                //     cursor: 'pointer',
                //     border: '1px solid rgba(0, 0, 0, .125)',
                //     marginTop: '2px'
                //   }}
                //   extra={msg.sender === username && <span>{msg.message}</span>}>
                //   {msg.sender !== username && (
                //     <List.Item.Meta
                //       avatar={
                //         <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                //       }
                //       title={
                //         <a href='https://ant.design'>
                //           {msg.sender}
                //           {`. ${moment(msg.dateTime).format('hh:mm a')}`}
                //         </a>
                //       }
                //       description={msg.message}
                //     />
                //   )}
                // </List.Item>
              );
            })}
          </Row>
          <Row style={{ width: '100%' }}>
            <Input.TextArea onChange={onTextChange} value={messageText} />
            <Button onClick={sendMessage}>Send</Button>
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
