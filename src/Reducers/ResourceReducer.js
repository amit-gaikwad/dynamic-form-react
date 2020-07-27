import {
  FETCH_RESOURCES_BY_NAMESPACE_SUCCESS,
  FETCH_RESOURCES_BY_NAMESPACE_ERROR,
  FETCH_RESOURCES_BY_NAMESPACE_LOADING,
  CREATE_RESOURCE_SUCCESS,
  CREATE_RESOURCE_LOADING,
  CREATE_RESOURCE_ERROR
} from '../Actions/types';

const initialState = {
  loading: false,
  error: null,
  templateResources: [],
  createResource: {},
  createReourceLoading: false,
  createReourceError: null
};

export const resources = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCES_BY_NAMESPACE_SUCCESS:
      return {
        ...initialState,
        templateResources: action.payload
      };

    case FETCH_RESOURCES_BY_NAMESPACE_LOADING:
      return {
        ...initialState,
        loading: true
      };

    case FETCH_RESOURCES_BY_NAMESPACE_ERROR:
      return {
        ...initialState,
        error: action.error
      };

    case CREATE_RESOURCE_SUCCESS:
      return {
        ...initialState,
        createResource: action.payload
      };

    case CREATE_RESOURCE_LOADING:
      return {
        ...initialState,
        createReourceLoading: true
      };

    case CREATE_RESOURCE_ERROR:
      return {
        ...initialState,
        createReourceError: action.error
      };
    default:
      return state;
  }
};
