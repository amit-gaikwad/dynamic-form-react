import React from "react";
import { COMPONENT_TYPES } from "../Constants/ComponentTypes";
import {  Input, Radio, List, Checkbox, DatePicker, Upload } from "antd";
import moment from "moment";


export const getRenderableComponentByType =({type,value,options})=>{
  switch (type) {
    case COMPONENT_TYPES.TEXT:
      return <Input value={value}/>;
    case COMPONENT_TYPES.RADIO:
      return  <Radio.Group
                options={options || []}
                value={value}
                optionType="button"
                buttonStyle="solid"
              />;

    case COMPONENT_TYPES.LIST:
      return <List
            size="large"
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={options || []}
            renderItem={item => <List.Item>{item}</List.Item>}
          />;

    case COMPONENT_TYPES.CHECKBOX:
      // const options = [
      //   { label: 'Apple', value: 'Apple' },
      //   { label: 'Pear', value: 'Pear' },
      //   { label: 'Orange', value: 'Orange' },
      // ];
      return  <Checkbox.Group 
                options={options} 
                defaultValue={['Pear']} 
                //onChange={onChange} 
                />;

    case COMPONENT_TYPES.DATE : 
        return <DatePicker defaultValue={moment('2015/01/01', 'YYYY/MM/DD')} />            
    
    case COMPONENT_TYPES.FILE_UPLOAD :
        return <Upload />;    
    
    default:
      return <Input />;
  }
}