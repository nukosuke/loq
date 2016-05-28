'use strict';

import {
  REQUEST_USER_PROFILE,
  RESPONSE_USER_PROFILE,
  REQUEST_FOLLOW_USER,
  RESPONSE_FOLLOW_USER,
  REQUEST_UNFOLLOW_USER,
  RESPONSE_UNFOLLOW_USER,
} from '../actions/user-profile-actions'


const initialProfileState = {
  loading: false,
  id: '',
  uid: '',
  name: '',
  family_name: '',
  given_name: '',
  bio: '',
  avatar: '',
  url: '',
};

const initialFollowState = {
  loading: false,
  following_number: 0,
  followers_number: 0,
  following: [],
  followers: [],
};

export function userProfileReducer(state = initialProfileState, action) {
  switch (action.type) {
    case REQUEST_USER_PROFILE:
      return Object.assign({}, state, { loading: true });

    case RESPONSE_USER_PROFILE:
      return Object.assign({}, state, action.response.user);

    default:
      return state;
  }
}

export function userFollowReducer(state = initialFollowState, action) {
  switch (action.type) {
    case REQUEST_USER_PROFILE:
    case REQUEST_UNFOLLOW_USER:
      return Object.assign({}, state, { loading: true });

    case RESPONSE_USER_PROFILE:
    case RESPONSE_UNFOLLOW_USER:
      return Object.assign({}, state, action.response);

    default:
      return state;
  }
};
