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
    apiStatus: 'INITIAL',
    GithubPopularReposData: '',
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
    // this.setState({apiStatus: apiStatusConstants.loading})
    const {activeLanguageId} = this.state

    // const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const url = 'https://apis.ccbp.in/popular-repos'
    // const options = {
    //   method: 'GET',
    // }
    const response = await fetch(url)
    const data = await response.json()

    console.log(`data: ${data}`)

    const updatedData = {
      popularRepos: data.popular_repos.map(eachItem =>
        this.getFormattedData(eachItem),
      ),
    }

    // console.log(updatedData)

    this.setState({
      GithubPopularReposData: updatedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  //   renderRepositoryItemsContainer = data => (
  //     <div className="repository-items-container">
  //       <RepositoryItem />
  //     </div>
  //   )

  //   renderSuccessViewContainer = () => {
  //     const {GithubPopularReposData} = this.state
  //     this.renderRepositoryItemsContainer(GithubPopularReposData)
  //   }

  //   renderLoadingViewContainer = () => (
  //     <div className="loading-view-container">
  //       <div>
  //         <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
  //       </div>
  //     </div>
  //   )

  //   renderViewContainer = () => {
  //     const {apiStatus} = this.state
  //     switch (apiStatus) {
  //       case apiStatusConstants.initial:
  //         return this.renderInitialViewContainer()
  //       case apiStatusConstants.success:
  //         return this.renderSuccessViewContainer()
  //       case apiStatusConstants.failure:
  //         return this.renderFailureViewContainer()
  //       case apiStatusConstants.loading:
  //         return this.renderLoadingViewContainer()
  //       default:
  //         return null
  //     }
  //   }

  //   updateActiveLanguageId = id => {
  //     this.setState({activeLanguageId: id}, this.getData)
  //   }

  render() {
    return (
      <div className="github-popular-repos-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="language-filter-items-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              itemDetails={eachItem}
              key={eachItem.id}
              updateActiveLanguageId={this.updateActiveLanguageId}
            />
          ))}
        </ul>
        {/* {this.renderViewContainer()} */}
      </div>
    )
  }
}

export default GithubPopularRepos
