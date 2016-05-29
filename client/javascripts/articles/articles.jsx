import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Redirect } from 'react-router'
import { createHistory } from 'history'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import ReduxThunk from 'redux-thunk'

class ArticlesApp extends Component {
  render() {
    return (
      <div id='articles-app'>
        <p>articles</p>
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

/*
const reducer = combineReducers({
  articleReducer,
});
*/

//const store = createStore(reducer, applyMiddleware(ReduxThunk));

//const history = browserHistory;


/*
<Provider store={store}>
  <Router history={history}>
    <Route path='/' component={ArticlesApp}>
    </Route>
  </Router>
</Provider>
*/
render(
  <ArticlesApp />,
  document.getElementById('app'),
);
