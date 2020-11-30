import React, { useState, createElement } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Comment, Tooltip, Avatar, Card, Row, List, Popover, Space, Col, Modal } from 'antd';
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
import { get, isEmpty, omit } from 'lodash';
import TextArea from 'antd/lib/input/TextArea';
import { createResource, updateResourceByUserId } from '../../Actions/ResourceAction';

export const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

/**
 * 
 * @param {
 * 
 * 
 
 const [bodyOfWorkTemplate, setbodyOfWorkTemplate] = useState({});
  const [bodyOfWorkUserResource, setbodyOfWorkUserResource] = useState({});
 
 * } 
 */

const PostDetailsWithMetaData = (props) => {
  const [showOptions, setshowOptions] = useState(false);
  const [showNoteBox, setshowNoteBox] = useState(false);
  const [currentNotes, setcurrentNotes] = useState('');
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

  const onTakeANotesClick = () => {
    setshowNoteBox(true);
    setshowOptions(false);
  };

  const onTakeNotesSubmit = () => {
    console.log('submitted values', props, currentNotes);
    setcurrentNotes('');
  };

  const onSavePostClick = () => {
    const { bodyOfWorkTemplate, bodyOfWorkUserResource } = props;
    let bow = bodyOfWorkUserResource;
    if (isEmpty(bodyOfWorkUserResource)) {
      bow = bodyOfWorkTemplate;
      bow.attributes = bow.attributes.filter((attr) => {
        if (attr.attribute.keyName === 'userId') {
          attr.attribute.keyValue = props.currentUserId;
        }
        return attr.attribute.keyName !== 'template';
      });

      // const userPostAttribute = bow.attributes.find(
      //   (p) => p.attribute.keyName === 'Saved Post Links'
      // );
      const linkUrl = `/user/${props.currentUserId}/post/${props.postDetails.resourceId}`;

      //      if (isEmpty(userPostAttribute)) {
      // need to create url logic here post/:postId
      bow.attributes.unshift({
        attribute: {
          keyName: 'Saved Post Links',
          keyValue: linkUrl,
          keyValues: [linkUrl]
        },
        metaData: [
          {
            keyName: 'hidden',
            keyValue: 'true',
            keyValues: null
          },
          {
            keyName: 'mandatory',
            keyValue: 'false',
            keyValues: null
          }
        ]
      });
      //    }
      console.log('bow ', bow, props);
      props
        .createResource(omit(bow, ['mode', 'resourceId']), props.currentUserId)
        .then(() => console.log('Successfully created resoure'));
    } else {
      debugger;
      bow.attributes = bow.attributes.filter(
        (attr) =>
          !['template', 'userId', 'currentIndex', 'Instances Allowed'].includes(
            attr.attribute.keyName
          )
      );
      bow.attributes.unshift({
        attribute: {
          keyName: 'actionsAllowed',
          keyValue: 'update'
        }
      });
      bow.resourceId = bow.resourceId;
      //add logic to update likes dislike and comment section
      const userPostAttribute = bow.attributes.find(
        (p) => p.attribute.keyName === 'Saved Post Links'
      );
      const linkUrl = `/user/${props.currentUserId}/post/${props.postDetails.resourceId}`;

      if (isEmpty(userPostAttribute)) {
        // need to create url logic here post/:postId
        bow.attributes.unshift({
          attribute: {
            keyName: 'Saved Post Links',
            keyValue: linkUrl,
            keyValues: [linkUrl]
          },
          metaData: [
            {
              keyName: 'hidden',
              keyValue: 'true',
              keyValues: null
            },
            {
              keyName: 'mandatory',
              keyValue: 'false',
              keyValues: null
            }
          ]
        });
      } else {
        if (isEmpty(userPostAttribute.attribute.keyValues)) {
          userPostAttribute.attribute.keyValues = [];
        }
        userPostAttribute.attribute.keyValues.push(linkUrl);
      }
      console.log('bow', bow);
      props
        .updateResourceByUserId(omit(bow, ['mode']), props.currentUserId)
        .then(() => console.log('successfully updated'));
    }

    console.log('bow >>', bow);
    setshowOptions(false);
  };

  const popUpOptions = () => {
    return (
      <List style={{ width: '150px' }}>
        <List.Item onClick={like} style={{ curser: 'pointer' }}>
          <IconText icon={LikeFilled} text='Up Vote' key='list-vertical-star-o' />
        </List.Item>
        <List.Item onClick={dislike}>
          <IconText icon={DislikeOutlined} text='Down Vote' key='list-vertical-star-1' />
        </List.Item>
        <List.Item onClick={onTakeANotesClick}>
          <IconText icon={CreditCardOutlined} text='Take A Notes' key='list-vertical-star-2' />
        </List.Item>
        <List.Item>
          <IconText icon={BookOutlined} text='Register' key='list-vertical-star-3' />
        </List.Item>
        <List.Item onClick={onSavePostClick}>
          <IconText icon={SaveOutlined} text='Save' key='list-vertical-star-4' />
        </List.Item>
        <List.Item>
          <Link to={`/message/fromUserId/${props.user.userId}/toUserId/${props.user.userId}`}>
            <IconText
              icon={QuestionCircleOutlined}
              text='Ask Question'
              key='list-vertical-star-5'
            />
          </Link>
        </List.Item>
        <List.Item>
          <IconText icon={ShareAltOutlined} text='Share' key='list-vertical-star-6' />
        </List.Item>
      </List>
    );
  };

  return (
    <>
      {showNoteBox && (
        <Modal
          title='Take a Notes'
          visible={showNoteBox}
          onOk={onTakeNotesSubmit}
          okText='Save'
          onCancel={() => {
            setshowNoteBox(false);
          }}>
          <TextArea
            onChange={(e) => setcurrentNotes(e.currentTarget.value)}
            value={currentNotes}></TextArea>
        </Modal>
      )}
      <List itemLayout='vertical' size='large'>
        <List.Item
          onContextMenu={handleOptionsShow}
          key={props.id}
          actions={[
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  // fetchResourcesById: (id) => dispatch(fetchResourcesById(id)),createResource
  createResource: (resource, id) => dispatch(createResource(resource, id)),
  updateResourceByUserId: (resource, id) => dispatch(updateResourceByUserId(resource, id))
});

export const PostDetailsWithMetaDataComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailsWithMetaData);
