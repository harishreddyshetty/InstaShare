import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie'

import {BsHeart, BsHeartFill} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import Comments from '../Comments'

class UsersPostItem extends Component {
  state = {liked: false}

  onClickLikeBtn = async () => {
    const {liked} = this.state
    const {postData} = this.props
    const {postId} = postData
    const jwtToken = Cookie.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({like_status: liked}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  }

  render() {
    const {liked} = this.state
    const {postData} = this.props
    const {
      profilePic,
      userName,
      postDetails,
      likesCount,
      comments,
      userId,
      createdAt,
    } = postData
    const {imageUrl, caption} = postDetails

    const onClickLike = () => {
      this.setState(
        prevState => ({liked: !prevState.liked}),
        this.onClickLikeBtn,
      )
    }

    return (
      <li className="users-post">
        <div className="usersProfileDetails">
          <div className="image-border-wrap">
            <div className="image-bg">
              <img
                className="post-profile-pic"
                alt="post author profile"
                src={profilePic}
              />
            </div>
          </div>

          <Link className="remove-line" to={`/users/${userId}`}>
            <p className="post-username">{userName}</p>
          </Link>
        </div>
        <img className="post-image" alt="post" src={imageUrl} />
        <div className="bottom-container">
          <div className="icons-container">
            <button
              // eslint-disable-next-line react/no-unknown-property
              testid="likeIcon"
              onClick={onClickLike}
              className="icons-btn"
              type="button"
            >
              {liked ? (
                <BsHeartFill className="liked-icon" />
              ) : (
                <BsHeart className="like-icon" onClick={onClickLike} />
              )}
            </button>
            <button className="icons-btn" type="button">
              <FaRegComment className="comment-icon" />
            </button>
            <button className="icons-btn" type="button">
              <BiShareAlt className="share-icon" />
            </button>
          </div>

          <p className="likes">{liked ? likesCount + 1 : likesCount} Likes</p>
          <p className="caption">{caption}</p>
          <ul className="comments-list">
            {comments.map(eachComment => (
              <Comments commentsData={eachComment} key={eachComment.userId} />
            ))}
          </ul>
          <p className="created-at">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default UsersPostItem
