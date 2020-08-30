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
  FETCH_PERSONAL_DETAILS_BY_USER_ID_ERROR,
  FETCH_POST_TEMPLATE_LOADING,
  FETCH_POST_TEMPLATE_SUCCESS,
  FETCH_POST_TEMPLATE_ERROR,
  FETCH_POSTS_BY_USER_ID_LOADING,
  FETCH_POSTS_BY_USER_ID_SUCCESS,
  FETCH_POSTS_BY_USER_ID_ERROR,
  FETCH_SYSTEM_TEMPLATES_LOADING,
  FETCH_SYSTEM_TEMPLATES_ERROR,
  FETCH_SYSTEM_TEMPLATES_SUCCESS
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

export const createResource = (resource, userId, fromWhichPage) => {
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
        if (fromWhichPage === 'Home') {
          dispatch(fetchPostsByUserId(userId));
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

export const updateResourceByUserId = (resource, userId, fromWhichPage) => {
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
        if (fromWhichPage === 'Home') {
          dispatch(fetchPostsByUserId(userId));
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

export function fetchPostTemplateLoading() {
  return {
    type: FETCH_POST_TEMPLATE_LOADING
  };
}

export function fetchPostTemplateSuccess(value) {
  return {
    type: FETCH_POST_TEMPLATE_SUCCESS,
    payload: value
  };
}
export function fetchPostTemplateError(error) {
  return {
    type: FETCH_POST_TEMPLATE_ERROR,
    error
  };
}

//http://localhost:8105/mentor/resources/5f420797fc99e13c8cf8d145/5f425826fc99e14d20f20476

export const fetchPostTemplate = () => {
  return (dispatch) => {
    dispatch(fetchPostTemplateLoading());
    fetchResourcesById('5f425826fc99e14d20f20476')
      .then((res) => {
        dispatch(fetchPostTemplateSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchPostTemplateError(error));
      });
  };
};

const fetchResourcesById = (id) => {
  return Axios.get(`http://localhost:8105/mentor/resources/5f420797fc99e13c8cf8d145/${id}`).then(
    (res) => {
      if (res.error) {
        throw res.error;
      }
      return res;
    }
  );
};

export function fetchSystemTemplatesLoading() {
  return {
    type: FETCH_SYSTEM_TEMPLATES_LOADING
  };
}

export function fetchSystemTemplatesSuccess(value) {
  return {
    type: FETCH_SYSTEM_TEMPLATES_SUCCESS,
    payload: value
  };
}
export function fetchSystemTemplatesError(error) {
  return {
    type: FETCH_SYSTEM_TEMPLATES_ERROR,
    error
  };
}

//http://localhost:8105/mentor/resources/5f420797fc99e13c8cf8d145/5f425826fc99e14d20f20476

export const fetchSystemTemplates = () => {
  return (dispatch) => {
    dispatch(fetchSystemTemplatesLoading());
    fetchResourcesById('5f420a53fc99e14d20f20460')
      .then((res) => {
        dispatch(fetchSystemTemplatesSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchSystemTemplatesError(error));
      });
  };
};

//http://localhost:8105/mentor/resources/user/5f420797fc99e13c8cf8d145/rohan/Personal%20Details

export function fetchPostsByUserIdLoading() {
  return {
    type: FETCH_POSTS_BY_USER_ID_LOADING
  };
}

export function fetchPostsByUserIdSuccess(value) {
  return {
    type: FETCH_POSTS_BY_USER_ID_SUCCESS,
    payload: value
  };
}
export function fetchPostsByUserIdError(error) {
  return {
    type: FETCH_POSTS_BY_USER_ID_ERROR,
    error
  };
}

//http://localhost:8105/mentor/resources/5f420797fc99e13c8cf8d145/5f425826fc99e14d20f20476
//http://localhost:8105/mentor/resources/user/5f420797fc99e13c8cf8d145/rohan1232/Post%20Details

export const fetchPostsByUserId = (userId) => {
  return (dispatch) => {
    dispatch(fetchPostsByUserIdLoading());
    Axios.get(
      `http://localhost:8105/mentor/resources/user/5f420797fc99e13c8cf8d145/${userId}/Post Details`
    )
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchPostsByUserIdSuccess(res.data));
        return res;
      })
      .catch((error) => {
        dispatch(fetchPostsByUserIdError(error));
      });
  };
};
