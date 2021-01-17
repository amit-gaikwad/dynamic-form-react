import { get, includes } from 'lodash';

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

export const getFieldsValueFromAtributes = (attributeArr = [], keyValues = []) => {
  var fields = {};
  attributeArr.forEach((element) => {
    const label = get(element, 'attribute.keyName');
    const value = includes(keyValues, label)
      ? get(element, 'attribute.keyValues')
      : get(element, 'attribute.keyValue');
    fields[label] = value;
  });
  return fields;
};

export const getUserName = (user) => {
  return `${user['First Name']} ${user['Last Name']}`;
};

export const createBodyOfWorkObject = (data) => {
  const bow = {
    resourceId: '5f9cff07087b160340411293',
    resourceName: 'Post Details',
    namespaceId: '5f420797fc99e13c8cf8d145',
    attributes: [
      {
        attribute: {
          keyName: 'userId',
          keyValue: 'amit'
        },
        metaData: [
          {
            keyName: 'hidden',
            keyValue: 'true'
          },
          {
            keyName: 'mandatory',
            keyValue: 'true'
          },
          {
            keyName: 'editable',
            keyValue: 'false'
          }
        ],
        comments: null
      },
      {
        attribute: {
          keyName: 'currentIndex',
          keyValue: '1'
        },
        metaData: null,
        comments: null
      },
      {
        attribute: {
          keyName: 'User Post',
          keyValue: 'This is post by Amit Gaikwad, this is edited this is also new added'
        },
        metaData: [
          {
            keyName: 'hidden',
            keyValue: 'false'
          },
          {
            keyName: 'type',
            keyValue: 'textArea'
          },
          {
            keyName: 'mandatory',
            keyValue: 'false'
          },
          {
            keyName: 'editable',
            keyValue: 'false'
          },
          {
            keyName: 'likes',
            keyValue: 'amit,rohan,ashok,amit21'
          },
          {
            keyName: 'dislikes',
            keyValue: ''
          },
          {
            keyName: 'index',
            keyValue: '1'
          }
        ],
        comments: null
      }
    ]
  };
};
