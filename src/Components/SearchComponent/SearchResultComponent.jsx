import React from 'react';
import { Row, Col, Card, Button, Avatar } from 'antd';
import Meta from 'antd/lib/card/Meta';
import {
  getFieldsFromAttributeModels,
  getFieldsValueFromAtributes
} from '../../Utils/common-methods';
import { get } from 'lodash';

const data = [
  {
    resourceId: '5f270aa4e042d5499c5ee765',
    resourceName: 'Personal Details',
    namespaceId: '5f1f0c2b91f3775dd4c991a5',
    attributes: [
      {
        attribute: {
          keyName: 'userId',
          keyValue: 'amol'
        },
        metaData: [
          {
            keyName: 'hidden',
            keyValue: 'true'
          },
          {
            keyName: 'mandatory',
            keyValue: 'true'
          },
          {
            keyName: 'editable',
            keyValue: 'false'
          }
        ]
      },
      {
        attribute: {
          keyName: 'currentIndex',
          keyValue: '1'
        },
        metaData: null
      },
      {
        attribute: {
          keyName: 'Salutation',
          keyValue: 'MR'
        },
        metaData: [
          {
            keyName: 'hidden',
            keyValue: 'false'
          },
          {
            keyName: 'mandatory',
            keyValue: 'true'
          },
          {
            keyName: 'editable',
            keyValue: 'false'
          },
          {
            keyName: 'type',
            keyValue: 'text'
          },
          {
            keyName: 'index',
            keyValue: '1'
          }
        ]
      },
      {
        attribute: {
          keyName: 'First Name',
          keyValue: 'Amol B.'
        },
        metaData: [
          {
            keyName: 'hidden',
            keyValue: 'false'
          },
          {
            keyName: 'mandatory',
            keyValue: 'true'
          },
          {
            keyName: 'editable',
            keyValue: 'true'
          },
          {
            keyName: 'type',
            keyValue: 'text'
          },
          {
            keyName: 'index',
            keyValue: '1'
          }
        ]
      },
      {
        attribute: {
          keyName: 'Last Name',
          keyValue: 'Jadhav'
        },
        metaData: [
          {
            keyName: 'hidden',
            keyValue: 'false'
          },
          {
            keyName: 'mandatory',
            keyValue: 'true'
          },
          {
            keyName: 'editable',
            keyValue: 'true'
          },
          {
            keyName: 'type',
            keyValue: 'text'
          },
          {
            keyName: 'index',
            keyValue: '1'
          }
        ]
      },
      {
        attribute: {
          keyName: 'Preferred Name',
          keyValue: 'AmolJ'
        },
        metaData: [
          {
            keyName: 'hidden',
            keyValue: 'false'
          },
          {
            keyName: 'mandatory',
            keyValue: 'true'
          },
          {
            keyName: 'editable',
            keyValue: 'true'
          },
          {
            keyName: 'type',
            keyValue: 'text'
          },
          {
            keyName: 'index',
            keyValue: '1'
          }
        ]
      },
      {
        attribute: {
          keyName: 'Photo',
          keyValue: ''
        },
        metaData: [
          {
            keyName: 'hidden',
            keyValue: 'false'
          },
          {
            keyName: 'mandatory',
            keyValue: 'true'
          },
          {
            keyName: 'editable',
            keyValue: 'true'
          },
          {
            keyName: 'type',
            keyValue: 'fileUpload'
          },
          {
            keyName: 'index',
            keyValue: '1'
          }
        ]
      }
    ]
  },
  {
    resourceId: '5f293b7f9950957c488a2a88',
    resourceName: 'Personal Details',
    namespaceId: '5f1f0c2b91f3775dd4c991a5',
    attributes: [
      {
        attribute: {
          keyName: 'userId',
          keyValue: 'ashok'
        },
        metaData: [
          {
            keyName: 'hidden',
            keyValue: 'true'
          },
          {
            keyName: 'mandatory',
            keyValue: 'true'
          },
          {
            keyName: 'editable',
            keyValue: 'false'
          }
        ]
      },
      {
        attribute: {
          keyName: 'Salutation',
          keyValue: 'Mr'
        },
        metaData: [
          {
            keyName: 'hidden',
            keyValue: 'false'
          },
          {
            keyName: 'mandatory',
            keyValue: 'true'
          },
          {
            keyName: 'editable',
            keyValue: 'false'
          },
          {
            keyName: 'type',
            keyValue: 'text'
          },
          {
            keyName: 'index',
            keyValue: '1'
          }
        ]
      },
      {
        attribute: {
          keyName: 'First Name',
          keyValue: 'Ashok'
        },
        metaData: [
          {
            keyName: 'hidden',
            keyValue: 'false'
          },
          {
            keyName: 'mandatory',
            keyValue: 'true'
          },
          {
            keyName: 'editable',
            keyValue: 'true'
          },
          {
            keyName: 'type',
            keyValue: 'text'
          },
          {
            keyName: 'index',
            keyValue: '1'
          }
        ]
      },
      {
        attribute: {
          keyName: 'Last Name',
          keyValue: 'Mane'
        },
        metaData: [
          {
            keyName: 'hidden',
            keyValue: 'false'
          },
          {
            keyName: 'mandatory',
            keyValue: 'true'
          },
          {
            keyName: 'editable',
            keyValue: 'true'
          },
          {
            keyName: 'type',
            keyValue: 'text'
          },
          {
            keyName: 'index',
            keyValue: '1'
          }
        ]
      },
      {
        attribute: {
          keyName: 'Preferred Name',
          keyValue: 'AM'
        },
        metaData: [
          {
            keyName: 'hidden',
            keyValue: 'false'
          },
          {
            keyName: 'mandatory',
            keyValue: 'true'
          },
          {
            keyName: 'editable',
            keyValue: 'true'
          },
          {
            keyName: 'type',
            keyValue: 'text'
          },
          {
            keyName: 'index',
            keyValue: '1'
          }
        ]
      },
      {
        attribute: {
          keyName: 'Photo',
          keyValue: ''
        },
        metaData: [
          {
            keyName: 'hidden',
            keyValue: 'false'
          },
          {
            keyName: 'mandatory',
            keyValue: 'true'
          },
          {
            keyName: 'editable',
            keyValue: 'true'
          },
          {
            keyName: 'type',
            keyValue: 'fileUpload'
          },
          {
            keyName: 'index',
            keyValue: '1'
          }
        ]
      },
      {
        attribute: {
          keyName: 'currentIndex',
          keyValue: '1'
        },
        metaData: null
      }
    ]
  }
];

export const SearchResultComponent = (props) => {
  console.log('props', props);
  const sendConnectedUser = props.sendConnectedUser.attributes || [];
  const connectedUserIdsAttribute =
    sendConnectedUser.find((attr) => attr.attribute.keyName === 'Connection') || {};
  const connectedUserIds = get(connectedUserIdsAttribute, 'attribute.keyValue', '').split(',');
  console.log('connectedUserIds', sendConnectedUser, connectedUserIdsAttribute.keyValue);
  return (
    <Row width={'100%'} className='search-result-component' gutter={[16, 16]}>
      {(props.users || []).map((p, i) => {
        console.log('user', getFieldsValueFromAtributes(p.attributes));
        const user = getFieldsValueFromAtributes(p.attributes);
        return (
          <Col span={11} key={i} offset={1}>
            <Card
              style={{ width: '90%' }}
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
                      <Button
                        onClick={() => {
                          props.onDecline(p);
                        }}>
                        Decline
                      </Button>,
                      <Button
                        onClick={() => {
                          props.onAccept(p, user);
                        }}>
                        Accept
                      </Button>
                    ]
              }>
              <Meta
                avatar={
                  <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                }
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
