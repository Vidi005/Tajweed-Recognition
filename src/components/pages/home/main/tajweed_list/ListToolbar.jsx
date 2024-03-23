import React from "react"
import SearchBar from "./SearchBar"
import ListFilter from "./ListFilter"

const ListToolbar = ({ props, searchItems, filterItems }) => (
  <section className="tajweed-toolbar sticky top-0 flex m-1 px-2 md:px-0 lg:hidden py-1 bg-green-700/20 dark:bg-gray-700 border border-b md:border-none border-green-900 dark:border-white backdrop-blur-sm rounded-lg shadow-md md:shadow-sm dark:shadow-white/50 z-10">
    <SearchBar props={props} searchItems={searchItems}/>
    <ListFilter props={props} filterItems={filterItems}/>
  </section>
)

export default ListToolbar