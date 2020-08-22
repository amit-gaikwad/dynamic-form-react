import React from 'react';
import { RenderableComponentByType } from './getRenderableComponent';
import { Button, Form } from 'antd';

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
      <Button type='primary' htmlType='submit' size='large' disabled={false}>
        Save
      </Button>
    </Form>
  );
};
