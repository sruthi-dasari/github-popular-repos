import {Component} from 'react'
import './index.css'

class LanguageFilterItem extends Component {
  onClickLanguageFilterItem = () => {
    const {itemDetails, updateActiveLanguageId} = this.props
    const {id} = itemDetails
    updateActiveLanguageId(id)
  }

  render() {
    const {itemDetails} = this.props
    const {language} = itemDetails
    return (
      <button
        type="button"
        className="language-filter-item-btn"
        onClick={this.onClickLanguageFilterItem}
      >
        {language}
      </button>
    )
  }
}

export default LanguageFilterItem
