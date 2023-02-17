import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

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
    apiStatus: apiStatusConstants.initial,
    githubPopularReposData: '',
    activeLanguageId: languageFiltersData[0].id,
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
    this.setState({apiStatus: apiStatusConstants.loading})
    const {activeLanguageId} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`

    // const url = 'https://apis.ccbp.in/popular-reposs'
    const response = await fetch(url)
    const data = await response.json()

    console.log(response)
    if (response.ok === true) {
      const updatedData = {
        popularRepos: data.popular_repos.map(eachItem =>
          this.getFormattedData(eachItem),
        ),
      }

      console.log(updatedData)

      this.setState({
        githubPopularReposData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessViewContainer = () => {
    const {githubPopularReposData} = this.state
    return (
      <ul className="repository-items-container">
        {githubPopularReposData.popularRepos.map(eachItem => (
          <RepositoryItem repoItemDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoadingViewContainer = () => (
    <div className="loading-view-container">
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    </div>
  )

  renderFailureViewContainer = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
      className="failure-view-img"
    />
  )

  renderViewContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
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

  updateActiveLanguageId = id => {
    this.setState({activeLanguageId: id}, this.getData)
  }

  render() {
    const {activeLanguageId} = this.state
    return (
      <div className="github-popular-repos-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="language-filter-items-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              itemDetails={eachItem}
              key={eachItem.id}
              updateActiveLanguageId={this.updateActiveLanguageId}
              isActive={eachItem.id === activeLanguageId}
            />
          ))}
        </ul>
        {this.renderViewContainer()}
      </div>
    )
  }
}

export default GithubPopularRepos
