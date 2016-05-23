/**
 * authenticate actions
 */
'use strict';
import 'whatwg-fetch'

export const REQUEST_SIGN_IN   = 'REQUEST_SIGN_IN'
export const RESPONSE_SIGN_IN  = 'RESPONSE_SIGN_IN'
export const REQUEST_SIGN_OUT  = 'REQUEST_SIGN_OUT'
export const RESPONSE_SIGN_OUT = 'RESPONSE_SIGN_OUT'

/**
 * action creators
 */
export function requestSignIn() {
  return {
    type: REQUEST_SIGN_IN,
  }
}

export function responseSignIn(response) {
  return {
    type: RESPONSE_SIGN_IN,
    response
  }
}

export function requestSignOut() {
  return {
    type: REQUEST_SIGN_OUT,
  }
}

export function responseSignOut(response) {
  return {
    type: RESPONSE_SIGN_OUT,
    response
  }
}

/**
 * thunk creators
 * asyncronous request for authentication
 */
export function signIn(identifier, password) {
  return (dispatch) => {
    dispatch(requestSignIn())

    return fetch('/authenticate/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier, password,
      }),
    })
    .then(response => response.json())
    .then(json => dispatch(responseSignIn(json)))
    //TODO: store JWT in localStorage
    // and redirect to logined page
  }
}

export function signOut(JWT) {
  return (dispatch) => {
    dispatch(requestSignOut())

    return fetch('/authenticate/token/destroy', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ JWT }),
    })
    .then(response => response.json())
    .then(json => dispatch(responseSignOut(json)))
  }
}
