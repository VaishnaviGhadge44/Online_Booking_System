import {
  //
  FETCH_ROLES_START,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_FAILURE,
} from './role.types';

const initialState = {
  loading: false,
  roles: [],
  error: '',
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROLES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ROLES_SUCCESS:
      return {
        loading: false,
        roles: action.payload,
        error: '',
      };
    case FETCH_ROLES_FAILURE:
      return {
        loading: false,
        roles: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default roleReducer;
