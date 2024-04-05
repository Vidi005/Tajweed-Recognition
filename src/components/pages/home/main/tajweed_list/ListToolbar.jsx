import React from "react"
import SearchBar from "./SearchBar"
import ListFilter from "./ListFilter"

const ListToolbar = ({ t, searchItems, filterItems }) => (
  <section className="tajweed-toolbar sticky top-0 flex items-center px-2 lg:hidden py-1 bg-green-700/20 dark:bg-gray-700 border border-green-900 dark:border-white backdrop-blur-sm rounded-md shadow-md dark:shadow-white/50 z-10">
    <SearchBar t={t} searchItems={searchItems}/>
    <ListFilter t={t} filterItems={filterItems}/>
  </section>
)

export default ListToolbar