import React, { useEffect } from 'react';
import { PageLayout } from '../Layout/PageLayout';
import { connect } from 'react-redux';
import { DynamicFormContainer } from '../../Utils/getDynamicForm';
import {
  fetchPostTemplate,
  updateResourceByUserId,
  createResource,
  fetchPostsByUserId,
  fetchPersonalDetailsByUserId
} from '../../Actions/ResourceAction';
import {
  getFieldsFromAttributeModels,
  getFieldsValueFromAtributes
} from '../../Utils/common-methods';
import { omit, cloneDeep, isEmpty, first } from 'lodash';
import { Loader } from '../Loader/Loader';
import { PostWrapperComponent } from '../Posts/PostWrapperComponent';
import { Col, Row, Card, Tooltip, Divider, List } from 'antd';
import ShortInfoComponent from '../PersonalDetails/ShortInfo';

const HomeComponent = (props) => {
  const userId = props.match.params.id;
  useEffect(() => {
    props.fetchPostTemplate();
    props.fetchPostsByUserId(userId);
    props.fetchPersonalDetailsByUserId(userId);
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
    // const userResource1 = (props.resourcesByUserId || []).find(
    //   (r) => r.resourceName === templateResource.resourceName
    // );
    // const userResource = cloneDeep(userResource1);
    for (const item of newResource.attributes) {
      if (item.attribute.keyName === 'userId' && istemplateResource) {
        item.attribute.keyValue = userId;
      } else {
        item.attribute.keyValue = values[item.attribute.keyName];
      }
    }
    if (!isEmpty(props.postsByUserId)) {
      const postsByUserId = first(props.postsByUserId) || {};
      newResource.attributes.unshift({
        attribute: {
          keyName: 'actionsAllowed',
          keyValue: 'add'
        }
      });

      const metaData = [
        { keyName: 'hidden', keyValue: 'true', keyValues: null },
        { keyName: 'mandatory', keyValue: 'true', keyValues: null },
        { keyName: 'editable', keyValue: 'false', keyValues: null }
      ];
      const obj = {
        attribute: {
          keyName: 'date',
          keyValue: new Date()
        },
        metaData
      };
      newResource.attributes.unshift(obj);
      // newResource.attributes.unshift({
      //   attribute: {
      //     keyName: 'date',
      //     keyValue: new Date()
      //   }
      // });
      newResource.resourceId = postsByUserId.resourceId;
      console.log('newResource', newResource);

      props.updateResourceByUserId(newResource, userId);
    } else {
      console.log('add newResource', newResource);
      const metaData = [
        { keyName: 'hidden', keyValue: 'true', keyValues: null },
        { keyName: 'mandatory', keyValue: 'true', keyValues: null },
        { keyName: 'editable', keyValue: 'false', keyValues: null }
      ];
      const obj = {
        attribute: {
          keyName: 'date',
          keyValue: new Date()
        },
        metaData
      };
      newResource.attributes.unshift(obj);
      props.createResource(omit(newResource, ['mode']), userId);
    }
  };

  let resource = props.postTemplate;
  let newResource = resource;
  var postResources = [];
  if (!isEmpty(props.postsByUserId) && !isEmpty(props.postTemplate)) {
    const postsByUserId = first(props.postsByUserId) || {};
    resource = cloneDeep(postsByUserId);
    const currentIndexAtrr =
      resource.attributes.find((a) => a.attribute.keyName === 'currentIndex') || {};
    const currentIndex = currentIndexAtrr.attribute.keyValue;
    const copiedResource = cloneDeep(resource);
    let filteredAttrs = copiedResource.attributes.filter((x) => {
      if (x.attribute.keyName === 'Instances Allowed') {
        return false;
      }
      var m = (x.metaData || []).find((l) => l.keyName == 'index') || {};
      const isSatisfy = m.keyValue && m.keyValue.toString() == currentIndex;
      x.attribute.keyValue = '';
      if (m.keyValue && m.keyValue.toString() == currentIndex) {
        x.metaData = (x.metaData || []).filter((o) => o.keyName !== 'index');
        return true;
      }
      return false;
    });
    newResource = cloneDeep(resource);
    newResource.attributes = filteredAttrs;
    newResource.attributes.push({
      attribute: {
        keyName: 'currentIndex',
        keyValue: currentIndex
      }
    });

    const attributes = resource.attributes;
    var p = attributes.find((w) => w.attribute.keyName === 'currentIndex');
    for (let i = 1; i <= Number(p.attribute.keyValue); i++) {
      let a = attributes.filter((x) => {
        var m = (x.metaData || []).find((m) => m.keyName == 'index') || {};
        return m.keyValue && m.keyValue.toString() == i;
      });
      postResources.push(a);
    }
  }
  const fields = getFieldsFromAttributeModels(newResource.attributes || []);

  let user = {};
  if (props.personalDetailsByUserId[0]) {
    user = getFieldsValueFromAtributes(props.personalDetailsByUserId[0].attributes);
  }
  return (
    <PageLayout
      {...props}
      content={
        <div>
          {props.postsByUserIdLoading ? (
            <Loader></Loader>
          ) : (
            <>
              <Row style={{ width: '100%' }}>
                <Col span={24} style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  Start a Post
                </Col>
                <Col span={24}>
                  <DynamicFormContainer
                    fromPostPage={true}
                    fields={fields}
                    template={props.postTemplate}
                    //  currentIndex={currentResourceAttribute.keyValue || 0}
                    onHandleSubmit={onHandleSubmit}></DynamicFormContainer>
                </Col>
                <Divider></Divider>
                <Row style={{ width: '100%' }} gutter={[16, 16]}>
                  <List itemLayout='vertical' size='large'>
                    {postResources.map((item) => {
                      const postData = getFieldsValueFromAtributes(item);
                      return (
                        <Col span={24}>
                          <PostWrapperComponent
                            post={postData['User Post']}
                            date={postData['date']}
                            user={user}></PostWrapperComponent>
                        </Col>
                      );
                    })}
                  </List>
                </Row>
              </Row>
            </>
          )}
        </div>
      }></PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    postTemplate: state.resources.postTemplate || {},
    postsByUserId: state.resources.postsByUserId || [],
    postsByUserIdLoading: state.resources.postsByUserIdLoading,
    personalDetailsByUserId: state.resources.personalDetailsByUserId || []
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPostTemplate: () => dispatch(fetchPostTemplate()),
  updateResourceByUserId: (resource, userId) =>
    dispatch(updateResourceByUserId(resource, userId, 'Home')),
  createResource: (resource, userId) => dispatch(createResource(resource, userId, 'Home')),
  fetchPostsByUserId: (userId) => dispatch(fetchPostsByUserId(userId)),
  fetchPersonalDetailsByUserId: (userId) => dispatch(fetchPersonalDetailsByUserId(userId))
});

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
