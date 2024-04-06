import React from "react"
import { withTranslation } from "react-i18next"

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { input: '' }
  }

  handleSearch (event) {
    scrollTo(0, 0)
    this.setState({ input: event.target.value }, () => this.props.searchItems(this.state.input))
  }

  render () {
    return (
      <input
        type="search"
        className="search-bar grow lg:w-full mr-2 p-1.5 md:p-2.5 lg:p-2 border border-green-800 dark:border-gray-100 bg-green-50/25 dark:bg-gray-900/25 text-base md:text-lg text-black dark:text-white rounded-lg shadow-inner dark:shadow-white/50 backdrop-blur-sm"
        placeholder={this.props.t('search_items')}
        value={this.state.input}
        onChange={this.handleSearch.bind(this)}
      />
    )
  }
}

export default withTranslation()(SearchBar)