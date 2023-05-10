import {
  //
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_LOGIN_RESPONSE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  //
  ADD_USER_START,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  //
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from './user.types';

const initialState = {
  loading: false,
  users: [],
  error: null,
  loginResponse: [],
  // isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // UPDATE_USER
    case UPDATE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        // users: state.users,
        error: action.payload,
      };
    // DELETE_USER
    case DELETE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        // users: state.users.filter(user => user.userId !== action.payload.userId),
        error: null,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        // users: state.users,
        error: action.payload,
      };
    // ADD_USER
    case ADD_USER_START:
      return {
        ...state,
        loading: true,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // FETCH_USERS
    case FETCH_USER_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };

    // FETCH_LOGIN_RESPONSE
    case FETCH_LOGIN_RESPONSE:
      return {
        ...state,
        loading: false,
        loginResponse: action.payload,
        error: null,
      };

    // LOGIN
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        error: '',
        // isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginResponse: action.payload,
        error: '',
        // isLoggedIn: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loginResponse: [],
        error: action.payload,
        // isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
