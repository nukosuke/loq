import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { useRouterHistory, Router, Route, Redirect } from 'react-router'
import { createHistory } from 'history'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import UserList from './containers/UserList'
import userListReducer from './reducers/user-list-reducer'

class UsersApp extends Component {
  render() {
    return (
      <div id='user-app'>
        <UserList />
      </div>
    );
  }
}

/*
connect(
  state => ({
    users: state.users
  })
)(UsersApp);
*/

const reducer = combineReducers({
  userListReducer,
});

const store = createStore(reducer, applyMiddleware(ReduxThunk));

const history = useRouterHistory(createHistory)({
  basename: '/users'
});

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={UsersApp} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
