import React, { useEffect } from 'react';
import { Row, Col, Divider, Button } from 'antd';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { getRenderableComponentByType } from '../../Utils/getRenderableComponent';
import { connect } from 'react-redux';
import {
  fetchResources,
  createResource,
  fetchResourcesByUserId,
  updateResourceByUserId
} from '../../Actions/ResourceAction';
import { DynamicFormContainer } from '../../Utils/getDynamicForm';
import { getFieldsFromAttributeModels } from '../../Utils/common-methods';
import { Loader } from '../Loader/Loader';
import { omit } from 'lodash';

const UserDetails = (props) => {
  useEffect(() => {
    props.fetchResourcesByNamesapce();
    props.fetchResourcesByUserId(props.match.params.id);
  }, []);

  const onHandleSubmit = (event, templateResource) => {
    const newResource = omit(templateResource, ['resourceId']);
    newResource.attributes = newResource.attributes.filter(
      (attr) => attr.attribute.keyName !== 'template' && attr.attribute.keyName !== 'currentIndex'
    );
    const userResource = (props.resourcesByUserId || []).find(
      (r) => r.resourceName === templateResource.resourceName
    );
    for (const item of newResource.attributes) {
      if (item.attribute.keyName === 'userId') {
        item.attribute.keyValue = props.match.params.id;
      } else {
        item.attribute.keyValue = event[item.attribute.keyName];
      }
    }
    console.log('event', event, newResource, props);
    if (userResource) {
      newResource.attributes.unshift({
        attribute: {
          keyName: 'actionsAllowed',
          keyValue: 'update'
        }
      });
      newResource.resourceId = userResource.resourceId;
      props.updateResourceByUserId(newResource);
    } else {
      props.createResource(newResource);
    }
  };

  const renderComponents = () => {
    return (
      <div>
        {(props.templateResources || []).map((template) => {
          let attributes = template.attributes;
          const userResource = (props.resourcesByUserId || []).find(
            (r) => r.resourceName === template.resourceName
          );
          if (userResource) {
            attributes = userResource.attributes;
          }
          return (
            <Row style={{ border: '1px solid', margin: '10px' }} key={template.resourceId}>
              <Col>{template.resourceName}</Col>
              <DynamicFormContainer
                fields={getFieldsFromAttributeModels(attributes)}
                template={userResource || template}
                onHandleSubmit={onHandleSubmit}></DynamicFormContainer>
            </Row>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {props.loading || props.createReourceLoading || props.resourcesByUserIdLoading ? (
        <Loader />
      ) : (
        renderComponents()
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    templateResources: state.resources.templateResources || [],
    loading: state.resources.loading,
    createReourceLoading: state.resources.createReourceLoading,
    resourcesByUserId: state.resources.resourcesByUserId || [],
    resourcesByUserIdLoading: state.resources.resourcesByUserIdLoading
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchResourcesByNamesapce: () => dispatch(fetchResources()),
  createResource: (resource) => dispatch(createResource(resource)),
  fetchResourcesByUserId: (userId) => dispatch(fetchResourcesByUserId(userId)),
  updateResourceByUserId: (resource) => dispatch(updateResourceByUserId(resource))
});

export const UserDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(UserDetails);
