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
  personalDetailsByUserIdError: null,
  postTemplate: [],
  postTemplateLoading: false,
  postTemplateError: null,
  postsByUserId: [],
  postsByUserIdLoading: false,
  postsByUserIdError: null,
  systemTemplates: [],
  systemTemplatesLoading: false,
  systemTemplatesError: null
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

    case FETCH_POST_TEMPLATE_SUCCESS:
      return {
        ...state,
        postTemplate: action.payload,
        postTemplateLoading: false,
        postTemplateError: null
      };

    case FETCH_POST_TEMPLATE_LOADING:
      return {
        ...state,
        postTemplateLoading: true,
        postTemplateError: null
      };

    case FETCH_POST_TEMPLATE_ERROR:
      return {
        ...state,
        postTemplateError: action.error,
        postTemplateLoading: false
      };

    case FETCH_POSTS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        postsByUserId: action.payload,
        postsByUserIdLoading: false,
        postsByUserIdError: null
      };

    case FETCH_POSTS_BY_USER_ID_LOADING:
      return {
        ...state,
        postsByUserIdLoading: true,
        postsByUserIdError: null
      };

    case FETCH_SYSTEM_TEMPLATES_ERROR:
      return {
        ...state,
        systemTemplatesError: action.error,
        systemTemplatesLoading: false
      };
    case FETCH_SYSTEM_TEMPLATES_SUCCESS:
      return {
        ...state,
        systemTemplates: action.payload,
        systemTemplatesLoading: false,
        systemTemplatesError: null
      };

    case FETCH_SYSTEM_TEMPLATES_LOADING:
      return {
        ...state,
        systemTemplatesLoading: true,
        systemTemplatesError: null
      };

    case FETCH_POSTS_BY_USER_ID_ERROR:
      return {
        ...state,
        postsByUserIdError: action.error,
        postsByUserIdLoading: false
      };
    default:
      return state;
  }
};
