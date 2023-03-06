import {Component} from 'react'
import Cookie from 'js-cookie'
// import {FiAlertTriangle} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ReactSlick from '../ReactSlick'
import UsersPostItem from '../UsersPostItem'
// import InstaShareContext from '../../InstaShareContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    userPosts: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUsersPosts()
  }

  updateComments = commentsData =>
    commentsData.map(eachComment => ({
      comment: eachComment.comment,
      userId: eachComment.user_id,
      userName: eachComment.user_name,
    }))

  getUsersPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/posts'
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
      this.setState({
        apiStatus: apiStatusConstants.success,
        userPosts: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPosts = () => {
    const {userPosts} = this.state

    return (
      <ul className="post-list">
        {userPosts.map(eachPost => (
          <UsersPostItem postData={eachPost} key={eachPost.postId} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => {
    this.getUsersPosts()
  }

  renderFailure = () => (
    <div className="failure-page">
      <img
        className="alert-icon"
        alt="failure view"
        src="https://res.cloudinary.com/drl5lt54o/image/upload/v1678099392/InstaShare/alert-triangle_w7qfqh.png"
      />
      {/* <FiAlertTriangle  /> */}
      <p className="alert-msg">Something went wrong. Please try again</p>
      <button
        onClick={this.onClickTryAgain}
        className="try-again-btn"
        type="button"
      >
        Try again
      </button>
    </div>
  )

  renderHomePage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPosts()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <ReactSlick className="slick" />
        <hr className="hr-line" />
        {this.renderHomePage()}
      </div>
    )
  }
}

export default HomeRoute
