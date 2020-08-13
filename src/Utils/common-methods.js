import { get } from 'lodash';

export const isAccessTokenAvailable = () => !!localStorage.getItem('tokens');
export const setAccessToken = (token) => localStorage.setItem('tokens', token);
export const getAccessToken = () => localStorage.getItem('tokens') || {};
export const clearAccessToken = () => localStorage.removeItem('tokens');

export const getHeaders = () => ({
  common: {
    Authorization: `Bearer ${JSON.parse(getAccessToken()).access_token}`
  }
});

export const getFieldsFromAttributeModels = (attributeArr = []) => {
  var fields = [];
  attributeArr.forEach((element) => {
    const field = {};
    field.label = get(element, 'attribute.keyName');
    field.value = get(element, 'attribute.keyValue');
    (element.metaData || []).forEach((meta) => {
      field[meta.keyName] = meta.keyValue;
    });
    fields.push(field);
  });
  return fields;
};

export const getFieldsValueFromAtributes = (attributeArr = []) => {
  var fields = {};
  attributeArr.forEach((element) => {
    // const field = {};
    const label = get(element, 'attribute.keyName');
    const value = get(element, 'attribute.keyValue');
    // (element.metaData || []).forEach((meta) => {
    //   field[meta.keyName] = meta.keyValue;
    // });
    fields[label] = value;
  });
  return fields;
};
