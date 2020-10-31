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
import { get } from 'lodash';
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
    console.log('fields >>');

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
            {/* <Col span={24} style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                Amit Gaikwad's Post
                            </Col> */}
            <Col span={24}>
              <PostDetailsWithMetaDataComponent
                postDetails={postDetails || {}}
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
