import React from 'react';
import Form from 'antd/lib/form/Form';
import { getRenderableComponentByType } from './getRenderableComponent';
import { Button } from 'antd';

/**
 * [
 *  {
 *    type:"text",value:"",mandatory:true,maxLength:"",minLength:"",pattern:"", options:"", label:""
 *  },
 *  {
 *    type: "radio", value:"", mandatory:true, maxLength:"", minLength:"", pattern:"", options: ["Male","Female"], label:""
 *  },
 *  {
 *    type:"checkbox",value:"",mandatory:true,maxLength:"",minLength:"",pattern:"",options:"", label:""
 *  },
 *  {
 *    type:"dropdown",value:"",mandatory:true,maxLength:"",minLength:"",pattern:"",options:"", label:""
 *  },
 *  {
 *    type:"upload",value:"",mandatory:true,maxLength:"",minLength:"",pattern:"",options:"", label:""
 *  },
 *
 * ]
 */

export const DynamicFormContainer = (props) => {
  return (
    <Form
      layout={'horizontal'}
      className='dynamic-form'
      style={{ margin: '10px' }}
      initialValues={{ remember: true }}
      onFinish={(event) => {
        props.onHandleSubmit(event, props.template);
      }}>
      {props.fields.map((field) => getRenderableComponentByType({ ...field }))}
      <Button type='primary' htmlType='submit' size='large' disabled={false}>
        Save
      </Button>
    </Form>
  );
};
