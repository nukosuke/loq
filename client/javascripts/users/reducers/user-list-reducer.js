'use strict'

import {
  REQUEST_FETCH_USERS,
  RESPONSE_FETCH_USERS
} from '../actions/user-list-actions'

const initialState = {
  users: [],
};

export default function userListReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_FETCH_USERS:
      return Object.assign({}, state, {
        users: []
      })

    case RESPONSE_FETCH_USERS:
      return Object.assign({}, state, {
        users: action.users,
      })

    default:
      return state;
  }
}
