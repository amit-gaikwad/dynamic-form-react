import React from 'react';
import { Row, Col, Divider, Button } from 'antd';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { fetchResources } from '../../Actions/ResourceAction';
import { DynamicFormContainer } from '../../Utils/getDynamicForm';
import { getFieldsFromAttributeModels } from '../../Utils/common-methods';
import { PageLayout } from '../Layout/PageLayout';

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
        },
        {
          keyName: 'options',
          keyValue: ['Pune', 'Mumbai']
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
        },
        {
          keyName: 'options',
          keyValue: ['Male', 'Female']
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
        },
        {
          keyName: 'options',
          keyValue: ['Maharashtra', 'Karnataka']
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
  const onHandleSubmit = (event) => {
    console.log('event', event);
  };
  const renderComponents = (details) => {
    return (
      <Row style={{ border: '1px solid', margin: '10px' }}>
        <DynamicFormContainer
          fields={getFieldsFromAttributeModels(data.attributes)}
          onHandleSubmit={onHandleSubmit}></DynamicFormContainer>
      </Row>
    );
  };

  return PageLayout({
    content: (
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
    ),
    props: props
  });
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
