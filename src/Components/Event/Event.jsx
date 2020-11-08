import React from 'react';
import { PageLayout } from '../Layout/PageLayout';
import { connect } from 'react-redux';
import { Col, Divider, Input, Row } from 'antd';
import { getFieldsFromAttributeModels } from '../../Utils/common-methods';
import { DynamicFormContainer } from '../../Utils/getDynamicForm';

const data = {
  resourceId: '5f6200ec0fd7c425a0a47326',
  resourceName: 'Event',
  namespaceId: '5f420797fc99e13c8cf8d145',
  attributes: [
    {
      attribute: {
        keyName: 'template',
        keyValue: 'template',
        keyValues: null
      },
      metaData: [
        {
          keyName: 'hidden',
          keyValue: 'true',
          keyValues: null
        },
        {
          keyName: 'mandatory',
          keyValue: 'true',
          keyValues: null
        },
        {
          keyName: 'editable',
          keyValue: 'false',
          keyValues: null
        }
      ]
    },
    {
      attribute: {
        keyName: 'userId',
        keyValue: '',
        keyValues: null
      },
      metaData: [
        {
          keyName: 'hidden',
          keyValue: 'true',
          keyValues: null
        },
        {
          keyName: 'mandatory',
          keyValue: 'true',
          keyValues: null
        },
        {
          keyName: 'editable',
          keyValue: 'false',
          keyValues: null
        }
      ]
    },
    {
      attribute: {
        keyName: 'Instances allowed',
        keyValue: '',
        keyValues: null
      },
      metaData: [
        {
          keyName: 'hidden',
          keyValue: 'false',
          keyValues: null
        },
        {
          keyName: 'mandatory',
          keyValue: 'true',
          keyValues: null
        },
        {
          keyName: 'editable',
          keyValue: 'true',
          keyValues: null
        }
      ]
    },
    {
      attribute: {
        keyName: 'Venue',
        keyValue: '',
        keyValues: null
      },
      metaData: [
        {
          keyName: 'hidden',
          keyValue: 'false',
          keyValues: null
        },
        {
          keyName: 'mandatory',
          keyValue: 'false',
          keyValues: null
        },
        {
          keyName: 'editable',
          keyValue: 'true',
          keyValues: null
        }
      ]
    },
    {
      attribute: {
        keyName: 'From Date',
        keyValue: '',
        keyValues: null
      },
      metaData: [
        {
          keyName: 'hidden',
          keyValue: 'false',
          keyValues: null
        },
        {
          keyName: 'mandatory',
          keyValue: 'false',
          keyValues: null
        },
        {
          keyName: 'editable',
          keyValue: 'true',
          keyValues: null
        }
      ]
    },
    {
      attribute: {
        keyName: 'To Date',
        keyValue: '',
        keyValues: null
      },
      metaData: [
        {
          keyName: 'hidden',
          keyValue: 'false',
          keyValues: null
        },
        {
          keyName: 'mandatory',
          keyValue: 'false',
          keyValues: null
        },
        {
          keyName: 'editable',
          keyValue: 'true',
          keyValues: null
        }
      ]
    },
    {
      attribute: {
        keyName: 'Tag',
        keyValue: '',
        keyValues: null
      },
      metaData: [
        {
          keyName: 'hidden',
          keyValue: 'false',
          keyValues: null
        },
        {
          keyName: 'mandatory',
          keyValue: 'false',
          keyValues: null
        },
        {
          keyName: 'editable',
          keyValue: 'false',
          keyValues: null
        }
      ]
    },
    {
      attribute: {
        keyName: 'currentIndex',
        keyValue: '0',
        keyValues: null
      },
      metaData: null
    }
  ]
};
const Event = (props) => {
  const fields = getFieldsFromAttributeModels(data.attributes || []);
  const onHandleSubmit = (value) => {};
  return (
    <PageLayout
      {...props}
      content={
        <DynamicFormContainer
          fields={fields}
          template={data}
          //  currentIndex={currentResourceAttribute.keyValue || 0}
          onHandleSubmit={onHandleSubmit}></DynamicFormContainer>
        // <Row style={{ width: '100%' }}>
        //   <Row style={{ margin: '0 auto' }}>
        //     <Col>Event Creation</Col>
        //   </Row>
        //   <Divider></Divider>
        //   <Row style={{ width: '100%', alignItems: 'center' }} gutter={[16, 16]}>
        //     <Col span={6}>Title</Col>
        //     <Col offset={1} span={15}>
        //       <Input />
        //     </Col>
        //     <Col span={6}>Description</Col>
        //     <Col offset={1} span={15}>
        //       <Input.TextArea style={{ width: '100%', height: '200px' }} />
        //     </Col>
        //   </Row>
        // </Row>
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});

export const EventContainer = connect(mapStateToProps, mapDispatchToProps)(Event);
