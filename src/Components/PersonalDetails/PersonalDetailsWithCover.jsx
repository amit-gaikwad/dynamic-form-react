import React from 'react';
import { UserOutlined, PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Row, Col, Avatar, Card } from 'antd';

const PersonalDetailsWithCover = ({
  profileImageUrl,
  addNewFreshResourceClick,
  currentResource,
  resourceName = 'Personal Details',
  name,
  summary = '',
  onEditClick,
  isItTemplate
}) => {
  console.log('currentResource', currentResource);
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
          <Col span={4} offset={2} style={{ marginTop: '-75px' }}>
            <Avatar size={160} icon={<UserOutlined />} src={profileImageUrl} />
          </Col>

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
        <Row>
          <Col offset={2} span={4}>{`    ${name}`}</Col>

          {!isItTemplate && (
            <Col offset={2} span={2}>
              <EditOutlined
                onClick={() => {
                  onEditClick(currentResource);
                }}
              />
            </Col>
          )}

          <Col offset={2} span={24}>
            {summary}
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default PersonalDetailsWithCover;
