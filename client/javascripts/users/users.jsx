import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { useRouterHistory, Router, Route, Redirect } from 'react-router'
import { createHistory } from 'history'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import ReduxThunk from 'redux-thunk'

class UsersApp extends Component {
  render() {
    //const { users } = this.props;

    //stub
    const users = [
      { name: 'user01' },
      { name: 'user02' },
      { name: 'user03' },
    ];

    return (
      <div id='user-app'>
        { users.map(user => <li>{ user.name }</li>) }
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
  function(state = {}, action) { return state },
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
