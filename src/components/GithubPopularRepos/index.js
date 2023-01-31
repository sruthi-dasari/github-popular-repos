import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class GithubPopularRepos extends Component {
  state = {
    apiStatus: 'INITIAL',
    selectedFilter: '',
    popularReposData: '',
  }

  componentDidMount() {
    this.getData()
  }

  getFormattedData = popularReposItem => ({
    name: popularReposItem.name,
    id: popularReposItem.id,
    issuesCount: popularReposItem.issues_count,
    forksCount: popularReposItem.forks_count,
    starsCount: popularReposItem.stars_count,
    avatarUrl: popularReposItem.avatar_url,
  })

  getData = async () => {
    const url = 'https://apis.ccbp.in/popular-repos'
    const response = await fetch(url)
    const data = await response.json()

    const updatedData = {
      popularRepos: data.popular_repos.map(eachItem =>
        this.getFormattedData(eachItem),
      ),
    }

    this.setState({popularReposData: updatedData})
  }

  renderInitialViewContainer = () => {}

  renderViewContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderInitialViewContainer()
      case apiStatusConstants.success:
        return this.renderSuccessViewContainer()
      case apiStatusConstants.failure:
        return this.renderFailureViewContainer()
      case apiStatusConstants.loading:
        return this.renderLoadingViewContainer()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="github-popular-repos-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="language-filter-items-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem itemDetails={eachItem} />
          ))}
        </ul>
        {this.renderViewContainer()}
        <div className="repository-items-container">
          <p>Hi</p>
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
