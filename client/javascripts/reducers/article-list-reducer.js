'use strict'

import {
  REQUEST_FETCH_ARTICLES,
  RESPONSE_FETCH_ARTICLES
} from '../actions/article-list-actions'

const initialState = {
  articles: [],
};

export default function articleListReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_FETCH_ARTICLES:
      return Object.assign({}, state, {
        articles: []
      })

    case RESPONSE_FETCH_ARTICLES:
      return Object.assign({}, state, {
        articles: action.articles,
      })

    default:
      return state;
  }
}
