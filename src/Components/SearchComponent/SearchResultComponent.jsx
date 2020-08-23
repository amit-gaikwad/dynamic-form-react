import React from 'react';
import { Row, Col, Card, Button, Avatar } from 'antd';
import Meta from 'antd/lib/card/Meta';
import {
  getFieldsFromAttributeModels,
  getFieldsValueFromAtributes
} from '../../Utils/common-methods';
import { get } from 'lodash';

export const SearchResultComponent = (props) => {
  const sendConnectedUser = props.sendConnectedUser.attributes || [];
  const connectedUserIdsAttribute =
    sendConnectedUser.find((attr) => attr.attribute.keyName === 'Connection') || {};
  const connectedUserIds = get(connectedUserIdsAttribute, 'attribute.keyValue', '').split(',');
  return (
    <Row
      style={{ height: '100%', overflowY: 'auto', marginTop: '3px' }}
      id='search-result'
      className='search-result-component'
      gutter={[16, 16]}>
      {props.users.map((p, i) => {
        const user = getFieldsValueFromAtributes(p.attributes);
        return (
          <Col span={11} key={i} offset={1}>
            <Card
              style={{
                width: '90%',
                borderRadius: '2px',
                boxShadow: '2px 2px 2px 2px rgba(208, 216, 243, 0.6)'
              }}
              actions={
                connectedUserIds.includes(user.userId)
                  ? [
                      <div
                        onClick={() => {
                          props.onDecline(p);
                        }}>
                        Already sent Request
                      </div>
                    ]
                  : [
                      // <Button
                      //   onClick={() => {
                      //     props.onDecline(p);
                      //   }}>
                      //   Decline
                      // </Button>
                      // ,
                      <Button
                        onClick={() => {
                          props.onAccept(p, user);
                        }}>
                        Connect
                      </Button>
                    ]
              }>
              <Meta
                avatar={<Avatar src={user['Photo']} />}
                title={`${user['First Name']} ${user['Last Name']}`}
                //description='This is the description'
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};
