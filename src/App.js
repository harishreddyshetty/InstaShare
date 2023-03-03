import './App.css'
import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import ProtectedRoute from './components/ProtectedRoute'
import HomeRoute from './components/HomeRoute'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginRoute} />
        <ProtectedRoute exact path="/" component={HomeRoute} />
      </Switch>
    )
  }
}

export default App
