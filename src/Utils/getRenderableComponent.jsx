import React, { useState } from 'react';
import { COMPONENT_TYPES } from '../Constants/ComponentTypes';
import { Input, Radio, Checkbox, DatePicker, Upload, Form, Select, message, Button } from 'antd';
import moment from 'moment';

// type:"upload",value:"",mandatory:true,maxLength:"",minLength:"",pattern:"",options:"", label:""
export const getRenderableComponentByType = ({
  type,
  value,
  options,
  label,
  mandatory,
  maxLength,
  minLength,
  pattern,
  hidden
}) => {
  var isTrueSet = hidden === 'true';
  if (label === 'currentIndex') {
    type = 'text';
    isTrueSet = true;
  }
  const { Option } = Select;
  // const [loading, setloading] = useState(false);
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
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      //setloading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        // setimageUrl(imageUrl);
        // setloading(false);
      });
    }
  };
  console.log('value', value);
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
            { required: mandatory === 'true', message: 'Please enter text!' }
          ]}
          initialValue={value}
          hidden={isTrueSet}>
          <Input placeholder='' type='text' value={value} />
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
          initialValue={moment(value)}>
          <DatePicker defaultValue={moment('2015/01/01', 'YYYY/MM/DD')} />
        </Form.Item>
      );

    case COMPONENT_TYPES.FILE_UPLOAD:
      return (
        <Form.Item
          name={label}
          label={label}
          hidden={isTrueSet}
          rules={[{ required: false, message: 'Please select photo' }]}
          initialValue={value}>
          <Upload
            name='avatar'
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={false}
            //            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            beforeUpload={beforeUpload}
            onChange={handleChange}>
            {value ? (
              <img src={value} alt='avatar' style={{ width: '100%' }} />
            ) : (
              <Button>Upload</Button>
            )}
          </Upload>
        </Form.Item>
      );
  }
};
