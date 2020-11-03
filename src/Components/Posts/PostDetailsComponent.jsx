import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { PageLayout } from '../Layout/PageLayout';
import { connect } from 'react-redux';
import { Col, Divider, Input, Row } from 'antd';
import {
  getFieldsFromAttributeModels,
  getFieldsValueFromAtributes
} from '../../Utils/common-methods';
import { DynamicFormContainer } from '../../Utils/getDynamicForm';
import {
  createResource,
  fetchPersonalDetailsByUserId,
  fetchPostTemplate,
  fetchResourcesById
} from '../../Actions/ResourceAction';
import { Loader } from '../Loader/Loader';
import { get, omit } from 'lodash';
import { PostDetailsWithMetaDataComponent } from './PostDetailsWithMetaDataComponent';
import { createPost, editPost } from '../../Actions/PostAction';

export const PostDetailsComponent = (props) => {
  const [showLoader, setshowLoader] = useState(false);
  const [postDetails, setpostDetails] = useState({});
  const [postUserDetails, setpostUserDetails] = useState({});

  const postId = props.match.params.postId;
  const userId = props.match.params.id;

  const getPostDetails = () => {
    setshowLoader(true);
    props.fetchResourcesById(postId).then((response) => {
      const postData = getFieldsValueFromAtributes(get(response, 'data.attributes', []));
      setpostDetails(response.data);
      props.fetchPersonalDetailsByUserId(postData.userId, true).then((res) => {
        const userData = getFieldsValueFromAtributes(get(res, 'data[0].attributes', []));
        setpostUserDetails(userData);
        setshowLoader(false);
      });
    });
  };

  const onChangePost = (updatedPostDetails) => {
    postDetails.attributes = postDetails.attributes.filter(
      (attr) =>
        !['template', 'userId', 'currentIndex', 'Instances Allowed'].includes(
          attr.attribute.keyName
        )
    );
    postDetails.attributes.unshift({
      attribute: {
        keyName: 'actionsAllowed',
        keyValue: 'update'
      }
    });
    postDetails.resourceId = postDetails.resourceId;
    //add logic to update likes dislike and comment section
    const userPostAttribute = postDetails.attributes.find(
      (p) => p.attribute.keyName === 'User Post'
    );
    const likes = userPostAttribute.metaData.find((m) => m.keyName === 'likes') || {};
    likes.keyValue = updatedPostDetails.likes;
    const dislikes = userPostAttribute.metaData.find((m) => m.keyName === 'dislikes') || {};
    dislikes.keyValue = updatedPostDetails.dislikes;
    props
      .editPost(omit(postDetails, ['mode']), props.match.params.id)
      .then(() => setshowLoader(false));
  };

  useEffect(() => {
    getPostDetails();
  }, []);

  return (
    <PageLayout
      {...props}
      content={
        showLoader ? (
          <Loader></Loader>
        ) : (
          <Row style={{ width: '100%' }}>
            <Col span={24}>
              <PostDetailsWithMetaDataComponent
                postDetails={postDetails || {}}
                onChangePost={onChangePost}
                user={postUserDetails}
                currentUserId={userId}></PostDetailsWithMetaDataComponent>
            </Col>
          </Row>
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    postTemplate: state.resources.postTemplate || {},
    postTemplateLoading: state.resources.postTemplateLoading
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchResourcesById: (id) => dispatch(fetchResourcesById(id)),
  createPost: (resource) => dispatch(createPost(resource)),
  editPost: (resource) => dispatch(editPost(resource)),
  createResource: (resource) => dispatch(createResource(resource)),
  fetchPersonalDetailsByUserId: (userId, notTodispatch) =>
    dispatch(fetchPersonalDetailsByUserId(userId, notTodispatch))
});

export const PostDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailsComponent);
