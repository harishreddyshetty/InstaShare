import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

const navItems = [
  {id: 1, tabName: 'Home'},
  {id: 2, tabName: 'Search'},
  {id: 3, tabName: 'Profile'},
]

class Header extends Component {
  state = {activeTab: navItems[0].id, menuClicked: false}

  onClickMenu = () => {
    this.setState(prevState => ({menuClicked: !prevState.menuClicked}))
  }

  //   changeRoute = () => {
  //     const {activeTab} = this.state
  //   }

  onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  showMenu = () => {
    const {activeTab} = this.state

    return (
      <div className="menu-container">
        <ul className="menu-list-items">
          {navItems.map(eachItem => {
            const activeTabItem = eachItem.id === activeTab
            const activeTabClass = activeTabItem
              ? 'active-tab'
              : 'non-active-tab'
            const changeTab = () => {
              this.setState({activeTab: eachItem.id}, this.changeRoute)
            }

            return (
              <li className="list-element" key={eachItem.id}>
                <button
                  onClick={changeTab}
                  className={activeTabClass}
                  type="button"
                >
                  {eachItem.tabName}
                </button>
              </li>
            )
          })}
        </ul>

        <button
          className="logout-btn"
          onClick={this.onClickLogout}
          type="button"
        >
          Logout
        </button>

        <button onClick={this.onClickMenu} className="close-btn" type="button">
          <img
            alt="close"
            src="https://res.cloudinary.com/drl5lt54o/image/upload/v1677867901/InstaShare/Solidclose_kyqf0k.svg"
          />
        </button>
      </div>
    )
  }

  renderMobileHeader = () => {
    const {menuClicked} = this.state

    return (
      <>
        <nav className="nav-bar-mob">
          <img
            className="nav-bar-logo"
            alt="website logo"
            src="https://res.cloudinary.com/drl5lt54o/image/upload/v1677850135/InstaShare/LoginPage/Standard_Collection_8website_logo_spc6wr.png"
          />
          <h1 className="heading">Insta Share</h1>
          <button
            onClick={this.onClickMenu}
            className="hamburger-btn"
            type="button"
          >
            <img
              className="hamburger-icon"
              alt="hamburger"
              src="https://res.cloudinary.com/drl5lt54o/image/upload/v1677863792/InstaShare/menuhamburger_iaskyt.svg"
            />
          </button>
        </nav>
        {menuClicked && this.showMenu()}
      </>
    )
  }

  render() {
    return <>{this.renderMobileHeader()}</>
  }
}

export default withRouter(Header)
