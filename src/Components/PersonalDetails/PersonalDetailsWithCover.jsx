import React from 'react';
import { UserOutlined, PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Row, Col, Avatar, Card, Button, Divider } from 'antd';
import { get } from 'lodash';

const PersonalDetailsWithCover = ({
  profileImageUrl,
  addNewFreshResourceClick,
  currentResource,
  resourceName = 'Personal Details',
  name,
  summary = '',
  onEditClick,
  isItTemplate,
  connectedUsers,
  notificationUsers,
  onlyView,
  sendConnectionRequestClick,
  onDeclineClick,
  onAcceptClick,
  onDisconnectClick,
  toUserId,
  sendConnectedUser
}) => {
  const sendConnectedUser1 = sendConnectedUser.attributes || [];

  const connectedUserIdsAttribute =
    sendConnectedUser1.find((attr) => attr.attribute.keyName === 'Connection') || {};
  const connectedUserIds = get(connectedUserIdsAttribute, 'attribute.keyValue', '').split(',');
  return (
    <Col span={24}>
      <Card
        className={'personalDetailsCover'}
        style={{
          fontWeight: 'bold',
          fontSize: '20px',
          borderRadius: '2px',
          boxShadow: '2px 2px 2px 2px rgba(208, 216, 243, 0.6)'
        }}>
        <Row style={{ background: 'black', height: '200px' }}></Row>
        <Row>
          <Col span={8} offset={2} style={{ marginTop: '-75px' }}>
            <Avatar size={160} icon={<UserOutlined />} src={profileImageUrl} />
          </Col>
          {onlyView && (
            <Col span={12} style={{ paddingTop: '18px' }}>
              <Row>
                {(connectedUsers || []).includes(toUserId) ? (
                  <Col span={8}>
                    <Button type='danger' onClick={onDisconnectClick}>
                      Disconnect
                    </Button>
                  </Col>
                ) : (notificationUsers || []).includes(toUserId) ? (
                  <>
                    <Col span={8}>
                      <Button type='danger' onClick={onDeclineClick}>
                        Decline
                      </Button>
                    </Col>
                    <Col span={8}>
                      <Button type='primary' onClick={onAcceptClick}>
                        Accept
                      </Button>
                    </Col>
                  </>
                ) : connectedUserIds.includes(toUserId) ? (
                  <Col span={8}>
                    <Button type='blur' disabled={true}>
                      Already sent Request
                    </Button>
                  </Col>
                ) : (
                  <Col span={8}>
                    <Button type='primary' onClick={sendConnectionRequestClick}>
                      Connect
                    </Button>
                  </Col>
                )}
              </Row>
            </Col>
          )}

          {isItTemplate && (
            <>
              <Col span={5} offset={10} style={{ paddingTop: '17px' }}>
                {resourceName}
              </Col>
              <Col offset={1} style={{ paddingTop: '17px' }}>
                <PlusCircleOutlined
                  style={{ fontSize: '30px' }}
                  onClick={() => {
                    addNewFreshResourceClick(currentResource);
                  }}
                />
              </Col>
            </>
          )}
        </Row>
        <Row style={{ width: '100%' }}>
          <Col offset={2} span={8} style={{ paddingLeft: '15px' }}>{`    ${name}`}</Col>

          {!isItTemplate && !onlyView && (
            <Col offset={2} span={2}>
              <EditOutlined
                onClick={() => {
                  onEditClick(currentResource);
                }}
              />
            </Col>
          )}

          <Col offset={2} span={22}>
            {summary}
          </Col>
          <Divider></Divider>
        </Row>
        {/* <Row>
          {onlyView && (
            <Col>
              {(connectedUsers || []).includes(toUserId) ? (
                <Col span={4}>
                  <Button type='danger' onClick={onDisconnectClick}>
                    Disconnect
                  </Button>
                </Col>
              ) : (notificationUsers || []).includes(toUserId) ? (
                <>
                  <Col span={4}>
                    <Button type='danger' onClick={onDeclineClick}>
                      Decline
                    </Button>
                  </Col>
                  <Col span={4}>
                    <Button type='primary' onClick={onAcceptClick}>
                      Accept
                    </Button>
                  </Col>
                </>
              ) : (
                <Col span={4}>
                  <Button type='primary' onClick={sendConnectionRequestClick}>
                    Connect
                  </Button>
                </Col>
              )}
            </Col>
          )}
        </Row> */}
      </Card>
    </Col>
  );
};

PersonalDetailsWithCover.defaultProps = {
  sendConnectedUser: {}
};

export default PersonalDetailsWithCover;
