import './App.css'
import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import ProtectedRoute from './components/ProtectedRoute'
import HomeRoute from './components/HomeRoute'
import MyProfileRoute from './components/MyProfileRoute'
import UserProfile from './components/UserProfile'
import NotFoundRoute from './components/NotFoundRoute'
import InstaShareContext from './InstaShareContext'

class App extends Component {
  state = {searchInput: ''}

  updateSearchInput = value => {
    this.setState({searchInput: value})
  }

  render() {
    const {searchInput} = this.state

    return (
      <InstaShareContext.Provider
        value={{searchInput, updateSearchInput: this.updateSearchInput}}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/my-profile" component={MyProfileRoute} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <Route component={NotFoundRoute} />
        </Switch>
      </InstaShareContext.Provider>
    )
  }
}

export default App
