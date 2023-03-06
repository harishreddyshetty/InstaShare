import './index.css'
import {withRouter} from 'react-router-dom'

const NotFoundRoute = props => {
  const returnHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-page">
      <img
        className="notFoundImg"
        alt="page not found"
        src="https://res.cloudinary.com/drl5lt54o/image/upload/v1678047372/InstaShare/erroring_1notfound_gdsqsc.png"
      />
      <h1 className="page-heading">Page Not Found</h1>
      <p className="page-description">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button className="homeBtn" onClick={returnHome} type="button">
        Home Page
      </button>
    </div>
  )
}

export default withRouter(NotFoundRoute)
