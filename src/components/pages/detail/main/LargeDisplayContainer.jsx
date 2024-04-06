import React from "react"
import LargeDisplayList from "../../home/main/tajweed_list/LargeDisplayList"

const LargeDisplayContainer = ({ t, searchItems, getFilteredTajweeds }) => (
  <main className="flex flex-nowrap max-w-full flex-auto h-0">
    <LargeDisplayList t={t} searchItems={searchItems} getFilteredTajweeds={getFilteredTajweeds}/>
  </main>
)

export default LargeDisplayContainer