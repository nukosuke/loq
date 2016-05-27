'use strict'

import 'whatwg-fetch'

export const REQUEST_FETCH_USERS  = 'REQUEST_FETCH_USERS'
export const RESPONSE_FETCH_USERS = 'RESPONSE_FETCH_USERS'

/**
 * action creators
 */
export function requestFetchUsers() {
  return {
    type: REQUEST_FETCH_USERS,
  };
}

export function responseFetchUsers(users) {
  return {
    type: RESPONSE_FETCH_USERS,
    users,
  };
}

/**
 * thunk creators
 */
export function fetchUsers(jwt, options) {
  return (dispatch) => {
    dispatch(requestFetchUsers());

    fetch('/api/users/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${jwt}`,
      }
    })
    .then(response => response.json())
    .then(json => json.users)
    .then(users => dispatch(responseFetchUsers(users)));
  }
}
