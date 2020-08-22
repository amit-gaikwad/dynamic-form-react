import {
  FETCH_RESOURCES_BY_NAMESPACE_SUCCESS,
  FETCH_RESOURCES_BY_NAMESPACE_ERROR,
  FETCH_RESOURCES_BY_NAMESPACE_LOADING,
  CREATE_RESOURCE_SUCCESS,
  CREATE_RESOURCE_LOADING,
  CREATE_RESOURCE_ERROR,
  FETCH_RESOURCES_BY_USER_ID_LOADING,
  FETCH_RESOURCES_BY_USER_ID_SUCCESS,
  FETCH_RESOURCES_BY_USER_ID_ERROR,
  FETCH_PERSONAL_DETAILS_BY_USER_ID_LOADING,
  FETCH_PERSONAL_DETAILS_BY_USER_ID_SUCCESS,
  FETCH_PERSONAL_DETAILS_BY_USER_ID_ERROR
} from '../Actions/types';

const initialState = {
  loading: false,
  error: null,
  templateResources: [],
  createResource: {},
  createReourceLoading: false,
  createReourceError: null,
  resourcesByUserId: [],
  resourcesByUserIdLoading: false,
  resourcesByUserIdError: null,
  personalDetailsByUserId: [],
  personalDetailsByUserIdLoading: false,
  personalDetailsByUserIdError: null
};

export const resources = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCES_BY_NAMESPACE_SUCCESS:
      return {
        ...state,
        templateResources: action.payload,
        loading: false,
        error: null
      };

    case FETCH_RESOURCES_BY_NAMESPACE_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_RESOURCES_BY_NAMESPACE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    case CREATE_RESOURCE_SUCCESS:
      return {
        ...state,
        createResource: action.payload,
        createReourceLoading: false,
        createReourceError: null
      };

    case CREATE_RESOURCE_LOADING:
      return {
        ...state,
        createReourceLoading: true,
        createReourceError: null
      };

    case CREATE_RESOURCE_ERROR:
      return {
        ...state,
        createReourceError: action.error,
        createReourceLoading: false
      };
    case FETCH_RESOURCES_BY_USER_ID_SUCCESS:
      return {
        ...state,
        resourcesByUserId: action.payload,
        resourcesByUserIdLoading: false,
        resourcesByUserIdError: null
      };

    case FETCH_RESOURCES_BY_USER_ID_LOADING:
      return {
        ...state,
        resourcesByUserIdLoading: true,
        resourcesByUserIdError: null
      };

    case FETCH_RESOURCES_BY_USER_ID_ERROR:
      return {
        ...state,
        resourcesByUserIdError: action.error,
        resourcesByUserIdError: null
      };

    case FETCH_PERSONAL_DETAILS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        personalDetailsByUserId: action.payload,
        personalDetailsByUserIdLoading: false,
        personalDetailsByUserIdError: null
      };

    case FETCH_PERSONAL_DETAILS_BY_USER_ID_LOADING:
      return {
        ...state,
        personalDetailsByUserIdLoading: true,
        personalDetailsByUserIdError: null
      };

    case FETCH_PERSONAL_DETAILS_BY_USER_ID_ERROR:
      return {
        ...state,
        personalDetailsByUserIdError: action.error,
        personalDetailsByUserIdLoading: false
      };
    default:
      return state;
  }
};
