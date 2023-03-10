/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import Cookie from 'js-cookie'
import './index.css'
import InstaShareContext from '../../InstaShareContext'

const navItems = [
  {id: 'HOME', tabName: 'Home'},
  {id: 'SEARCH', tabName: 'Search'},
  {id: 'PROFILE', tabName: 'Profile'},
]

class Header extends Component {
  state = {
    activeTab: navItems[0].id,
    menuClicked: false,
    searchValue: '',
    searchArray: [],
  }

  componentDidMount() {
    this.getSearchData()
  }

  updateComments = commentsData =>
    commentsData.map(eachComment => ({
      comment: eachComment.comment,
      userId: eachComment.user_id,
      userName: eachComment.user_name,
    }))

  getSearchData = async () => {
    const {searchValue} = this.state
    const jwtToken = Cookie.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.posts.map(eachPost => ({
        comments: this.updateComments(eachPost.comments),
        createdAt: eachPost.created_at,
        likesCount: eachPost.likes_count,
        postDetails: {
          caption: eachPost.post_details.caption,
          imageUrl: eachPost.post_details.image_url,
        },
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
      }))
      this.setState({searchArray: updatedData})
    }
  }

  onClickMenu = () => {
    this.setState(prevState => ({menuClicked: !prevState.menuClicked}))
  }

  onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  search = () => {
    this.setState(prevState => ({menuClicked: !prevState.menuClicked}))
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
              this.setState({activeTab: eachItem.id})
              const {history} = this.props
              if (eachItem.id === 'PROFILE') {
                history.push('/my-profile')
              } else if (eachItem.id === 'HOME') {
                history.push('/')
              } else {
                this.search()
              }
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

        {/* <ul>
          <Link to="/">
            <li>
              <button type="button">Home</button>
            </li>
          </Link>

          <li>
            <button type="button">Search </button>
          </li>

          <Link to="/my-profile">
            <li>Profile</li>
          </Link>
        </ul> */}

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

  updateSearch = event => {
    this.setState({searchValue: event.target.value}, this.getSearchData)
  }

  onClickHome = () => {
    this.setState({activeTab: 'HOME'})
  }

  onClickProfile = () => {
    this.setState({activeTab: 'PROFILE'})
  }

  renderHeader = () => {
    const {searchValue, searchArray, menuClicked, activeTab} = this.state

    // const activeTabHomeColor = activeTab === 'HOME' ? 'active-tab' : null

    return (
      <InstaShareContext.Consumer>
        {value => {
          const {updateSearchInput, updateSearchData} = value

          const onClickSearchIcon = () => {
            updateSearchData(searchArray)
            updateSearchInput(searchValue)
          }

          const renderSearch = () => (
            <div className="searchInputContainer">
              <input
                value={searchValue}
                onChange={this.updateSearch}
                placeholder="Search Caption"
                type="search"
                className="searchInput"
              />

              <button
                testid="searchIcon"
                onClick={onClickSearchIcon}
                className="search-icon-btn"
                type="button"
              >
                <FaSearch className="search-icon" />
              </button>
            </div>
          )

          return (
            <>
              <nav className="nav-bar-desk">
                <Link to="/">
                  <img
                    className="nav-bar-logo"
                    alt="website logo"
                    src="https://res.cloudinary.com/drl5lt54o/image/upload/v1677850135/InstaShare/LoginPage/Standard_Collection_8website_logo_spc6wr.png"
                  />
                </Link>
                <h1 className="heading">Insta Share</h1>
                <div className="nav-items-container">
                  <div className="searchInputContainer">
                    <input
                      value={searchValue}
                      onChange={this.updateSearch}
                      placeholder="Search Caption"
                      type="search"
                      className="searchInput"
                    />

                    <button
                      testid="searchIcon"
                      onClick={onClickSearchIcon}
                      className="search-icon-btn"
                      type="button"
                    >
                      <FaSearch className="search-icon" />
                    </button>
                  </div>

                  <ul className="menu-list-items">
                    <Link className="remove-underline" to="/">
                      <li key="HOME">
                        <button
                          className="home-btn"
                          onClick={this.onClickHome}
                          type="button"
                        >
                          Home
                        </button>
                      </li>
                    </Link>

                    <Link className="remove-underline" to="/my-profile">
                      <li key="PROFILE">
                        <button
                          className="home-btn"
                          onClick={this.onClickProfile}
                          type="button"
                        >
                          Profile
                        </button>
                      </li>
                    </Link>
                  </ul>

                  <button
                    className="logout-btn"
                    onClick={this.onClickLogout}
                    type="button"
                  >
                    Logout
                  </button>
                </div>

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
              <hr className="hrline" />
              {menuClicked && this.showMenu()}
              {activeTab === 'SEARCH' && renderSearch()}
            </>
          )
        }}
      </InstaShareContext.Consumer>
    )
  }

  render() {
    return <>{this.renderHeader()}</>
  }
}

export default withRouter(Header)
