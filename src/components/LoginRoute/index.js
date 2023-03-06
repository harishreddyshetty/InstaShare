import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', errorMsg: '', loginSuccess: true}

  onSuccess = jwtToken => {
    Cookie.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({errorMsg, loginSuccess: false})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  renderLoginPage = () => {
    const {username, password, errorMsg, loginSuccess} = this.state

    return (
      <div className="login-page-desktop">
        <img
          className="websiteLoginImage"
          alt="website login"
          src="https://res.cloudinary.com/drl5lt54o/image/upload/v1677850136/InstaShare/LoginPage/Layer_2LoginPageImage_oldhrt.png"
        />

        <div className="user-input-container">
          <img
            className="websiteLogo"
            alt="website logo"
            src="https://res.cloudinary.com/drl5lt54o/image/upload/v1677850135/InstaShare/LoginPage/Standard_Collection_8website_logo_spc6wr.png"
          />
          <h1 className="websiteName-heading">Insta Share</h1>

          <form className="form" onSubmit={this.onSubmitForm}>
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              onChange={this.updateUsername}
              value={username}
              className="input-ele"
              id="username"
              type="text"
              placeholder="username"
            />

            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              onChange={this.updatePassword}
              value={password}
              className="input-ele"
              id="password"
              type="password"
              placeholder="password"
            />
            {loginSuccess ? null : <p className="error-msg">*{errorMsg}</p>}

            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  render() {
    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return <div className="login-page">{this.renderLoginPage()}</div>
  }
}

export default LoginRoute
