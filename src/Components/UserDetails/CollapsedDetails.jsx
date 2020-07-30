import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';

export const CollapsedDetails = (props) => {
  return (
    <div>
      <Row>
        <Col>
          <Button
            onClick={() => {
              props.onEditClick(props.template);
            }}>
            Edit
          </Button>
        </Col>
        <Col>
          {props.fields.map((field) => (
            <Col key={field.label} span={24}>
              {field.label} : {field.value}
            </Col>
          ))}
        </Col>
      </Row>
    </div>
  );
};
