import Axios from 'axios';
import {
  FETCH_NOTIFICATION_BY_USER_ID_LOADING,
  FETCH_NOTIFICATION_BY_USER_ID_SUCCESS,
  FETCH_NOTIFICATION_BY_USER_ID_ERROR
} from './types';

export function fetchNotificationsByUserIdLoading() {
  return {
    type: FETCH_NOTIFICATION_BY_USER_ID_LOADING
  };
}

export function fetchNotificationsByUserIdSuccess(value) {
  return {
    type: FETCH_NOTIFICATION_BY_USER_ID_SUCCESS,
    payload: value
  };
}
export function fetchNotificationsByUserIdError(error) {
  return {
    type: FETCH_NOTIFICATION_BY_USER_ID_ERROR,
    error
  };
}

const data = [
  {
    resourceId: '5f23147b261fa16b6cb07b85',
    resourceName: 'Personal Details',
    namespaceId: '5f1f0c2b91f3775dd4c991a5',
    attributes: [
      {
        attribute: { keyName: 'userId', keyValue: 'amit1' },
        metaData: [
          { keyName: 'hidden', keyValue: 'true' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'false' }
        ]
      },
      {
        attribute: { keyName: 'Salutation', keyValue: 'Mrs' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'false' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'First Name', keyValue: 'Amit balasaheb' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'Last Name', keyValue: 'Patil' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'Preferred Name', keyValue: 'AP' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'Photo', keyValue: '' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'fileUpload' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      { attribute: { keyName: 'currentIndex', keyValue: '1' }, metaData: null }
    ]
  },
  {
    resourceId: '5f270aa4e042d5499c5ee765',
    resourceName: 'Personal Details',
    namespaceId: '5f1f0c2b91f3775dd4c991a5',
    attributes: [
      {
        attribute: { keyName: 'userId', keyValue: 'amol' },
        metaData: [
          { keyName: 'hidden', keyValue: 'true' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'false' }
        ]
      },
      { attribute: { keyName: 'currentIndex', keyValue: '1' }, metaData: null },
      {
        attribute: { keyName: 'Salutation', keyValue: 'MR' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'false' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'First Name', keyValue: 'Amol B.' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'Last Name', keyValue: 'Jadhav' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'Preferred Name', keyValue: 'AmolJ' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'Photo', keyValue: '' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'fileUpload' },
          { keyName: 'index', keyValue: '1' }
        ]
      }
    ]
  },
  {
    resourceId: '5f22deb2261fa16b6cb07b81',
    resourceName: 'Personal Details',
    namespaceId: '5f1f0c2b91f3775dd4c991a5',
    attributes: [
      {
        attribute: { keyName: 'userId', keyValue: 'amitId' },
        metaData: [
          { keyName: 'hidden', keyValue: 'true' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'false' }
        ]
      },
      { attribute: { keyName: 'currentIndex', keyValue: '1' }, metaData: null },
      {
        attribute: { keyName: 'userId', keyValue: 'amitId' },
        metaData: [
          { keyName: 'hidden', keyValue: 'true' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'false' }
        ]
      },
      { attribute: { keyName: 'currentIndex', keyValue: '1' }, metaData: null },
      {
        attribute: { keyName: 'userId', keyValue: 'amitId' },
        metaData: [
          { keyName: 'hidden', keyValue: 'true' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'false' }
        ]
      },
      { attribute: { keyName: 'currentIndex', keyValue: '1' }, metaData: null },
      {
        attribute: { keyName: 'userId', keyValue: 'amitId' },
        metaData: [
          { keyName: 'hidden', keyValue: 'true' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'false' }
        ]
      },
      { attribute: { keyName: 'currentIndex', keyValue: '1' }, metaData: null },
      {
        attribute: { keyName: 'userId', keyValue: 'amitId' },
        metaData: [
          { keyName: 'hidden', keyValue: 'true' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'false' }
        ]
      },
      { attribute: { keyName: 'currentIndex', keyValue: '1' }, metaData: null },
      {
        attribute: { keyName: 'userId', keyValue: 'amitId' },
        metaData: [
          { keyName: 'hidden', keyValue: 'true' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'false' }
        ]
      },
      {
        attribute: { keyName: 'Salutation', keyValue: 'Mrs' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'false' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'First Name', keyValue: 'Amit balasaheb' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'Last Name', keyValue: 'Gaikwad' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'Preferred Name', keyValue: 'Amit Gaikwad' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'Photo', keyValue: '' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'fileUpload' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      { attribute: { keyName: 'currentIndex', keyValue: '1' }, metaData: null }
    ]
  },
  {
    resourceId: '5f270bcfc373cb2b1494524f',
    resourceName: 'Personal Details',
    namespaceId: '5f1f0c2b91f3775dd4c991a5',
    attributes: [
      {
        attribute: { keyName: 'userId', keyValue: 'atul' },
        metaData: [
          { keyName: 'hidden', keyValue: 'true' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'false' }
        ]
      },
      {
        attribute: { keyName: 'Salutation', keyValue: 'Mr' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'false' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'First Name', keyValue: 'Atul' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'Last Name', keyValue: 'Mane' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'Preferred Name', keyValue: 'Ati' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'Photo', keyValue: '' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'fileUpload' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      { attribute: { keyName: 'currentIndex', keyValue: '1' }, metaData: null }
    ]
  },
  {
    resourceId: '5f293b7f9950957c488a2a88',
    resourceName: 'Personal Details',
    namespaceId: '5f1f0c2b91f3775dd4c991a5',
    attributes: [
      {
        attribute: { keyName: 'userId', keyValue: 'ashok' },
        metaData: [
          { keyName: 'hidden', keyValue: 'true' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'false' }
        ]
      },
      {
        attribute: { keyName: 'Salutation', keyValue: 'Mr' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'false' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'First Name', keyValue: 'Ashok' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'Last Name', keyValue: 'Mane' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'Preferred Name', keyValue: 'AM' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'text' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      {
        attribute: { keyName: 'Photo', keyValue: '' },
        metaData: [
          { keyName: 'hidden', keyValue: 'false' },
          { keyName: 'mandatory', keyValue: 'true' },
          { keyName: 'editable', keyValue: 'true' },
          { keyName: 'type', keyValue: 'fileUpload' },
          { keyName: 'index', keyValue: '1' }
        ]
      },
      { attribute: { keyName: 'currentIndex', keyValue: '1' }, metaData: null }
    ]
  }
];
export const fetchNotificationsByUserId = (userId) => {
  return (dispatch) => {
    dispatch(fetchNotificationsByUserIdLoading());
    Axios.get(
      `http://localhost:8106/mentor/notifications/requests/userProfiles/5f1f0c2b91f3775dd4c991a5/${userId}`
    )
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchNotificationsByUserIdSuccess(data)); //res.data));
        return res;
      })
      .catch((error) => {
        dispatch(fetchNotificationsByUserIdError(error));
      });
  };
};
