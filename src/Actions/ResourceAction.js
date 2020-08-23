import {
  SAMPLE_TEST,
  FETCH_RESOURCES_BY_NAMESPACE_SUCCESS,
  FETCH_RESOURCES_BY_NAMESPACE_ERROR,
  FETCH_RESOURCES_BY_NAMESPACE_LOADING,
  CREATE_RESOURCE_SUCCESS,
  CREATE_RESOURCE_ERROR,
  CREATE_RESOURCE_LOADING,
  UPDATE_RESOURCE_BY_USER_ID_SUCCESS,
  UPDATE_RESOURCE_BY_USER_ID_ERROR,
  UPDATE_RESOURCE_BY_USER_ID_LOADING,
  FETCH_RESOURCES_BY_USER_ID_LOADING,
  FETCH_RESOURCES_BY_USER_ID_SUCCESS,
  FETCH_RESOURCES_BY_USER_ID_ERROR,
  FETCH_PERSONAL_DETAILS_BY_USER_ID_LOADING,
  FETCH_PERSONAL_DETAILS_BY_USER_ID_SUCCESS,
  FETCH_PERSONAL_DETAILS_BY_USER_ID_ERROR
} from './types';
import Axios from 'axios';
import { getHeaders } from '../Utils/common-methods';

export function setSampleTest(value) {
  return {
    type: SAMPLE_TEST,
    payload: value
  };
}

export function fetchResourcesByNamespaceLoading() {
  return {
    type: FETCH_RESOURCES_BY_NAMESPACE_LOADING
  };
}

export function fetchResourcesByNamespaceSuccess(value) {
  return {
    type: FETCH_RESOURCES_BY_NAMESPACE_SUCCESS,
    payload: value
  };
}
export function fetchResourcesByNamespaceError(error) {
  return {
    type: FETCH_RESOURCES_BY_NAMESPACE_ERROR,
    error
  };
}

export const fetchResources = () => {
  return (dispatch) => {
    dispatch(fetchResourcesByNamespaceLoading());
    Axios.get(`http://localhost:8105/mentor/resources/template/5f420797fc99e13c8cf8d145`)
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchResourcesByNamespaceSuccess(res.data));
        return res;
      })
      .catch((error) => {
        dispatch(fetchResourcesByNamespaceError(error));
      });
  };
};

export function fetchResourcesByUserIdLoading() {
  return {
    type: FETCH_RESOURCES_BY_USER_ID_LOADING
  };
}

export function fetchResourcesByUserIdSuccess(value) {
  return {
    type: FETCH_RESOURCES_BY_USER_ID_SUCCESS,
    payload: value
  };
}
export function fetchResourcesByUserIdError(error) {
  return {
    type: FETCH_RESOURCES_BY_USER_ID_ERROR,
    error
  };
}

export const fetchResourcesByUserId = (userId) => {
  return (dispatch) => {
    dispatch(fetchResourcesByUserIdLoading());
    Axios.get(`http://localhost:8105/mentor/resources/user/5f420797fc99e13c8cf8d145/` + userId)
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchResourcesByUserIdSuccess(res.data));
        return res;
      })
      .catch((error) => {
        dispatch(fetchResourcesByUserIdError(error));
      });
  };
};

export function createUserResourceLoading() {
  return {
    type: CREATE_RESOURCE_LOADING
  };
}

export function createUserResourceSuccess(value) {
  return {
    type: CREATE_RESOURCE_SUCCESS,
    payload: value
  };
}
export function createUserResourceError(error) {
  return {
    type: CREATE_RESOURCE_ERROR,
    error
  };
}

export const createResource = (resource, userId) => {
  return (dispatch) => {
    dispatch(createUserResourceLoading());
    return Axios.post(`http://localhost:8105/mentor/resources/addAttribute`, resource, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site'
      }
    })
      .then((res) => {
        if (res.error) {
          throw res.error;
        }

        dispatch(fetchResourcesByUserId(userId));
        dispatch(createUserResourceSuccess(res.data));
        return res;
      })
      .catch((error) => {
        dispatch(createUserResourceError(error));
      });
  };
};

export function updateResourceByUserIdLoading() {
  return {
    type: UPDATE_RESOURCE_BY_USER_ID_LOADING
  };
}

export function updateResourceByUserIdSuccess(value) {
  return {
    type: UPDATE_RESOURCE_BY_USER_ID_SUCCESS,
    payload: value
  };
}
export function updateResourceByUserIdError(error) {
  return {
    type: UPDATE_RESOURCE_BY_USER_ID_ERROR,
    error
  };
}

export const updateResourceByUserId = (resource, userId) => {
  return (dispatch) => {
    dispatch(updateResourceByUserIdLoading());
    return Axios.post(
      `http://localhost:8105/mentor/resources/operationsOnResourceAttribute`,
      resource,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site'
        }
      }
    )
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchResourcesByUserId(userId));
        dispatch(updateResourceByUserIdSuccess(res.data));
        return res;
      })
      .catch((error) => {
        dispatch(updateResourceByUserIdError(error));
      });
  };
};

export function fetchPersonalDetailsByUserIdLoading() {
  return {
    type: FETCH_PERSONAL_DETAILS_BY_USER_ID_LOADING
  };
}

export function fetchPersonalDetailsByUserIdSuccess(value) {
  return {
    type: FETCH_PERSONAL_DETAILS_BY_USER_ID_SUCCESS,
    payload: value
  };
}
export function fetchPersonalDetailsByUserIdError(error) {
  return {
    type: FETCH_PERSONAL_DETAILS_BY_USER_ID_ERROR,
    error
  };
}

export const fetchPersonalDetailsByUserId = (userId) => {
  return (dispatch) => {
    dispatch(fetchPersonalDetailsByUserIdLoading());
    Axios.get(
      `http://localhost:8105/mentor/resources/user/5f420797fc99e13c8cf8d145/` +
        userId +
        '/Personal Details'
    )
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchPersonalDetailsByUserIdSuccess(res.data));
        return res;
      })
      .catch((error) => {
        dispatch(fetchPersonalDetailsByUserIdError(error));
      });
  };
};
//http://localhost:8105/mentor/resources/user/5f420797fc99e13c8cf8d145/rohan/Personal%20Details
