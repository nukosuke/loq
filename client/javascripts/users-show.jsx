import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Redirect } from 'react-router'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import UserProfile from './components/UserProfile'
import { userProfileReducer, userFollowReducer } from './reducers/user-profile-reducer'

class UsersShowApp extends Component {
  render() {
    return (
      <div id='users-show-app'>
        { this.props.children }
      </div>
    );
  }
}

const reducer = combineReducers({
  userProfileReducer,
  userFollowReducer,
});

const store = createStore(reducer, applyMiddleware(ReduxThunk));

const history = browserHistory;

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={UsersShowApp}>
        <Route path=':uid' component={UserProfile}>
          <Route path='/following' />
          <Route path='/followers' />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
