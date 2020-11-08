import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { PageLayout } from '../Layout/PageLayout';
import { connect } from 'react-redux';
import { Col, Divider, Input, Row } from 'antd';
import { getFieldsFromAttributeModels } from '../../Utils/common-methods';
import { DynamicFormContainer } from '../../Utils/getDynamicForm';
import {
  createResource,
  fetchPostTemplate,
  fetchResourcesById
} from '../../Actions/ResourceAction';
import { Loader } from '../Loader/Loader';
import { get, omit } from 'lodash';
import { PostWrapperComponent } from './PostWrapperComponent';
import { createPost, editPost } from '../../Actions/PostAction';

export const Createeditpostcomponent = (props) => {
  const [showLoader, setshowLoader] = useState(false);
  const [postDetails, setpostDetails] = useState({});
  const postId = props.match.params.postId;
  const editPostId = props.match.params.editPostId;
  const userId = props.match.params.id;

  useEffect(() => {
    if (isEmpty(postId || editPostId)) {
      props.fetchPostTemplate();
    } else {
      setshowLoader(true);
      props.fetchResourcesById(postId || editPostId).then((response) => {
        setpostDetails(response.data);
        setshowLoader(false);
      });
    }
  }, []);

  const onHandleSubmit = (event, templateResource, currentIndex, form) => {
    const values = form.getFieldsValue();
    const newResource = omit(templateResource, ['resourceId']);
    const istemplateResource = newResource.attributes.find(
      (attr) => attr.attribute.keyName == 'template'
    );
    newResource.attributes = newResource.attributes.filter(
      (attr) => attr.attribute.keyName !== 'template'
    );

    for (const item of newResource.attributes) {
      if (item.attribute.keyName === 'userId' && istemplateResource) {
        item.attribute.keyValue = userId;
      } else {
        item.attribute.keyValue = values[item.attribute.keyName];
      }
    }

    if (!isEmpty(postDetails)) {
      newResource.attributes = newResource.attributes.filter(
        (attr) =>
          !['template', 'userId', 'currentIndex', 'Instances Allowed'].includes(
            attr.attribute.keyName
          )
      );
      newResource.attributes.unshift({
        attribute: {
          keyName: 'actionsAllowed',
          keyValue: 'update'
        }
      });
      newResource.resourceId = postDetails.resourceId;
      // props
      //   .updateResourceByUserId(omit(newResource, ['mode']), props.match.params.id)
      //   .then(() => setshowLoader(false));
      props
        .editPost(omit(newResource, ['mode']), props.match.params.id)
        .then(() => setshowLoader(false));
    } else {
      setshowLoader(true);

      //props.createPost(omit(newResource, ['mode']), userId).then(() => setshowLoader(false));
      props.createResource(omit(newResource, ['mode']), userId).then(() => setshowLoader(false));
    }
  };

  let fields = getFieldsFromAttributeModels(get(props, 'postTemplate.attributes', []));
  let template = get(props, 'postTemplate', {});

  if (!isEmpty(postDetails)) {
    template = postDetails;
    fields = getFieldsFromAttributeModels(get(postDetails, 'attributes', []));
  }

  return (
    <PageLayout
      {...props}
      content={
        props.postTemplateLoading || showLoader ? (
          <Loader></Loader>
        ) : (
          <Row style={{ width: '100%' }}>
            <Col span={24} style={{ fontSize: '20px', fontWeight: 'bold' }}>
              {isEmpty(editPostId) ? 'Start a Post' : 'Edit your Post'}
            </Col>
            <Col span={24}>
              <DynamicFormContainer
                fields={fields}
                template={template}
                fromPostPage={true}
                saveButtonText={isEmpty(editPostId) ? 'Post' : 'Save'}
                onHandleSubmit={onHandleSubmit}></DynamicFormContainer>
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
  fetchPostTemplate: () => dispatch(fetchPostTemplate()),
  fetchResourcesById: (id) => dispatch(fetchResourcesById(id)),
  createPost: (resource) => dispatch(createPost(resource)),
  editPost: (resource) => dispatch(editPost(resource)),
  createResource: (resource) => dispatch(createResource(resource))
});

export const CreateeditpostcomponentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Createeditpostcomponent);
