import {
  FETCH_USERS_BY_SEARCH_STRING_LOADING,
  FETCH_USERS_BY_SEARCH_STRING_SUCCESS,
  FETCH_USERS_BY_SEARCH_STRING_ERROR
} from '../Actions/types';

const initialState = {
  usersBySearchStringLoading: false,
  usersBySearchStringError: null,
  usersBySearchString: []
};
export const search = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_BY_SEARCH_STRING_SUCCESS:
      return {
        ...state,
        usersBySearchString: action.payload,
        usersBySearchStringLoading: false,
        usersBySearchStringError: null
      };

    case FETCH_USERS_BY_SEARCH_STRING_LOADING:
      return {
        ...state,
        usersBySearchStringLoading: true,
        usersBySearchStringError: null
      };

    case FETCH_USERS_BY_SEARCH_STRING_ERROR:
      return {
        ...state,
        usersBySearchStringError: action.error,
        usersBySearchStringLoading: false
      };
    default:
      return state;
  }
};
