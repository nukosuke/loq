'use strict';

import 'whatwg-fetch'

export const REQUEST_FETCH_ARTICLES  = 'REQUEST_FETCH_ARTICLES'
export const RESPONSE_FETCH_ARTICLES = 'RESPONSE_FETCH_ARTICLES'

/**
 * action creators
 */
export function requestFetchArticles() {
  return {
    type: REQUEST_FETCH_ARTICLES,
  };
}

export function responseFetchArticles(articles) {
  return {
    type: RESPONSE_FETCH_ARTICLES,
    articles,
  };
}

/**
 * thunk creators
 */
export function fetchArticles(jwt, options) {
  return (dispatch) => {
    dispatch(requestFetchArticles());

    fetch(`${window.CONSTANTS.API}/articles/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(json => json.articles)
    .then(articles => dispatch(responseFetchArticles(articles)))
    .catch(err => console.log(err));
  }
}
