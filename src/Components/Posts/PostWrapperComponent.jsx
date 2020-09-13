import React, { useState, createElement } from 'react';
import moment from 'moment';
import { Comment, Tooltip, Avatar, Card, Row, List, Popover } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

export const PostWrapperComponent = (props) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [showOptions, setshowOptions] = useState(false);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };
  const actions = [
    <Tooltip key='comment-basic-like' title='Like'>
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className='comment-action'>{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key='comment-basic-dislike' title='Dislike'>
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className='comment-action'>{dislikes}</span>
      </span>
    </Tooltip>,
    <span key='comment-basic-reply-to'> Add Comment</span>
  ];

  const handleOptionsShow = () => {
    setshowOptions(!showOptions);
  };
  const popUpOptions = () => (
    <List>
      <List.Item>Up Vote</List.Item>
      <List.Item>Take A Notes</List.Item>
      <List.Item>Register</List.Item>
      <List.Item>Save</List.Item>
      <List.Item>Ask Question</List.Item>
      <List.Item>Share</List.Item>
    </List>
  );

  return (
    <Card
      style={
        showOptions
          ? {
              borderRadius: '2px',
              // boxShadow: '2px 2px 2px 2px rgba(208, 216, 243, 0.6)'
              boxShadow: 'inset 0 0 0 5px rgba(0, 0, 0, .125)',
              //boxShadow: '0 0 0 5px rgba(0, 0, 0, .25),inset 0 0 0 5px rgba(0, 0, 0, .125)',
              background: 'rgba(0, 0, 0, .075)'
            }
          : {}
      }
      onClick={handleOptionsShow}>
      <Popover
        content={popUpOptions}
        trigger='click'
        visible={showOptions}
        placement='right'
        style={{ left: '150px' }}
        onVisibleChange={handleOptionsShow}>
        <Row style={{ cursor: 'pointer' }}>
          <Comment
            actions={actions}
            author={<a>{`${props.user['First Name']} ${props.user['Last Name']}`}</a>}
            avatar={<Avatar src={props.user['Photo']} alt='Amit Gaikwad' />}
            content={
              <>
                <p>{props.post}</p>
                {/* <img
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              height={'100px'}
              width={'100px'}></img> */}
              </>
            }
            datetime={
              <Tooltip title={moment('2020-08-23').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment('2020-08-23').fromNow()}</span>
              </Tooltip>
            }
          />
        </Row>
      </Popover>
      ,
    </Card>
  );
};
