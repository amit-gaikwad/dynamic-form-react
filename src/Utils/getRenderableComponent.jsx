import React, { useState } from 'react';
import { COMPONENT_TYPES } from '../Constants/ComponentTypes';
import { Input, Radio, Checkbox, DatePicker, Upload, Form, Select, message, Button } from 'antd';
import moment from 'moment';
import { get } from 'lodash';

// type:"upload",value:"",mandatory:true,maxLength:"",minLength:"",pattern:"",options:"", label:""
export const RenderableComponentByType = ({ field, setFieldsValue, form }) => {
  let { type, value, options, label, mandatory, maxLength, minLength, pattern, hidden } = field;
  var isTrueSet = hidden === 'true';
  const [loading, setloading] = useState(false);
  const [imageUrl, setImageUrl] = useState(value);

  if (label === 'currentIndex') {
    type = 'text';
    isTrueSet = true;
  }
  if ('Instances Allowed'.toLowerCase() == label.toLowerCase()) {
    return <div></div>;
  }
  const { Option } = Select;
  // const [imageUrl, setimageUrl] = useState(false);

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleChange = async (info) => {
    if (get(info, 'file.originFileObj', null)) {
      setloading(true);
      if (!info.file.url) {
        info.file.preview = await getBase64(info.file.originFileObj);
      }
      setFieldsValue({ [label]: info.file.preview });
      setImageUrl(info.file.preview);
      setloading(false);
    }
  };

  switch (type) {
    case COMPONENT_TYPES.TEXT:
      return (
        <Form.Item
          label={label}
          name={label}
          rules={[
            {
              pattern: pattern,
              message: 'Not a valid'
            },
            { required: mandatory === 'true' && label !== 'userId', message: 'Please enter text!' }
          ]}
          initialValue={value.toString()}
          hidden={isTrueSet}>
          <Input placeholder='' type='text' value={value} />
        </Form.Item>
      );
    case COMPONENT_TYPES.TEXT_AREA:
      return (
        <Form.Item
          label={label}
          name={label}
          rules={[
            {
              pattern: pattern,
              message: 'Not a valid'
            },
            { required: mandatory === 'true' && label !== 'userId', message: 'Please enter text!' }
          ]}
          initialValue={value.toString()}
          hidden={isTrueSet}>
          <Input.TextArea placeholder='' type='text' value={value} />
        </Form.Item>
      );
    case COMPONENT_TYPES.RADIO:
      return (
        <Form.Item
          label={label}
          name={label}
          rules={[{ required: mandatory === 'true', message: 'Please select' }]}
          initialValue={value}>
          <Radio.Group options={options || []} value={value} buttonStyle='solid' />
        </Form.Item>
      );

    case COMPONENT_TYPES.LIST:
      return (
        <Form.Item
          label={label}
          name={label}
          hidden={isTrueSet}
          rules={[{ required: mandatory === 'true', message: 'Please select' }]}
          initialValue={value}>
          <Select placeholder={'Select a ' + label} size='large'>
            {(options || []).map((val, i) => (
              <Option key={i} value={val}>
                {val}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );

    case COMPONENT_TYPES.CHECKBOX:
      // const options = [
      //   { label: 'Apple', value: 'Apple' },
      //   { label: 'Pear', value: 'Pear' },
      //   { label: 'Orange', value: 'Orange' },
      // ];
      return (
        <Form.Item
          name={label}
          label={label}
          hidden={isTrueSet}
          rules={[{ required: mandatory === 'true', message: 'Please select' }]}
          initialValue={value}>
          <Checkbox.Group options={options} defaultValue={value} />
        </Form.Item>
      );

    case COMPONENT_TYPES.DATE:
      return (
        <Form.Item
          name={label}
          label={label}
          hidden={isTrueSet}
          rules={[{ required: mandatory === 'true', message: 'Please select date' }]}
          initialValue={value ? moment(value) : moment(new Date())}>
          <DatePicker defaultValue={value ? moment(value) : moment(new Date())} />
        </Form.Item>
      );

    case COMPONENT_TYPES.FILE_UPLOAD:
      return (
        <Form.Item
          name={label}
          label={label}
          hidden={isTrueSet}
          rules={[{ required: false, message: 'Please select image' }]}>
          <Upload
            name='avatar'
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}>
            {imageUrl ? (
              <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
            ) : (
              <Button>Upload</Button>
            )}
          </Upload>
        </Form.Item>
      );
    default:
      return <div></div>;
  }
};
