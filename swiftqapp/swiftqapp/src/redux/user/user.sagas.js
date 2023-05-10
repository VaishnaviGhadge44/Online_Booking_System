import { takeLatest, put, all, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  //
  FETCH_USERS_START,
  UPDATE_USER_START,
  ADD_USER_START,
  LOGIN_START,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  ADD_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
} from './user.types';
import {
  addUserFailure,
  addUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  //
  fetchUsersFailure,
  fetchUsersSuccess,
  logInFailure,
  logInSuccess,
  updateUserFailure,
  updateUserSuccess,
} from './user.actions';
import { message } from 'antd';
import getHeaders from '../../utils/getHeaders';
import _ from 'lodash';
import { useState } from 'react';

///////////////////////
// ACTION HANDLERS
///////////////////////

export function* fetchUsersAsync() {
  try {
    const res = yield axios.post(
      // USER LIST
      `https://msafety-dev-api.dfoundry.ai/user/list`,
      {},
      { headers: getHeaders() }
    );
    const users = res.data.data;
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}

// TODO FIXME
export function* addUserAsync({ payload: reqBody }) {
  try {
    console.log(reqBody);
    const res = yield axios.post(`https://msafety-dev-api.dfoundry.ai/user/create`, reqBody, { headers: getHeaders() });

    const user = { ...reqBody };
    console.log({ res });
    user.name = `${user.firstName} ${user.lastName}`;

    const key = 'updatable';
    message.success({
      content: `${_.startCase(res?.data?.message)}: ${user.name}`,
      key,
    });

    yield put(addUserSuccess());
  } catch (error) {
    yield put(addUserFailure(error));
  }
}
// TODO FIXME
export function* deleteUserAsync({ payload: reqBody }) {
  try {
    console.log(reqBody);
    const res = yield axios.post(`https://msafety-dev-api.dfoundry.ai/user/delete-user`, reqBody, {
      headers: getHeaders(),
    });

    const user = { ...reqBody };
    console.log({ res });

    const key = 'updatable';
    message.success({ content: res.data.message, key });
    yield put(deleteUserSuccess(user));
  } catch (error) {
    yield put(deleteUserFailure(error));
  }
}

//
//
//

export function* updateUserAsync({ payload: body }) {
  try {
    const key = 'updatable';
    message.loading({
      content: `Updating User: ${body.emailId}`,
      key,
    });
    const res = yield axios.put(`https://msafety-dev-api.dfoundry.ai/user/update`, body, {
      headers: getHeaders(),
    });

    message.success({
      content: `${_.startCase(res?.data?.message)}`,
      key,
    });
    yield put(updateUserSuccess());
  } catch (error) {
    const key = 'updatable';

    message.error({
      content: `${error.message}`,
      key,
    });
    yield put(updateUserFailure(error));
  }
}

// LOGIN

export function* logInAsync({ payload: { email, password } }) {
  try {
    const authRequestBody = {
      emailId: email,
      password: password,
      subdomain: 'msafety-dev',
    };
    const response = yield axios.post(`https://msafety-dev-api.dfoundry.ai/login`, authRequestBody);

    yield localStorage.setItem('isLoggedIn', true);
    yield localStorage.setItem('loginResponse', JSON.stringify({ ...response, password: null }));
    // setFlag(true);

    yield put(logInSuccess(response));
  } catch (error) {
    // setFlag(false);
    message.error('Username & Password do not match');
    yield put(logInFailure(error.message));
  }
}

///////////////////////
// ACTION LISTENERS
///////////////////////

export function* onFetchUsersStart() {
  yield takeLatest(FETCH_USERS_START, fetchUsersAsync);
}
export function* onAddUserStart() {
  yield takeLatest(ADD_USER_START, addUserAsync);
}
export function* onDeleteUserStart() {
  yield takeLatest(DELETE_USER_START, deleteUserAsync);
}
export function* onUpdateUserStart() {
  yield takeLatest(UPDATE_USER_START, updateUserAsync);
}

//////
////// fetchUsersAsync on change
export function* onAddUserSuccess() {
  yield takeLatest(ADD_USER_SUCCESS, fetchUsersAsync);
}
export function* onDeleteUserSuccess() {
  yield takeLatest(DELETE_USER_SUCCESS, fetchUsersAsync);
}
export function* onUpdateUserSuccess() {
  yield takeLatest(UPDATE_USER_SUCCESS, fetchUsersAsync);
}

// not-used
export function* onLogInStart() {
  yield takeLatest(LOGIN_START, logInAsync);
}
// not-used

///////////////////////
// All User Sagas
///////////////////////

export function* userSagas() {
  yield all([
    //
    call(onFetchUsersStart),
    call(onAddUserStart),
    call(onDeleteUserStart),
    call(onUpdateUserStart),
    call(onAddUserSuccess),
    call(onDeleteUserSuccess),
    call(onUpdateUserSuccess),

    call(onLogInStart),
  ]);
}
