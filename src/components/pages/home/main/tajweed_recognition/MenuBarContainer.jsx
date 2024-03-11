import { Menu } from "@headlessui/react"
import React from "react"
import Swal from "sweetalert2"

const MenuBarContainer = ({ isEditMode, closeResult}) => (
  <div className="menu-bar__container flex flex-nowrap items-center w-full p-1 bg-green-50 dark:bg-gray-700 shadow-lg">
    <h3 className="title-bar flex-1 pl-2 text-green-900 dark:text-white">{isEditMode ? "Editor" : "Result"}</h3>
    <Menu as={"menu"} className={"menu-btn flex-none inline-block md:hidden h-10"}>
      <Menu.Button className={"p-2 hover:bg-green-300 dark:hover:bg-gray-500 active:bg-green-500 dark:active:bg-gray-300 duration-200 rounded-md"}>
        <img className="dark:hidden h-full duration-200" src="images/tajweed-menu-icon.svg" alt="Tajweed Settings" />
        <img className="hidden dark:block h-full duration-200" src="images/tajweed-menu-icon-dark.svg" alt="Tajweed Settings" />
      </Menu.Button>
    </Menu>
    <button className="discard-btn flex-none h-10 p-2 hover:bg-green-300 dark:hover:bg-gray-500 active:bg-green-500 dark:active:bg-gray-300 duration-200 rounded-md" onClick={() => {
      Swal.fire({
        title: "Are you sure want to close this result?",
        text: "The result data will be removed.",
        icon: "warning",
        confirmButtonColor: "green",
        showCancelButton: true,
        cancelButtonColor: "red"
      }).then(result => {
        if (result.isConfirmed) closeResult()
      })
    }}>
      <img className="dark:hidden h-full duration-200" src="images/close-icon.svg" alt="Close" />
      <img className="hidden dark:block h-full duration-200" src="images/close-icon-dark.svg" alt="Close" />
    </button>
  </div>
)

export default MenuBarContainer