import React, { useState, createElement } from 'react';
import moment from 'moment';
import { Comment, Tooltip, Avatar, Card } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

export const PostWrapperComponent = (props) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

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

  return (
    <Card
      style={{
        borderRadius: '2px',
        boxShadow: '2px 2px 2px 2px rgba(208, 216, 243, 0.6)'
      }}>
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
    </Card>
  );
};
