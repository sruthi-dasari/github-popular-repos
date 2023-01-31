import {Component} from 'react'
import './index.css'

class LanguageFilterItem extends Component {
  render() {
    const {itemDetails} = this.props
    const {id, language} = itemDetails
    return (
      <button type="button" className="language-filter-item-btn">
        {language}
      </button>
    )
  }
}

export default LanguageFilterItem
