import React, { useState, createElement } from 'react';
import moment from 'moment';
import { Comment, Tooltip, Avatar, Card, Row, List, Popover, Space } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
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

export const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

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
    <List style={{ width: '150px' }}>
      <List.Item>
        <IconText icon={LikeFilled} text='Up Vote' key='list-vertical-star-o' />
      </List.Item>
      <List.Item>
        <IconText icon={CreditCardOutlined} text='Take A Notes' key='list-vertical-star-o' />
      </List.Item>
      <List.Item>
        <IconText icon={BookOutlined} text='Register' key='list-vertical-star-o' />
      </List.Item>
      <List.Item>
        <IconText icon={SaveOutlined} text='Save' key='list-vertical-star-o' />
      </List.Item>
      <List.Item>
        <IconText icon={QuestionCircleOutlined} text='Ask Question' key='list-vertical-star-o' />
      </List.Item>
      <List.Item>
        <IconText icon={ShareAltOutlined} text='Share' key='list-vertical-star-o' />
      </List.Item>
    </List>
  );

  return (
    <List.Item
      onClick={handleOptionsShow}
      key={props.id}
      actions={[
        <IconText icon={StarOutlined} text='156' key='list-vertical-star-o' />,
        <IconText icon={LikeOutlined} text='156' key='list-vertical-like-o' />,
        <IconText icon={MessageOutlined} text='2' key='list-vertical-message' />
      ]}
      style={
        showOptions
          ? {
              borderRadius: '2px',
              // boxShadow: '2px 2px 2px 2px rgba(208, 216, 243, 0.6)'
              boxShadow: 'inset 0 0 0 5px rgba(0, 0, 0, .125)',
              //boxShadow: '0 0 0 5px rgba(0, 0, 0, .25),inset 0 0 0 5px rgba(0, 0, 0, .125)',
              background: 'rgba(0, 0, 0, .075)'
            }
          : {
              cursor: 'pointer',
              border: '1px solid rgba(0, 0, 0, .125)'
            }
      }
      extra={
        <Popover
          content={popUpOptions}
          trigger='click'
          visible={showOptions}
          placement='leftTop'
          onVisibleChange={handleOptionsShow}>
          <DownCircleOutlined style={{ fontSize: '26px' }} />
        </Popover>
      }>
      <List.Item.Meta
        avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
        title={<a>{`${props.user['First Name']} ${props.user['Last Name']}`}</a>}
        description={
          'Ant Design, a design language for background applications, is refined by Ant UED Team.'
        }
      />
      {props.post}
    </List.Item>
  );
};
