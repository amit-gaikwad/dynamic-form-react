import React from 'react';
import { Row, Col, Divider, Button } from 'antd';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { getRenderableComponentByType } from '../../Utils/getRenderableComponent';
import { connect } from 'react-redux';
import { fetchResources } from '../../Actions/SampleAction';

const data = {
  attributes: [
    {
      attribute: {
        keyName: 'template',
        keyValue: 'template'
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
        keyName: 'userId',
        keyValue: ''
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
        },
        {
          keyName: 'type',
          keyValue: 'text'
        }
      ]
    },
    {
      attribute: {
        keyName: 'Salutation',
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
          keyValue: 'false'
        },
        {
          keyName: 'type',
          keyValue: 'checkbox'
        }
      ]
    },
    {
      attribute: {
        keyName: 'First Name',
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
          keyValue: 'radio'
        }
      ]
    },
    {
      attribute: {
        keyName: 'Last Name',
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
          keyValue: 'list'
        }
      ]
    },
    {
      attribute: {
        keyName: 'Preferred Name',
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
          keyValue: 'date'
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
        }
      ]
    }
  ],
  namespaceId: '5ead83920efa8a1bf89a7864',
  resourceId: '5ead869b0efa8a19587a9c40',
  resourceName: 'Personal Details'
};
const PersonalDetails = (props) => {
  const renderComponents = (details) => {
    return (
      <Row>
        {!isEmpty(details.attributes) &&
          details.attributes.map((item) => {
            if (
              get(item, 'attribute.keyName') &&
              get(item, 'attribute.keyName') !== 'template' &&
              get(item, 'attribute.keyName') !== 'userId'
            ) {
              const metaData = get(item, 'metaData', []);
              console.log('metaData', metaData);
              const typeObj = metaData.find((i) => i.keyName === 'type') || {};
              return (
                <React.Fragment key={get(item, 'attribute.keyName')}>
                  <Col span={4}>{get(item, 'attribute.keyName')}</Col>
                  <Col span={12}>
                    {getRenderableComponentByType({
                      type: typeObj.keyValue,
                      value: get(item, 'attribute.keyValue'),
                      options: ['Pune', 'Mumbai']
                    })}
                  </Col>
                  <Divider />
                </React.Fragment>
              );
            }
          })}
      </Row>
    );
  };

  return (
    <div>
      <Row>
        This is Personal Details
        <Col>
          <Button
            onClick={() => {
              props.fetchResourcesByNamesapce();
            }}>
            Fetch Resources
          </Button>
        </Col>
      </Row>
      {renderComponents(data)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    counter: state.resource
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchResourcesByNamesapce: () => dispatch(fetchResources())
});

export const PersonalDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalDetails);
