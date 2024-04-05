import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import { Link } from "react-router-dom"

const TajweedPreview = ({ t, isModalOpened, selectedTajweed, onCloseSummaryModal }) => (
  <Transition appear show={isModalOpened} as={Fragment}>
    <Dialog as="section" className={"tajweed-summary-modal relative z-10"} onClose={onCloseSummaryModal}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
      </Transition.Child>
      <Transition.Child
        enter="ease-out duration-500"
        enterFrom="opacity-0 translate-y-full scale-50"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="ease-in duration-300"
        leaveFrom="opacity-100 translate-y-0 scale-100"
        leaveTo="opacity-0 translate-y-full scale-50"
        className={"fixed inset-0 md:w-2/3 lg:w-1/2 m-auto h-min"}
      >
        <Dialog.Panel className={"flex flex-col items-center min-h-full max-w-5xl mx-4 bg-green-800 dark:bg-gray-700 text-green-900 dark:text-white shadow-lg dark:shadow-white/50 rounded-lg overflow-hidden"}>
          <span className="inline-flex w-full justify-between p-4 text-center dark:text-white">
            <h3 className="grow text-green-50">{selectedTajweed.tajweedName}</h3>
            <button className="px-2 font-mono text-green-900 dark:text-white bg-green-100/50 hover:bg-green-50 dark:bg-white/20 dark:hover:bg-black/50 duration-200 rounded-full shadow dark:shadow-white/50" onClick={onCloseSummaryModal}>
              <h4>X</h4>
            </button>
          </span>
          <Dialog.Title as="span" className={"w-full pt-0.5 mb-0.5 bg-none dark:bg-white"}></Dialog.Title>
          <span className="flex flex-col items-center p-4 bg-green-50 dark:bg-gray-900 text-base lg:text-lg">
            <p className="text-justify text-green-900 dark:text-white leading-normal">{selectedTajweed.summary}</p>
            <Link to={`/tajweed-list${selectedTajweed.detailPage}`}>
              <button className="grid items-center justify-center w-fit m-4 px-3 py-2 bg-green-800 hover:bg-green-900 active:bg-green-500 text-center text-white rounded-md shadow-md dark:shadow-white/50 duration-200">{t('detail_tajweed')}</button>
            </Link>
          </span>
        </Dialog.Panel>
      </Transition.Child>
    </Dialog>
  </Transition>
)

export default TajweedPreview