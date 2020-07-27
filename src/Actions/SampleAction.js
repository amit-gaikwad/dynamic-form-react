import {
  SAMPLE_TEST,
  FETCH_RESOURCES_BY_NAMESPACE_SUCCESS,
  FETCH_RESOURCES_BY_NAMESPACE_ERROR,
  FETCH_RESOURCES_BY_NAMESPACE_LOADING
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
  debugger;
  return (dispatch) => {
    dispatch(fetchResourcesByNamespaceLoading());
    debugger;
    Axios.get(`http://localhost:8105/mentor/resources/template/5f1f0c2b91f3775dd4c991a5`)
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
