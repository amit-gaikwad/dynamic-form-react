import React, { useEffect, useState } from 'react';
import { Row, Col, Divider, Button, Card, Avatar } from 'antd';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  fetchResources,
  createResource,
  fetchResourcesByUserId,
  updateResourceByUserId
} from '../../Actions/ResourceAction';
import {
  getFieldsFromAttributeModels,
  getFieldsValueFromAtributes
} from '../../Utils/common-methods';
import { Loader } from '../Loader/Loader';
import { cloneDeep, first } from 'lodash';
import { PageLayout } from '../Layout/PageLayout';
import PersonalDetailsWithCover from '../PersonalDetails/PersonalDetailsWithCover';
import { fetchUserIdsNotificationsByUserId } from '../../Actions/NotificationsAction';
import {
  fetchUserIdsConnectionsByUserId,
  disconnectConnection,
  rejectConnection,
  connectFromToUser
} from '../../Actions/ConnectionsAction';
import { sendConnectionRequest, getsentConnectionRequest } from '../../Actions/UserAction';

const NonEditableUserDetails = (props) => {
  const toUserId = props.match.params.toUserId;
  const fromUserId = props.match.params.id;
  useEffect(() => {
    props.fetchResourcesByNamesapce();
    props.fetchUserIdsNotificationsByUserId(fromUserId);
    props.fetchUserIdsConnectionsByUserId(fromUserId);
    props.fetchResourcesByUserId(toUserId);
    props.getsentConnectionRequest({
      userId: fromUserId
    });
  }, []);

  const onDisconnectClick = () => {
    props.disconnectConnection({ fromUserId: fromUserId, toUserId: toUserId });
  };

  const onDeclineClick = () => {
    props.rejectConnection({ fromUserId: fromUserId, toUserId: toUserId });
  };

  const onAcceptClick = () => {
    props.connectFromToUser({ fromUserId: fromUserId, toUserId: toUserId });
  };
  const sendConnectionRequestClick = () => {
    props.sendConnectionRequest({
      userIdFrom: fromUserId,
      userIdTo: toUserId,
      notificationAbout: 'Connection'
    });
  };

  const renderComponents = () => {
    const connectionAllAttributes =
      (first(props.userIdsconnectionsByUserId) || {}).attributes || [];
    const connectionAttribute =
      connectionAllAttributes.find((atr) => atr.attribute.keyName === 'connections') || {};
    const connectedUsers = get(connectionAttribute, 'attribute.keyValue', '').split(',');
    const notificationAllAttributes = props.userIdsnotificationsByUserId.attributes || [];
    const notificationAttribute =
      notificationAllAttributes.find((atr) => atr.attribute.keyName === 'Connection') || {};
    const notificationUsers = get(notificationAttribute, 'attribute.keyValue', '').split(',');

    return (
      <Row style={{ margin: '10px' }} gutter={[26, 26]}>
        {(props.templateResources || []).map((template) => {
          if (template.resourceName === 'Tags') {
            return;
          }
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
          const fieldsValue = getFieldsValueFromAtributes(currentResource.attributes);
          if (template.resourceName === 'Personal Details') {
            return (
              <>
                <PersonalDetailsWithCover
                  onlyView={true}
                  isItTemplate={isItTemplate}
                  name={`${fieldsValue['First Name']} ${fieldsValue['Last Name']}`}
                  profileImageUrl={fieldsValue['Photo']}
                  onEditClick={() => {}}
                  addNewFreshResourceClick={() => {}}
                  currentResource={currentResource}
                  resourceName={currentResource.resourceName}
                  connectedUsers={connectedUsers}
                  notificationUsers={notificationUsers}
                  sendConnectionRequestClick={sendConnectionRequestClick}
                  onDeclineClick={onDeclineClick}
                  onAcceptClick={onAcceptClick}
                  onDisconnectClick={onDisconnectClick}
                  sendConnectedUser={props.sendConnectedUser}
                  toUserId={toUserId}></PersonalDetailsWithCover>
              </>
            );
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
                className='profileSection'
                hoverable={true}>
                {userResources.map((attrs, index) => (
                  <Row style={{ width: '100%', marginTop: '15px' }} className='multiResources'>
                    <Col span={20} style={{ cursor: 'pointer' }}>
                      {getFieldsFromAttributeModels(attrs).map((field) => {
                        if (
                          ![
                            'template'.toLowerCase(),
                            'userId'.toLowerCase(),
                            'currentIndex'.toLowerCase(),
                            'Instances Allowed'.toLowerCase()
                          ].includes(field.label.toLowerCase()) &&
                          !isEmpty(field.value)
                        ) {
                          return (
                            <Col key={field.label} span={24}>
                              <Row gutter={[5, 5]}>
                                <Col span={4}> {`${field.label}  :`} </Col>
                                <Col span={18}>
                                  {field.type === 'date' ? (
                                    moment(field.value).format('DD/MM/YYYY')
                                  ) : field.type === 'fileUpload' ? (
                                    <Avatar
                                      src={field.value}
                                      size={40}
                                      style={{ marginLeft: '10px' }}
                                    />
                                  ) : (
                                    field.value
                                  )}
                                </Col>
                              </Row>
                            </Col>
                          );
                        }
                      })}
                    </Col>
                    {isItHavingMultiResource && <Divider></Divider>}
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
          {props.loading || props.resourcesByUserIdLoading ? <Loader /> : renderComponents()}
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
    resourcesByUserIdLoading: state.resources.resourcesByUserIdLoading,
    userIdsconnectionsByUserId: state.connectionReducer.userIdsconnectionsByUserId,
    userIdsnotificationsByUserId: state.notificationsReducer.userIdsnotificationsByUserId,
    sendConnectedUser: state.userReducer.sendConnectedUser
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchResourcesByNamesapce: () => dispatch(fetchResources()),
  createResource: (resource, userId) => dispatch(createResource(resource, userId)),
  fetchResourcesByUserId: (userId) => dispatch(fetchResourcesByUserId(userId)),
  updateResourceByUserId: (resource, userId) => dispatch(updateResourceByUserId(resource, userId)),
  fetchUserIdsNotificationsByUserId: (userId) =>
    dispatch(fetchUserIdsNotificationsByUserId(userId)),
  fetchUserIdsConnectionsByUserId: (userId) => dispatch(fetchUserIdsConnectionsByUserId(userId)),
  disconnectConnection: (obj) => dispatch(disconnectConnection(obj)),
  rejectConnection: (obj) => dispatch(rejectConnection(obj)),
  connectFromToUser: (obj) => dispatch(connectFromToUser(obj)),
  sendConnectionRequest: (obj) => dispatch(sendConnectionRequest(obj)),
  getsentConnectionRequest: (obj) => dispatch(getsentConnectionRequest(obj))
});

export const NonEditableUserDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NonEditableUserDetails);
