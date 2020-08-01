import React, { useEffect, useState } from 'react';
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
import { CollapsedDetails } from './CollapsedDetails';
import Modal from 'antd/lib/modal/Modal';

const UserDetails = (props) => {
  const [currentResourceAttribute, setcurrentResourceAttribute] = useState({});
  const [visibleModal, setvisibleModal] = useState(false);
  useEffect(() => {
    props.fetchResourcesByNamesapce();
    props.fetchResourcesByUserId(props.match.params.id);
  }, []);

  const onHandleSubmit = (event, templateResource, currentIndex) => {
    debugger;
    const newResource = omit(templateResource, ['resourceId']);
    const istemplateResource = newResource.attributes.find(
      (attr) => attr.attribute.keyName == 'template'
    );
    newResource.attributes = newResource.attributes.filter(
      (attr) => attr.attribute.keyName !== 'template'
    );
    const userResource = (props.resourcesByUserId || []).find(
      (r) => r.resourceName === templateResource.resourceName
    );

    if (userResource && !istemplateResource) {
      newResource.attributes.unshift({
        attribute: {
          keyName: 'actionsAllowed',
          keyValue: 'update'
        }
      });
      newResource.attributes = newResource.attributes.filter(
        (attr) => !['template', 'userId', 'currentIndex'].includes(attr.attribute.keyName)
      );
      newResource.resourceId = userResource.resourceId;
      props.updateResourceByUserId(newResource);
    } else {
      for (const item of newResource.attributes) {
        if (item.attribute.keyName === 'userId') {
          item.attribute.keyValue = props.match.params.id;
        } else {
          item.attribute.keyValue = event[item.attribute.keyName];
        }
      }
      props.createResource(newResource);
    }
  };
  const onEditClick = (resource) => {
    setvisibleModal(true);
    setcurrentResourceAttribute(resource);
  };

  const addNewResourceClick = (resource) => {
    const templateResource = (props.templateResources || []).find(
      (r) => r.resourceName === resource.resourceName
    );
    const numberOfPresentResources = props.resourcesByUserId.filter(
      (r) => r.resourceName === resource.resourceName
    );
    templateResource.attributes.forEach((element) => {
      if (element.attribute.keyName === 'currentIndex') {
        element.attribute.keyValue = numberOfPresentResources.length;
      }
    });
    console.log('templateResource', templateResource);
    setvisibleModal(true);
    setcurrentResourceAttribute({ ...templateResource });
  };

  const renderComponents = () => {
    return (
      <div>
        {(props.templateResources || []).map((template) => {
          let attributes = template.attributes;
          const userResources = (props.resourcesByUserId || []).filter(
            (r) => r.resourceName === template.resourceName
          );
          const userResource = (props.resourcesByUserId || []).find(
            (r) => r.resourceName === template.resourceName
          );
          if (userResource) {
            attributes = userResource.attributes;
          }
          const fields = getFieldsFromAttributeModels(attributes);
          const isItTemplate = fields.find((f) => f.label === 'template');
          const isItHavingMultiResource = fields.find((f) => f.label === 'Instances Allowed');
          const currentResource = userResource || template;
          return (
            <Row style={{ margin: '10px' }} key={template.resourceId}>
              <Row style={{ width: '100%' }}>
                <Row style={{ width: '100%' }}>
                  <Col span={22} style={{ fontWeight: 1000 }}>
                    {currentResource.resourceName}
                  </Col>
                  <Col span={2}>
                    <Button
                      onClick={() => {
                        if (!isItTemplate && isItHavingMultiResource) {
                          addNewResourceClick(currentResource);
                        } else {
                          onEditClick(currentResource);
                        }
                      }}>
                      {/* {isItTemplate ? '+' : 'Edit'} */}
                      {!isItTemplate ? (
                        isItHavingMultiResource && (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            data-supported-dps='24x24'
                            fill='currentColor'
                            width='24'
                            height='24'
                            focusable='false'>
                            <path d='M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8v2z'></path>
                          </svg>
                        )
                      ) : (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          data-supported-dps='24x24'
                          fill='currentColor'
                          width='24'
                          height='24'
                          focusable='false'>
                          <path d='M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8v2z'></path>
                        </svg>
                      )}
                    </Button>
                  </Col>
                </Row>
                {userResources.map((ur) => (
                  <Row style={{ width: '100%', marginTop: '15px' }} className='multiResources'>
                    <Col span={6}>
                      {getFieldsFromAttributeModels(ur.attributes).map((field) => {
                        if (!['template', 'userId', 'currentIndex'].includes(field.label)) {
                          return (
                            <Col key={field.label} span={24}>
                              {field.label} : {field.value}
                            </Col>
                          );
                        }
                      })}
                    </Col>
                    <Col span={2} className='editButton'>
                      <Button
                        onClick={() => {
                          onEditClick(ur);
                        }}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          data-supported-dps='24x24'
                          fill='currentColor'
                          width='24'
                          height='24'
                          focusable='false'>
                          <path d='M21.71 5L19 2.29a1 1 0 00-.71-.29 1 1 0 00-.7.29L4 15.85 2 22l6.15-2L21.71 6.45a1 1 0 00.29-.74 1 1 0 00-.29-.71zM6.87 18.64l-1.5-1.5L15.92 6.57l1.5 1.5zM18.09 7.41l-1.5-1.5 1.67-1.67 1.5 1.5z'></path>
                        </svg>
                      </Button>
                    </Col>
                  </Row>
                ))}
              </Row>
              <Divider />

              {/* <CollapsedDetails
                addNewResourceClick={addNewResourceClick}
                fields={getFieldsFromAttributeModels(attributes)}
                template={userResource || template}
                currentIndex={currentIndexAttr.keyValue || 0}
                onEditClick={onEditClick}
              /> */}
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
      <Modal
        title={currentResourceAttribute.resourceName}
        visible={visibleModal}
        footer={null}
        onOk={() => setvisibleModal(false)}
        onCancel={() => setvisibleModal(false)}>
        <DynamicFormContainer
          fields={getFieldsFromAttributeModels(currentResourceAttribute.attributes)}
          template={currentResourceAttribute}
          currentIndex={currentResourceAttribute.keyValue || 0}
          onHandleSubmit={onHandleSubmit}></DynamicFormContainer>
      </Modal>
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
