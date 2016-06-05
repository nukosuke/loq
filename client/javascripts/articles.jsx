import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Redirect } from 'react-router'
import { createHistory } from 'history'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import ArticleList from './containers/ArticleList'
import articleListReducer from './reducers/article-list-reducer'

class ArticlesApp extends Component {
  render() {
    return (
      <div id='articles-app'>
        <ArticleList />
      </div>
    );
  }
}
/**
<ArticleList type='new' />
<ArticleList type='hot' />
<ArticleList type='following' />
<ArticleList type='me' />
*/


const reducer = combineReducers({
  articleListReducer,
});

const store = createStore(reducer, applyMiddleware(ReduxThunk));

const history = browserHistory;

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={ArticlesApp} />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
