import React from 'react'
import { connect } from 'react-redux'
import { userProfileReducer, userFollowReducer } from '../reducers/user-profile-reducer'
import { fetchUserProfile } from '../actions/user-profile-actions'

class UserProfile extends React.Component {
  render() {
    const { id, uid, name, family_name, given_name, bio, avatar, url, articles } = this.props.profile;

    return (
      <div class='user-profile'>
        <div>{ avatar }</div>
        <h1>{ name } <small>@{ uid }</small></h1>
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{ [family_name,given_name].join(' ') }</td>
            </tr>
            <tr>
              <td>Bio:</td>
              <td>{ bio }</td>
            </tr>
            <tr>
              <td>URL:</td>
              <td><a class='url' href='{ url }' title='url'>{ url }</a></td>
            </tr>
          </tbody>
        </table>

        <h2>Articles</h2>
        <ul>
          { articles.map(article =>
              <li key={ article.id }>{ article.title }</li>
            ) }
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { uid }      = this.props.params;
    dispatch(fetchUserProfile(uid));
  }
}
export default connect(
  state => ({
    profile: state.userProfileReducer,
    follow: state.userFollowReducer,
  })
)(UserProfile);
