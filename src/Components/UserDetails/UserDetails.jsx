import React, { useEffect, useState } from 'react';
import { Row, Col, Divider, Button, Card } from 'antd';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { getRenderableComponentByType } from '../../Utils/getRenderableComponent';
import { connect } from 'react-redux';
import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
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
import { PageLayout } from '../Layout/PageLayout';

const UserDetails = (props) => {
  const [currentResourceAttribute, setcurrentResourceAttribute] = useState({});
  const [visibleModal, setvisibleModal] = useState(false);
  useEffect(() => {
    props.fetchResourcesByNamesapce();
    props.fetchResourcesByUserId(props.match.params.id);
  }, []);

  const onHandleSubmit = (event, templateResource, currentIndex) => {
    const newResource = omit(templateResource, ['resourceId']);
    const istemplateResource = newResource.attributes.find(
      (attr) => attr.attribute.keyName == 'template'
    );
    newResource.attributes = newResource.attributes.filter(
      (attr) => attr.attribute.keyName !== 'template'
    );
    const userResource1 = (props.resourcesByUserId || []).find(
      (r) => r.resourceName === templateResource.resourceName
    );
    const userResource = cloneDeep(userResource1);
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
      var filteredAttr = userResource.attributes.filter((a) => {
        var isSimilarindex = (a.metaData || []).filter(
          (m) => m.keyName === 'index' && m.keyValue == 1
        );
        return isSimilarindex.length > 0;
      });
      // var ats = [];
      // filteredAttr.forEach((item, index) => {
      //   var newValueAttr =
      //     newResource.attributes.find((a) => a.attribute.keyName === item.attribute.keyName) || {};
      //   if (!isEmpty(newValueAttr) && item.attribute.keyValue !== newValueAttr.attribute.keyValue) {
      //     ats.push(newValueAttr);
      //   }
      // });

      newResource.attributes = newResource.attributes.filter(
        (attr) =>
          !['template', 'userId', 'currentIndex', 'Instances Allowed'].includes(
            attr.attribute.keyName
          )
      );
      // newResource.attributes = ats;
      newResource.attributes.unshift({
        attribute: {
          keyName: 'actionsAllowed',
          keyValue: 'update'
        }
      });
      newResource.resourceId = userResource.resourceId;
      props
        .updateResourceByUserId(omit(newResource, ['mode']), props.match.params.id)
        .then(() => setvisibleModal(false));
    } else {
      props
        .createResource(omit(newResource, ['mode']), props.match.params.id)
        .then(() => setvisibleModal(false));
    }
  };
  const onEditClick = (resource) => {
    setvisibleModal(true);
    resource.mode = 'edit';
    setcurrentResourceAttribute(resource);
  };

  const editMultiResourceClick = (resource1, attributes, index) => {
    setvisibleModal(true);
    const resource = cloneDeep(resource1);
    resource.mode = 'edit';
    resource.attributes = cloneDeep(attributes);
    setcurrentResourceAttribute(resource);
  };

  const addNewResourceClick = (resource) => {
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
    setvisibleModal(true);
    setcurrentResourceAttribute({ ...template });
  };
  const renderComponents = () => {
    return (
      <Row style={{ margin: '10px' }} gutter={[26, 26]}>
        {(props.templateResources || []).map((template) => {
          let attributes = template.attributes;
          const userResource1 = (props.resourcesByUserId || []).find(
            (r) => r.resourceName === template.resourceName
          );
          const userResource = cloneDeep(userResource1);
          if (userResource) {
            attributes = userResource.attributes;
          }
          const fields = getFieldsFromAttributeModels(attributes);
          const isItTemplate = fields.find((f) => f.label === 'template');
          const isItHavingMultiResource = fields.find(
            (f) => f.label.toLowerCase() === 'Instances Allowed'.toLowerCase()
          );
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
          return (
            <Col span={24} key={template.resourceId}>
              <Card
                style={{
                  borderRadius: '2px',
                  boxShadow: '2px 2px 2px 2px rgba(208, 216, 243, 0.6)'
                }}
                title={
                  <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
                    {currentResource.resourceName}
                  </span>
                }
                extra={
                  !isItTemplate ? (
                    isItHavingMultiResource && (
                      <PlusCircleOutlined
                        style={{ fontSize: '30px' }}
                        onClick={() => {
                          if (!isItTemplate && isItHavingMultiResource) {
                            addNewResourceClick(currentResource);
                          } else {
                            addNewFreshResourceClick(currentResource);
                          }
                        }}
                      />
                    )
                  ) : (
                    <PlusCircleOutlined
                      style={{ fontSize: '30px' }}
                      onClick={() => {
                        if (!isItTemplate && isItHavingMultiResource) {
                          addNewResourceClick(currentResource);
                        } else {
                          addNewFreshResourceClick(currentResource);
                        }
                      }}
                    />
                  )
                }
                hoverable={true}>
                {userResources.map((attrs, index) => (
                  <Row style={{ width: '100%', marginTop: '15px' }} className='multiResources'>
                    <Col span={6}>
                      {getFieldsFromAttributeModels(attrs).map((field) => {
                        if (
                          ![
                            'template'.toLowerCase(),
                            'userId'.toLowerCase(),
                            'currentIndex'.toLowerCase(),
                            'Instances Allowed'.toLowerCase()
                          ].includes(field.label.toLowerCase())
                        ) {
                          return (
                            <Col key={field.label} span={24}>
                              {field.label} :
                              {field.type === 'date'
                                ? moment(field.value).format('DD/MM/YYYY')
                                : field.value}
                            </Col>
                          );
                        }
                      })}
                    </Col>
                    <Col span={2} className='editButton'>
                      <EditOutlined
                        onClick={() => {
                          if (isItHavingMultiResource) {
                            editMultiResourceClick(currentResource, attrs, index + 1);
                          } else {
                            onEditClick(currentResource);
                          }
                        }}
                      />
                    </Col>
                  </Row>
                ))}
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <PageLayout
      {...props}
      content={
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
      }></PageLayout>
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
