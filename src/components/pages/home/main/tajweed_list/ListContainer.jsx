import React from "react"
import ListToolbar from "./ListToolbar"
import MobileDisplayList from "./MobileDisplayList"
import { tajweedLaws } from "../../../../../utils/data"
import LargeDisplayList from "./LargeDisplayList"
import { Helmet } from "react-helmet"

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

  componentDidUpdate(prevProps) {
    if (prevProps.t !== this.props.t) {
      this.setState({ getFilteredTajweeds: this.loadTajweedData() })
    }
  }

  loadTajweedData() {
    const tajweedData = []
    tajweedLaws().sort((a, b) => a.id - b.id).forEach((_tajweedLaw, index) => {
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
      if (searchQuery.length === 0) this.filterHandler(filterBy)
      else {
        let searchData = tajweedData
        if (filterBy !== this.props.t('filter_tajweeds.0')) {
          searchData = tajweedData.filter(tajweedLaw => 
            tajweedLaw.group === filterBy || tajweedLaw.category === filterBy
          )
        }
        searchData = searchData.filter(tajweedLaw => tajweedLaw.name.toLowerCase().includes(searchQuery))
        this.setState({ getFilteredTajweeds: searchData })
      }
    })
  }

  filterHandler(filter) {
    const tajweedData = [...this.loadTajweedData()]
    if (filter === this.props.t('filter_tajweeds.0')) this.setState({ getFilteredTajweeds: tajweedData })
    else {
      const filteredTajweeds = tajweedData.filter(tajweedLaw => tajweedLaw.group === filter || tajweedLaw.category === filter)
      this.setState({ getFilteredTajweeds: filteredTajweeds })
    }
    this.setState({ filterBy: filter })
  }

  render () {
    return (
      <React.Fragment>
        <Helmet>
          <title>{this.props.t('tab_list.1.tab_name')}</title>
          <meta name="keywords" content={this.props.t('tab_list.1.tab_name')} />
          <link rel="canonical" href={location.toString()}/>
        </Helmet>
        <ListToolbar
          t={this.props.t}
          searchItems={this.searchHandler.bind(this)}
          filterItems={this.filterHandler.bind(this)}
        />
        <section className="nav-product-list h-full bg-green-100 dark:bg-gray-900 overflow-y-auto animate__animated animate__fadeIn animate__faster">
          <MobileDisplayList t={this.props.t} getFilteredTajweeds={this.state.getFilteredTajweeds}/>
        </section>
        <LargeDisplayList
          t={this.props.t}
          getFilteredTajweeds={this.state.getFilteredTajweeds}
          searchItems={this.searchHandler.bind(this)}
        />
      </React.Fragment>
    )
  }
}

export default ListContainer