import './index.css'

const Comments = props => {
  const {commentsData} = props
  const {userName, comment} = commentsData
  // console.log(commentsData)

  return (
    <li className="comment">
      <p className="comment-username">
        {userName} <span className="comment-text">{comment}</span>
      </p>
    </li>
  )
}

export default Comments
