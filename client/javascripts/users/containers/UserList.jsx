import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions/user-list-actions'

class UserList extends Component {
  render() {
    const { users } = this.props;

    console.log(users);

    return(
      <div id='user-list'>
        <ul>
          { users.users.map(user => <li>{ user.name }</li>) }
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchUsers(localStorage.getItem('JWT'), {}));
  }
}

export default connect(
  state => ({
    users: state.userListReducer,
  })
)(UserList);
