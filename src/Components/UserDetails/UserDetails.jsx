import React, { useEffect } from 'react';
import { Row, Col, Divider, Button } from 'antd';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { getRenderableComponentByType } from '../../Utils/getRenderableComponent';
import { connect } from 'react-redux';
import { fetchResources } from '../../Actions/SampleAction';
import { DynamicFormContainer } from '../../Utils/getDynamicForm';
import { getFieldsFromAttributeModels } from '../../Utils/common-methods';
import { Loader } from '../Loader/Loader';

const UserDetails = (props) => {
  useEffect(() => {
    props.fetchResourcesByNamesapce();
  }, []);
  const onHandleSubmit = (event) => {
    console.log('event', event);
  };

  const renderComponents = () => {
    return (
      <div>
        {(props.templateResources || []).map((template) => {
          return (
            <Row style={{ border: '1px solid', margin: '10px' }}>
              <Col>{template.resourceName}</Col>
              <DynamicFormContainer
                fields={getFieldsFromAttributeModels(template.attributes)}
                onHandleSubmit={onHandleSubmit}></DynamicFormContainer>
            </Row>
          );
        })}
      </div>
    );
  };

  return <div>{props.loading ? <Loader /> : renderComponents()}</div>;
};

const mapStateToProps = (state) => {
  return {
    templateResources: state.resources.templateResources || [],
    loading: state.resources.loading
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchResourcesByNamesapce: () => dispatch(fetchResources())
});

export const UserDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(UserDetails);
