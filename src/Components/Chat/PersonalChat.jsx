import React from 'react';
import { PageLayout } from '../Layout/PageLayout';
import { connect } from 'react-redux';
import { Button, Col, Divider, Input, Row, List, Avatar } from 'antd';
import { getFieldsFromAttributeModels } from '../../Utils/common-methods';
import { DynamicFormContainer } from '../../Utils/getDynamicForm';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
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
            {/* {this.state.broadcastMessage.length ?
                  [<div id="history"><div id="old" onClick={this.fetchHostory}>Older</div><hr /><div id="today">Today</div></div>] : ""} */}

            {/* {broadcastMessage.map((msg) => {
                return ( */}
            <List
              style={{ width: '100%' }}
              itemLayout='horizontal'
              id='search-result'
              dataSource={broadcastMessage}
              // style={{
              //   height: (height * 80) / 100 - 125,
              //   overflowY: 'auto',
              //   paddingRight: '-10px'
              // }}
              renderItem={(msg) => {
                console.log('msg in table', msg);
                return (
                  <List.Item
                    style={{
                      cursor: 'pointer',
                      border: '1px solid rgba(0, 0, 0, .125)',
                      marginTop: '2px'
                    }}
                    extra={msg.sender === username && <span>{msg.message}</span>}>
                    {msg.sender !== username && (
                      <List.Item.Meta
                        avatar={
                          <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                        }
                        title={
                          <a href='https://ant.design'>
                            {msg.sender}
                            {`. ${moment(msg.dateTime).format('hh:mm a')}`}
                          </a>
                        }
                        description={msg.message}
                      />
                    )}
                  </List.Item>
                );
              }}
            />
            {/* );
              })} */}
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
