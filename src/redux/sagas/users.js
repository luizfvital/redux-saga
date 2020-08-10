import {takeEvery, takeLatest, take, call, fork, put} from 'redux-saga/effects';

import * as actions from '../actions/users';
import api from '../../api/api';

function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(actions.getUsersSuccess({
      items: result.data
    }));
    
  } catch (error) {
    console.log(error);
    yield put(actions.usersError({
      error: 'An error occurred when trying to get the users.'
    }));
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* createUser(action) {
  const {firstName, lastName} = action.payload;

  try {
    yield call(api.createUser, {firstName, lastName});
    yield call(getUsers);

  } catch (error) {
    console.log(error);
    yield put(actions.usersError({
      error: 'An error occurred when trying to create the user.'
    }));
  }
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* deleteUser({userId}) {
  try {
    yield call(api.deleteUser, userId);
    yield call(getUsers);

  } catch (error) {
    console.log(error);
    yield put(actions.usersError({
      error: 'An error occurred when trying to delete the user.'
    }));
  }
}

function* watchDeleteUserRequest() {
  while(true) {
    const action = yield take(actions.Types.DELETE_USER_REQUEST);
    yield call(deleteUser, {userId: action.payload.userId});
  }
}

const usersSagas = [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest)
];

export default usersSagas;