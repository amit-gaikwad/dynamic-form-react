import React, { useEffect } from 'react';
import { Row, Col, Divider, Button } from 'antd';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { getRenderableComponentByType } from '../../Utils/getRenderableComponent';
import { connect } from 'react-redux';
import { fetchResources, createResource } from '../../Actions/ResourceAction';
import { DynamicFormContainer } from '../../Utils/getDynamicForm';
import { getFieldsFromAttributeModels } from '../../Utils/common-methods';
import { Loader } from '../Loader/Loader';
import { omit } from 'lodash';

const UserDetails = (props) => {
  useEffect(() => {
    props.fetchResourcesByNamesapce();
  }, []);

  const onHandleSubmit = (event, templateResource) => {
    const newResource = omit(templateResource, ['resourceId']);
    newResource.attributes = newResource.attributes.filter(
      (attr) => attr.attribute.keyName !== 'template' && attr.attribute.keyName !== 'currentIndex'
    );
    for (const item of newResource.attributes) {
      if (item.attribute.keyName === 'userId') {
        item.attribute.keyValue = props.match.params.id;
      } else {
        item.attribute.keyValue = event[item.attribute.keyName];
      }
    }
    console.log('event', event, newResource, props);

    props.createResource(newResource);
  };

  const renderComponents = () => {
    return (
      <div>
        {(props.templateResources || []).map((template) => {
          return (
            <Row style={{ border: '1px solid', margin: '10px' }}>
              <Col>{template.resourceName}</Col>
              <DynamicFormContainer
                fields={getFieldsFromAttributeModels(template.attributes)}
                template={template}
                onHandleSubmit={onHandleSubmit}></DynamicFormContainer>
            </Row>
          );
        })}
      </div>
    );
  };

  return <div>{props.loading || props.createReourceLoading ? <Loader /> : renderComponents()}</div>;
};

const mapStateToProps = (state) => {
  return {
    templateResources: state.resources.templateResources || [],
    loading: state.resources.loading,
    createReourceLoading: state.resources.createReourceLoading
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchResourcesByNamesapce: () => dispatch(fetchResources()),
  createResource: (resource) => dispatch(createResource(resource))
});

export const UserDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(UserDetails);
