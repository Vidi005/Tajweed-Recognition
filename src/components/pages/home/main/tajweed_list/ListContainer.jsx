import React from "react"
import { withTranslation } from "react-i18next"
import ListToolbar from "./ListToolbar"
import MobileDisplayList from "./MobileDisplayList"
import { tajweedLaws } from "../../../../../utils/data"

class ListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      getFilteredTajweeds: [],
      getSelectedTajweed: {},
      searchQuery: '',
      filterBy: this.props.t('filter_tajweeds.0')
    }
  }

  componentDidMount() {
    this.setState({ getFilteredTajweeds: this.loadTajweedData() })
  }

  loadTajweedData() {
    const tajweedData = []
    tajweedLaws().forEach((_tajweedLaw, index) => {
      tajweedData.push({
        id: this.props.t(`tajweed_laws.${index}.id`),
        group: this.props.t(`tajweed_laws.${index}.group`),
        category: this.props.t(`tajweed_laws.${index}.category`),
        name: this.props.t(`tajweed_laws.${index}.name`),
        page: this.props.t(`tajweed_laws.${index}.page`),
      })
    })
    return tajweedData
  }

  searchHandler(query) {
    this.setState({ searchQuery: query.toLowerCase() }, () => {
      const { searchQuery, filterBy } = this.state
      const tajweedData = [...this.loadTajweedData()]
      if (searchQuery.length === 0) {
        this.filterHandler(filterBy)
      } else {
        let searchData = tajweedData
        if (filterBy !== this.props.t('filter_tajweeds.0')) {
          searchData = tajweedData.filter(tajweedLaw => 
            tajweedLaw.group === filterBy || tajweedLaw.category === filterBy
          )
        }
        searchData = searchData.filter(tajweedLaw => 
          tajweedLaw.name.toLowerCase().includes(searchQuery)
        )
        this.setState({ getFilteredTajweeds: searchData })
      }
    });
  }

  filterHandler(filter) {
    const tajweedData = [...this.loadTajweedData()]
    if (filter === this.props.t('filter_tajweeds.0')) {
      this.setState({ getFilteredTajweeds: tajweedData })
    } else {
      const filteredTajweeds = tajweedData.filter(tajweedLaw => tajweedLaw.group === filter || tajweedLaw.category === filter)
      this.setState({ getFilteredTajweeds: filteredTajweeds })
    }
    this.setState({ filterBy: filter })
  }

  render () {
    return (
      <React.Fragment>
        <ListToolbar
          props={this.props}
          searchItems={this.searchHandler.bind(this)}
          filterItems={this.filterHandler.bind(this)}
        />
        <section className="nav-product-list min-h-full max-h-full bg-green-200 dark:bg-gray-900 overflow-y-auto animate__animated animate__fadeIn animate__faster">
          <MobileDisplayList t={this.props.t} getFilteredTajweeds={this.state.getFilteredTajweeds}/>
        </section>
      </React.Fragment>
    )
  }
}

export default withTranslation()(ListContainer)