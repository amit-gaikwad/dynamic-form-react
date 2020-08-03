import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';

export const CollapsedDetails = (props) => {
  const isItTemplate = props.fields.find((f) => f.label === 'template');
  const isItHavingMultiResource = props.fields.find(
    (f) => f.label.toLowerCase() === 'Instances Allowed'.toLowerCase()
  );
  return (
    <Row style={{ width: '100%' }}>
      <Row style={{ width: '100%' }}>
        <Col span={22} style={{ fontWeight: 1000 }}>
          {props.template.resourceName}
        </Col>
        <Col span={2}>
          <Button
            onClick={() => {
              if (!isItTemplate && isItHavingMultiResource) {
                props.addNewResourceClick(props.template);
              } else {
                props.onEditClick(props.template);
              }
            }}>
            {/* {isItTemplate ? '+' : 'Edit'} */}
            {!isItTemplate ? (
              isItHavingMultiResource ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  data-supported-dps='24x24'
                  fill='currentColor'
                  width='24'
                  height='24'
                  focusable='false'>
                  <path d='M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8v2z'></path>
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  data-supported-dps='24x24'
                  fill='currentColor'
                  width='24'
                  height='24'
                  focusable='false'>
                  <path d='M21.71 5L19 2.29a1 1 0 00-.71-.29 1 1 0 00-.7.29L4 15.85 2 22l6.15-2L21.71 6.45a1 1 0 00.29-.74 1 1 0 00-.29-.71zM6.87 18.64l-1.5-1.5L15.92 6.57l1.5 1.5zM18.09 7.41l-1.5-1.5 1.67-1.67 1.5 1.5z'></path>
                </svg>
              )
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                data-supported-dps='24x24'
                fill='currentColor'
                width='24'
                height='24'
                focusable='false'>
                <path d='M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8v2z'></path>
              </svg>
            )}
          </Button>
        </Col>
      </Row>
      {!isItTemplate && isItHavingMultiResource ? (
        <Row style={{ width: '100%', marginTop: '15px' }} className='multiResources'>
          <Col span={6}>
            {props.fields.map((field) => {
              if (!['template', 'userId', 'currentIndex'].includes(field.label)) {
                return (
                  <Col key={field.label} span={24}>
                    {field.label} : {field.value}
                  </Col>
                );
              }
            })}
          </Col>
          <Col span={2} className='editButton'>
            <Button
              onClick={() => {
                props.onEditClick(props.template);
              }}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                data-supported-dps='24x24'
                fill='currentColor'
                width='24'
                height='24'
                focusable='false'>
                <path d='M21.71 5L19 2.29a1 1 0 00-.71-.29 1 1 0 00-.7.29L4 15.85 2 22l6.15-2L21.71 6.45a1 1 0 00.29-.74 1 1 0 00-.29-.71zM6.87 18.64l-1.5-1.5L15.92 6.57l1.5 1.5zM18.09 7.41l-1.5-1.5 1.67-1.67 1.5 1.5z'></path>
              </svg>
            </Button>
          </Col>
        </Row>
      ) : (
        !isItTemplate && (
          <Col>
            {props.fields.map((field) => {
              if (
                !['template', 'userId', 'currentIndex', 'Instances Allowed'].includes(field.label)
              ) {
                return (
                  <Col key={field.label} span={24}>
                    {field.label} : {field.value}
                  </Col>
                );
              }
            })}
          </Col>
        )
      )}
    </Row>
  );
};
