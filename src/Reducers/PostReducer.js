import {
  CREATE_POST_LOADING,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  EDIT_POST_LOADING,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  ALL_POST_BY_USER_ID_LOADING,
  ALL_POST_BY_USER_ID_SUCCESS,
  ALL_POST_BY_USER_ID_ERROR
} from '../Actions/types';

const initialState = {
  postDetailsLoading: false,
  postDetailsError: null,
  postDetails: {},
  allPostByUserIdLoading: false,
  allPostByUserIdError: null,
  allPostByUserId: [],
  editPostDetailsLoading: false,
  editPostDetailsError: null
};
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        postDetails: action.payload,
        postDetailsLoading: false,
        postDetailsError: null
      };

    case CREATE_POST_LOADING:
      return {
        ...state,
        postDetailsLoading: true,
        postDetailsError: null
      };

    case CREATE_POST_ERROR:
      return {
        ...state,
        postDetailsError: action.error,
        postDetailsLoading: false
      };

    case ALL_POST_BY_USER_ID_SUCCESS:
      return {
        ...state,
        allPostByUserId: action.payload,
        allPostByUserIdLoading: false,
        allPostByUserIdError: null
      };

    case ALL_POST_BY_USER_ID_LOADING:
      return {
        ...state,
        allPostByUserIdLoading: true,
        allPostByUserIdError: null
      };

    case ALL_POST_BY_USER_ID_ERROR:
      return {
        ...state,
        allPostByUserIdError: action.error,
        allPostByUserIdLoading: false
      };

    case EDIT_POST_SUCCESS:
      return {
        ...state,
        postDetails: action.payload,
        editPostDetailsLoading: false,
        editPostDetailsError: null
      };

    case EDIT_POST_LOADING:
      return {
        ...state,
        editPostDetailsLoading: true,
        editPostDetailsError: null
      };

    case EDIT_POST_ERROR:
      return {
        ...state,
        editPostDetailsError: action.error,
        editPostDetailsLoading: false
      };

    default:
      return state;
  }
};
