import Loader from 'react-loader-spinner'

import {Component} from 'react'
import Slider from 'react-slick'
import Cookie from 'js-cookie'

/* Add css to your project */
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 360,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlick extends Component {
  state = {userStories: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getStoryDetails()
  }

  getStoryDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.users_stories.map(eachStory => ({
        storyUrl: eachStory.story_url,
        userId: eachStory.user_id,
        userName: eachStory.user_name,
      }))

      this.setState({
        userStories: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.inProgress})
    }
  }

  renderLoader = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSlider = () => {
    const {userStories} = this.state

    return (
      <Slider className="slider" {...settings}>
        {userStories.map(eachLogo => {
          const {userId, storyUrl, userName} = eachLogo
          return (
            <div className="slick-item" key={userId}>
              <img className="story-image" src={storyUrl} alt="user story" />
              <p className="story-username">{userName}</p>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderReactSlick = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatus.success:
        return this.renderSlider()
      case apiStatus.failure:
        return this.renderLoader()
      case apiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default ReactSlick
