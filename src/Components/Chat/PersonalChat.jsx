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

const PersonalChat = (props) => {
  const [broadcastMessage, setbroadcastMessage] = useState([]);
  const [messageText, setmessageText] = useState('');
  const username = props.match.params.id;
  const toUsername = props.match.params.toUserId;

  const onMessageReceived = (payload) => {
    var message = JSON.parse(payload.body);
    if (message.type === 'CHAT') {
      // roomNotification.map((notification, i) => {
      //   if (notification.sender === message.sender + ' ~ joined') {
      //     notification.status = 'online';
      //   }
      // });
      broadcastMessage.push({
        message: message.content,
        sender: message.sender,
        dateTime: message.dateTime
      });
      setbroadcastMessage(broadcastMessage);
    }
  };

  const sendMessage = () => {
    if (stompClient) {
      var chatMessage = {
        sender: username,
        content: messageText,
        type: 'CHAT'
      };
      // send public message
      stompClient.send('/app/sendMessage', {}, JSON.stringify(chatMessage));
      setmessageText('');
    }
    // if (stompClient) {
    //   var chatMessage = {
    //     sender: username,
    //     receiver: toUsername,
    //     content: messageText,
    //     type: 'CHAT'
    //   };
    //   stompClient.send('/app/sendPrivateMessage', {}, JSON.stringify(chatMessage));
    // }
  };

  const onConnected = () => {
    // Subscribing to the public topic
    stompClient.subscribe('/topic/pubic', onMessageReceived);

    // Registering user to server as a public chat user
    stompClient.send('/app/addUser', {}, JSON.stringify({ sender: username, type: 'JOIN' }));

    // // Subscribing to the private topic
    // const name = toUsername > username ? toUsername : username;
    // stompClient.subscribe('/user/' + name.toString().toLowerCase() + '/reply', onMessageReceived);

    // // Registering user to server as a private chat user
    // stompClient.send(
    //   '/app/addPrivateUser',
    //   {},
    //   JSON.stringify({ sender: toUsername, type: 'JOIN' })
    // );
  };

  useEffect(() => {
    const Stomp = require('stompjs');
    var SockJS = require('sockjs-client');
    SockJS = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(SockJS);
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
            <Input onChange={onTextChange} value={messageText} />
            <Button onClick={sendMessage}>Send</Button>
          </Row>
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
                return (
                  <List.Item
                    style={{
                      cursor: 'pointer',
                      border: '1px solid rgba(0, 0, 0, .125)',
                      marginTop: '2px'
                    }}>
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
                  </List.Item>
                );
              }}
            />
            {/* );
              })} */}
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
