import {Component} from 'react'
import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MyProfileRoute extends Component {
  state = {ProfileData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/insta-share/my-profile'

    const jwtToken = Cookie.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const {profile} = data
      const updatedData = {
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        id: profile.id,
        posts: profile.posts,
        postsCount: profile.posts_count,
        profilePic: profile.profile_pic,
        stories: profile.stories,
        userBio: profile.user_bio,
        userId: profile.user_id,
        userName: profile.user_name,
      }
      console.log(updatedData)
      this.setState({
        ProfileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfile = () => {
    const {ProfileData} = this.state

    const {
      profilePic,
      userName,
      postsCount,
      followersCount,
      followingCount,
      userId,
      userBio,
      posts,
    } = ProfileData

    return (
      <div className="profile-page">
        <div className="profile-details-container">
          <img className="profile-pic" alt="my profile" src={profilePic} />
          <div className="profile-info-section">
            <p className="username">{userName}</p>
            <ul className="post-follow-section">
              <li className="numbers">
                {postsCount} <span className="numbers-label">posts</span>
              </li>
              <li className="numbers">
                {followersCount}
                <span className="numbers-label"> followers</span>
              </li>
              <li className="numbers">
                {followingCount}
                <span className="numbers-label"> following</span>
              </li>
            </ul>
            <div className="bio-details-section">
              <p className="user-id">{userId}</p>
              <p className="user-bio">{userBio}</p>
            </div>
          </div>
        </div>

        <div className="profile-details-container-mob">
          <p className="username">{userName}</p>
          <div className="section">
            <img className="profile-pic" alt="my profile" src={profilePic} />
            <div className="profile-info-section">
              <ul className="post-follow-section">
                <li className="numbers">
                  {postsCount} <span className="numbers-label">posts</span>
                </li>
                <li className="numbers">
                  {followersCount}
                  <span className="numbers-label"> followers</span>
                </li>
                <li className="numbers">
                  {followingCount}
                  <span className="numbers-label"> following</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bio-details-section">
            <p className="user-id">{userId}</p>
            <p className="user-bio">{userBio}</p>
          </div>
        </div>

        {this.renderStories()}
        <hr className="hrline" />
        <div className="post-heading-section">
          <BsGrid3X3 className="posts-icon" />
          <h1 className="post-heading">Posts</h1>
        </div>
        {posts.length > 0 ? this.renderPosts() : this.renderNoPosts()}
      </div>
    )
  }

  renderNoPosts = () => (
    <div className="no-post-section">
      <div className="camera-section">
        <BiCamera className="camera-icon" />
      </div>
      <h1 className="noPosts">No Posts</h1>
    </div>
  )

  renderPosts = () => {
    const {ProfileData} = this.state
    const {posts} = ProfileData

    return (
      <ul className="posts-container">
        {posts.map(eachPost => (
          <li key={eachPost.id}>
            <img className="post-img" alt="my post" src={eachPost.image} />
          </li>
        ))}
      </ul>
    )
  }

  renderStories = () => {
    const {ProfileData} = this.state
    const {stories} = ProfileData

    return (
      <ul className="stories-container">
        {stories.map(eachStory => (
          <li className="story-list-item" key={eachStory.id}>
            <img className="story-img" alt="my story" src={eachStory.image} />
          </li>
        ))}
      </ul>
    )
  }

  //   testid="loader"
  loader = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  clickTryAgain = () => {
    this.getProfileDetails()
  }

  renderFailurePage = () => (
    <div className="failurePage">
      <img
        className="failure-img"
        alt="failure view"
        src="https://res.cloudinary.com/drl5lt54o/image/upload/v1677919896/InstaShare/Group_7522failure_cts49j.png"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        className="tryAgain-btn"
        onClick={this.clickTryAgain}
        type="button"
      >
        Try again
      </button>
    </div>
  )

  renderProfilePage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.inProgress:
        return this.loader()
      case apiStatusConstants.failure:
        return this.renderFailurePage()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderProfilePage()}
      </>
    )
  }
}

export default MyProfileRoute
