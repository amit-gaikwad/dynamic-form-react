import React from 'react';
import { Row, Col, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';

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
  return (
    <Row width={'100%'} className='search-result-component'>
      {(props.users || []).map((p, i) => (
        <Col span={6} key={i}>
          <Card
            hoverable
            style={{ width: '80%' }}
            cover={
              <img
                style={{ width: '30px', height: '30px' }}
                alt='example'
                src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
              />
            }>
            <Meta title='Europe Street beat' description='www.instagram.com' />
          </Card>
        </Col>
      ))}
    </Row>
  );
};
