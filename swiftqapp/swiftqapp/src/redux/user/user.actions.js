// this below code is just an example to refer, we can delete it once we push some other files
import axios from 'axios';
import {
  //
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_LOGIN_RESPONSE
} from './user.types';

export const fetchRolesStart = () => {
  return {
    type: FETCH_USER_START,
  };
};

export const fetchRolesSuccess = roles => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: roles,
  };
};

export const fetchRolesFailure = error => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};
export const fetchLoginResponseStart = data => {
  return {
    type: FETCH_LOGIN_RESPONSE,
    payload: data,
  };
};

export const fetchRolesDetails = (data) => {
  return dispatch => {
    dispatch(fetchRolesStart());
    dispatch(fetchRolesSuccess(data));
  };
};


export const fetchLoginResponse = (data) => {
  return dispatch => {
    dispatch(fetchLoginResponseStart(data));
  };
};

// export const getUser = async (username,password) => {
//   username = username || '';
//   return await axios.get(`${url}/users?email_id=${username}&password=${password}`);
// }
