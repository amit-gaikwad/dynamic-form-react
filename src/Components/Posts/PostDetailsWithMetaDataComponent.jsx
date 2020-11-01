import React, { useState, createElement } from 'react';
import moment from 'moment';
import { Comment, Tooltip, Avatar, Card, Row, List, Popover, Space, Col } from 'antd';
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
import { Link } from 'react-router-dom';
import ShortInfoComponent from '../PersonalDetails/ShortInfo';
import { useEffect } from 'react';
import {
  getFieldsFromAttributeModels,
  getFieldsValueFromAtributes
} from '../../Utils/common-methods';
import { get, isEmpty } from 'lodash';

export const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const PostDetailsWithMetaDataComponent = (props) => {
  const [showOptions, setshowOptions] = useState(false);
  const [postDetails, setpostDetails] = useState({});

  useEffect(() => {
    let fields = getFieldsFromAttributeModels(get(props, 'postDetails.attributes', []));
    const post = fields.find((f) => f.label === 'User Post') || {};
    const postData = getFieldsValueFromAtributes(get(props, 'postDetails.attributes', []));
    setpostDetails({ ...post, ...postData });
  }, [props.postDetails]);
  const likes = get(postDetails, 'likes');
  const dislikes = get(postDetails, 'dislikes');
  const likePersons = isEmpty(likes) ? [] : get(postDetails, 'likes').split(',');
  const dislikePersons = isEmpty(dislikes) ? [] : get(postDetails, 'dislikes').split(',');

  const like = () => {
    if (!likePersons.includes(props.currentUserId)) {
      const index = dislikePersons.indexOf(props.currentUserId);
      if (index >= 0) {
        dislikePersons.splice(index, 1);
      }
      likePersons.push(props.currentUserId);
    }
    const newPostDetails = {
      ...postDetails,
      likes: likePersons.join(','),
      dislikes: dislikePersons.join(',')
    };
    setpostDetails(newPostDetails);
    props.onChangePost(newPostDetails);
  };

  const dislike = () => {
    if (!dislikePersons.includes(props.currentUserId)) {
      const index = likePersons.indexOf(props.currentUserId);
      if (index >= 0) {
        likePersons.splice(index, 1);
      }
      dislikePersons.push(props.currentUserId);
    }
    const newPostDetails = {
      ...postDetails,
      likes: likePersons.join(','),
      dislikes: dislikePersons.join(',')
    };
    setpostDetails(newPostDetails);
    props.onChangePost(newPostDetails);
  };

  const handleOptionsShow = (e) => {
    if (e.nativeEvent && e.nativeEvent.which === 1) {
    } else if (e.nativeEvent && e.nativeEvent.which === 3) {
      setshowOptions(!showOptions);
    } else {
      setshowOptions(false);
    }
    e.preventDefault && e.preventDefault();
  };

  const popUpOptions = () => (
    <List style={{ width: '150px' }}>
      <List.Item onClick={like} style={{ curser: 'pointer' }}>
        <IconText icon={LikeFilled} text='Up Vote' key='list-vertical-star-o' />
      </List.Item>
      <List.Item onClick={dislike}>
        <IconText icon={DislikeOutlined} text='Down Vote' key='list-vertical-star-o' />
      </List.Item>
      <List.Item>
        <Link to={`/message/fromUserId/${props.user.userId}/toUserId/${props.user.userId}`}>
          <IconText icon={CreditCardOutlined} text='Take A Notes' key='list-vertical-star-o' />
        </Link>
      </List.Item>
      <List.Item>
        <IconText icon={BookOutlined} text='Register' key='list-vertical-star-o' />
      </List.Item>
      <List.Item>
        <IconText icon={SaveOutlined} text='Save' key='list-vertical-star-o' />
      </List.Item>
      <List.Item>
        <Link to={`/message/fromUserId/${props.user.userId}/toUserId/${props.user.userId}`}>
          <IconText icon={QuestionCircleOutlined} text='Ask Question' key='list-vertical-star-o' />
        </Link>
      </List.Item>
      <List.Item>
        <IconText icon={ShareAltOutlined} text='Share' key='list-vertical-star-o' />
      </List.Item>
    </List>
  );

  return (
    <List itemLayout='vertical' size='large'>
      <List.Item
        //   onClick={handleOptionsShow}
        onContextMenu={handleOptionsShow}
        key={props.id}
        actions={[
          // <IconText icon={StarOutlined} text='156' key='list-vertical-star-o' />,
          <IconText icon={LikeOutlined} text={likePersons.length} key='list-vertical-like-o' />,
          <IconText
            icon={DislikeOutlined}
            text={dislikePersons.length}
            key='list-vertical-like-o'
          />,
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
          avatar={<Avatar src={props.user['Photo']} />}
          title={
            <Tooltip
              placement='left'
              color='white'
              title={<ShortInfoComponent user={props.user}></ShortInfoComponent>}>
              <Row style={{ width: '100%' }}>
                <Col span={24}>
                  <a>{`${props.user['First Name']} ${props.user['Last Name']}`}</a>
                </Col>
                <Col span={24} style={{ fontSize: 12, color: 'gray', fontWeight: 'normal' }}>
                  {props.user.description ||
                    'Ant Design, a design language for background applications'}
                </Col>
              </Row>
            </Tooltip>
          }
          description={moment(props.date || new Date()).fromNow()}
        />
        {postDetails['User Post']}
      </List.Item>
    </List>
  );
};
