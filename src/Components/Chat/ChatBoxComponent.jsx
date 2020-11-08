import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Row } from 'antd';

export const Chatboxcomponent = (props) => {
  return (
    <Row style={{ width: '100%', padding: 10 }} className='chat_parent'>
      <div
        className={`msg_history_container ${props.isSmallBax ? 'smallBox' : ''}`}
        id='search-result'>
        {props.messages.map((msg, index) => {
          return msg.sender !== props.username ? (
            <div className='msg_history_left' key={index}>
              <div className='incomming_msg_avatar'>
                <Avatar
                  size='large'
                  src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                />
              </div>
              <div className='received_msg'>
                <div className='received_msg_text'>
                  <div className='msg_actual_text'>{msg.content}</div>
                  <div>12:30pm</div>
                </div>
              </div>
            </div>
          ) : (
            <div className='msg_history_right' key={index}>
              <div className='outgoing_msg'>
                <div className='outgoing_msg_text'>
                  <div className='msg_actual_text'>{msg.content}</div>
                  <div>12:31pm</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Row>
  );
};
