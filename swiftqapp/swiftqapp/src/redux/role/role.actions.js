// this below code is just an example to refer, we can delete it once we push some other files
import axios from 'axios';
import {
  //
  FETCH_ROLES_START,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_FAILURE,
} from './role.types';

export const fetchRolesStart = () => {
  return {
    type: FETCH_ROLES_START,
  };
};

export const fetchRolesSuccess = roles => {
  return {
    type: FETCH_ROLES_SUCCESS,
    payload: roles,
  };
};

export const fetchRolesFailure = error => {
  return {
    type: FETCH_ROLES_FAILURE,
    payload: error,
  };
};

export const fetchRolesDetails = () => {
  return dispatch => {
    dispatch(fetchRolesStart());
    axios
      .get(`${process.env.REACT_APP_SIGNAL_APIURL}/get-role-config`)
      .then(response => {
        // response.data is the roles
        const roles = response.data;
        dispatch(fetchRolesSuccess(roles));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchRolesFailure(error.message));
      });
  };
};
export const updateRole = (userId, body) => {
  return async dispatch => {
    // dispatch(updateUserStart()); // BUG
    const res = await axios
      .patch(`${process.env.REACT_APP_SIGNAL_APIURL}/role-config`, body)
      .then(response => {
        dispatch(fetchRolesDetails());
        // if (response.data.status === 200) {
        //   const users = response?.data.data;
        //   successToast("Successfully Created Caveats");
        //   dispatch(updateUserSuccess(caveats));
        //   return 200;
        // }
      })
      .catch(error => {
        if (error.response) {
          // errorToast(error?.response?.data?.error); // BUG
        }
        // dispatch(updateUserFailure(error.message));
        return 400;
      });
    return res;
  };
};
