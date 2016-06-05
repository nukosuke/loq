'use strict';
import 'whatwg-fetch';

export const REQUEST_USER_PROFILE   = 'REQUEST_USER_PROFILE';
export const RESPONSE_USER_PROFILE  = 'RESPONSE_USER_PROFILE';
export const REQUEST_FOLLOW_USER    = 'REQUEST_FOLLOW_USER';
export const RESPONSE_FOLLOW_USER   = 'RESPONSE_FOLLOW_USER';
export const REQUEST_UNFOLLOW_USER  = 'REQUEST_UNFOLLOW_USER';
export const RESPONSE_UNFOLLOW_USER = 'RESPONSE_UNFOLLOW_USER';

export function requestUserProfile() {
  return {
    type: REQUEST_USER_PROFILE,
  };
}

export function responseUserProfile(response) {
  return {
    type: RESPONSE_USER_PROFILE,
    response
  };
}

export function requestFollowUser() {
  return {
    type: REQUEST_FOLLOW_USER,
  };
}

export function responseFollowUser(response) {
  return {
    type: RESPONSE_FOLLOW_USER,
    response
  };
}

//TODO: merge to requestFollowUser { mode:'unfollow' }
export function requestUnfollowUser() {
  return {
    type: REQUEST_FOLLOW_USER,
  };
}

export function responseUnfollowUser(response) {
  return {
    type: RESPONSE_FOLLOW_USER,
    response
  };
}

export function fetchUserProfile(uid) {
  return (dispatch) => {
    dispatch(requestUserProfile());

    fetch(`${window.CONSTANTS.API}/users/${uid}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(json => dispatch(responseUserProfile(json)));
  }
}

export function followUser(id) {
  return (dispatch) => {
    dispatch(requestFollowUser());

    fetch(`${window.CONSTANTS.API}/users/following/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(json => dispatch(responseFollowUser(json)));
  }
}

export function unfollowUser(id) {
  return (dispatch) => {
    dispatch(requestUnfollowUser());

    fetch(`${window.CONSTANTS.API}/users/following/`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(json => dispatch(responseUnollowUser(json)));
  }
}
