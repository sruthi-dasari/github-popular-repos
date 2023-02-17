import {Component} from 'react'
import './index.css'

class LanguageFilterItem extends Component {
  onClickLanguageFilterItem = () => {
    const {itemDetails, updateActiveLanguageId} = this.props
    const {id} = itemDetails
    updateActiveLanguageId(id)
  }

  render() {
    const {itemDetails, isActive} = this.props
    const {language} = itemDetails

    const activeTabClassName = isActive ? 'active-tab-btn' : ''
    return (
      <button
        type="button"
        className={`language-filter-item-btn ${activeTabClassName}`}
        onClick={this.onClickLanguageFilterItem}
      >
        {language}
      </button>
    )
  }
}

export default LanguageFilterItem
