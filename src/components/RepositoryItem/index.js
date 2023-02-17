import {Component} from 'react'
import './index.css'

class RepositoryItem extends Component {
  render() {
    const {repoItemDetails} = this.props
    const {
      avatarUrl,
      name,
      issuesCount,
      forksCount,
      starsCount,
    } = repoItemDetails
    return (
      <li className="repository-item-container">
        <img src={avatarUrl} alt={name} className="avatar-img" />
        <h1 className="repo-name">{name}</h1>
        <div className="counts-outer-container">
          <div className="count-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
              className="icon"
              alt="stars"
            />
            <p className="count-name">{starsCount} stars</p>
          </div>
          <div className="count-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
              className="icon"
              alt="forks"
            />
            <p className="count-name">{forksCount} forks</p>
          </div>
          <div className="count-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
              className="icon"
              alt="open issues"
            />
            <p className="count-name">{issuesCount} open issues</p>
          </div>
        </div>
      </li>
    )
  }
}

export default RepositoryItem
