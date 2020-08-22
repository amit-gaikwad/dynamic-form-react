import React from 'react';
import { Row, Col, Avatar } from 'antd';
// import get from 'lodash/get';
// import isEmpty from 'lodash/isEmpty';
// import { connect } from 'react-redux';
// import { fetchResources } from '../../Actions/ResourceAction';
// import { DynamicFormContainer } from '../../Utils/getDynamicForm';
// import { getFieldsFromAttributeModels } from '../../Utils/common-methods';
import { PageLayout } from '../Layout/PageLayout';
import { UserOutlined, PlusCircleOutlined } from '@ant-design/icons';
import PersonalDetailsWithCover from './PersonalDetailsWithCover';

export const PersonalDetails = (props) => {
  const onHandleSubmit = (event) => {
    console.log('event', event);
  };
  // const renderComponents = (details) => {
  //   return (
  //     <Row style={{ border: '1px solid', margin: '10px' }}>
  //       <DynamicFormContainer
  //         fields={getFieldsFromAttributeModels(data.attributes)}
  //         onHandleSubmit={onHandleSubmit}></DynamicFormContainer>
  //     </Row>
  //   );
  // };

  return (
    <PageLayout
      {...props}
      content={<PersonalDetailsWithCover></PersonalDetailsWithCover>}></PageLayout>
  );
};
