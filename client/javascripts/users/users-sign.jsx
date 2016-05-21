import React       from 'react'
import ReactDOM    from 'react-dom'
import ReactRouter from 'react-router'

/**
 * App for Login and SignUp
 */
class UserSignApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <form id='sign-in-form'>
          <input type='text'     name='identifier' placeholder='ID or email' />
          <input type='password' name='password'   placeholder='password' />
          <button>LOGIN</button>
        </form>

        <form id='sign-up-form'>
          <input type='text'     name='user[name]'             placeholder='ID' />
          <input type='text'     name='user[email]'            placeholder='email address' />
          <input type='password' name='user[password]'         placeholder='password' />
          <input type='password' name='user[password_confirm]' placeholder='password again' />
          <button>SIGNUP</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<UserSignApp/>, document.getElementById('app'));
