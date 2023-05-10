// this below code is just an example to refer, we can delete it once we push some other files

import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
// import signalProjectListReducer from './signal-project-list/signal-project-list.reducer';
import roleDetailsReducer from './role/role.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  // roleDetails: roleDetailsReducer,
});

export default rootReducer;
