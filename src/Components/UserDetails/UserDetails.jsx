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
import { omit, cloneDeep } from 'lodash';
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
    for (const item of newResource.attributes) {
      if (item.attribute.keyName === 'userId' && istemplateResource) {
        item.attribute.keyValue = props.match.params.id;
      } else {
        item.attribute.keyValue = event[item.attribute.keyName];
      }
    }
    if (templateResource.mode === 'add') {
      newResource.attributes.unshift({
        attribute: {
          keyName: 'actionsAllowed',
          keyValue: 'add'
        }
      });
      newResource.resourceId = userResource.resourceId;
      props
        .updateResourceByUserId(newResource, props.match.params.id)
        .then(() => setvisibleModal(false));
    } else if (templateResource.mode === 'edit') {
      newResource.attributes.unshift({
        attribute: {
          keyName: 'actionsAllowed',
          keyValue: 'update'
        }
      });
      newResource.attributes = newResource.attributes.filter(
        (attr) =>
          !['template', 'userId', 'currentIndex', 'Instances Allowed'].includes(
            attr.attribute.keyName
          )
      );
      newResource.resourceId = userResource.resourceId;
      props
        .updateResourceByUserId(newResource, props.match.params.id)
        .then(() => setvisibleModal(false));
    } else {
      props.createResource(newResource, props.match.params.id).then(() => setvisibleModal(false));
    }
  };
  const onEditClick = (resource) => {
    setvisibleModal(true);
    resource.mode = 'edit';
    setcurrentResourceAttribute(resource);
  };

  const addNewResourceClick = (resource) => {
    debugger;
    const templateResource = (props.templateResources || []).find(
      (r) => r.resourceName === resource.resourceName
    );

    const currentIndexAtrr =
      resource.attributes.find((a) => a.attribute.keyName === 'currentIndex') || {};
    const currentIndex = currentIndexAtrr.attribute.keyValue;

    let filteredAttrs = resource.attributes.filter((x) => {
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
    const newResource = cloneDeep(resource);
    newResource.attributes = filteredAttrs;
    newResource.attributes.push({
      attribute: {
        keyName: 'currentIndex',
        keyValue: currentIndex
      }
    });
    console.log('templateResource', newResource);
    setvisibleModal(true);
    setcurrentResourceAttribute({ ...newResource, mode: 'add' });
  };

  const addNewFreshResourceClick = (template) => {
    debugger;
    // const templateResource = (props.templateResources || []).find(
    //   (r) => r.resourceName === resource.resourceName
    // );

    // const currentIndexAtrr =
    //   resource.attributes.find((a) => a.attribute.keyName === 'currentIndex') || {};
    // const currentIndex = currentIndexAtrr.attribute.keyValue;

    // let filteredAttrs = resource.attributes.filter((x) => {
    //   if (x.attribute.keyName === 'Instances Allowed') {
    //     return false;
    //   }
    //   var m = (x.metaData || []).find((l) => l.keyName == 'index') || {};
    //   const isSatisfy = m.keyValue && m.keyValue.toString() == currentIndex;
    //   x.attribute.keyValue = '';
    //   if (m.keyValue && m.keyValue.toString() == currentIndex) {
    //     x.metaData = (x.metaData || []).filter((o) => o.keyName !== 'index');
    //     return true;
    //   }
    //   return false;
    // });
    // const newResource = cloneDeep(resource);
    // newResource.attributes = filteredAttrs;
    // newResource.attributes.push({
    //   attribute: {
    //     keyName: 'currentIndex',
    //     keyValue: '0'
    //   }
    // });
    // console.log('templateResource', newResource);
    setvisibleModal(true);
    setcurrentResourceAttribute({ ...template });
  };
  const renderComponents = () => {
    return (
      <div>
        {(props.templateResources || []).map((template) => {
          let attributes = template.attributes;
          // const userResources = (props.resourcesByUserId || []).filter(
          //   (r) => r.resourceName === template.resourceName
          // );
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

          var p = attributes.find((w) => w.attribute.keyName === 'currentIndex');
          var userResources = [];
          for (let i = 1; i <= Number(p.attribute.keyValue); i++) {
            let a = attributes.filter((x) => {
              var m = (x.metaData || []).find((m) => m.keyName == 'index') || {};
              return m.keyValue && m.keyValue.toString() == i;
            });
            userResources.push(a);
          }
          console.log('userResources', userResources);
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
                          addNewFreshResourceClick(currentResource);
                        }
                      }}>
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
                {userResources.map((attrs) => (
                  <Row style={{ width: '100%', marginTop: '15px' }} className='multiResources'>
                    <Col span={6}>
                      {getFieldsFromAttributeModels(attrs).map((field) => {
                        if (
                          !['template', 'userId', 'currentIndex', 'Instances Allowed'].includes(
                            field.label
                          )
                        ) {
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
                          onEditClick(currentResource);
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
      {visibleModal && (
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
  createResource: (resource, userId) => dispatch(createResource(resource, userId)),
  fetchResourcesByUserId: (userId) => dispatch(fetchResourcesByUserId(userId)),
  updateResourceByUserId: (resource, userId) => dispatch(updateResourceByUserId(resource, userId))
});

export const UserDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(UserDetails);
