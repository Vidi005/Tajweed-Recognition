import { Tab } from "@headlessui/react"
import React from "react"
import ListContainer from "./tajweed_list/ListContainer"

const ListMain = ({ t }) => (
  <Tab.Panel as="main" className={"lg:flex flex-auto h-0 overflow-x-hidden animate__animated animate__fadeIn"}>
    <ListContainer t={t}/>
  </Tab.Panel>
)

export default ListMain