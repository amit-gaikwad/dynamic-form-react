import React from 'react';
import { RenderableComponentByType } from './getRenderableComponent';
import { Button, Form, Divider, Col, Row } from 'antd';

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
const tailLayout = {
  wrapperCol: { offset: 11, span: 16 }
};
export const DynamicFormContainer = (props) => {
  const [form] = Form.useForm();
  React.useEffect(() => {
    form.setFieldsValue({
      username: 'Bamboo'
    });
  }, []);
  return (
    <Form
      layout={'horizontal'}
      labelCol={{ span: 7 }}
      className='dynamic-form'
      style={{ margin: '10px' }}
      initialValues={{ remember: true }}
      onFinish={(event) => {
        props.onHandleSubmit(event, props.template, props.currentIndex, form);
      }}
      form={form}>
      {props.fields.map((field) => (
        <React.Fragment key={field.label}>
          <RenderableComponentByType
            field={{ ...field }}
            setFieldsValue={form.setFieldsValue}
            form={form}
          />
        </React.Fragment>
      ))}
      <Divider></Divider>
      <Row>
        <Col span={3} offset={15}>
          <Button
            size='large'
            disabled={false}
            onClick={() => {
              props.setvisibleModal(false);
            }}>
            Cancel
          </Button>
        </Col>
        <Col span={2} offset={2}>
          <Button type='primary' htmlType='submit' size='large' disabled={false}>
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
