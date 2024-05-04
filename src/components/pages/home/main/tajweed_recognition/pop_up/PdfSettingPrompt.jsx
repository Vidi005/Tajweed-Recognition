import { Dialog, Listbox, Transition } from "@headlessui/react"
import React, { Fragment } from "react"

const PdfSettingPrompt = ({ t, isPromptOpened, isOCREnabled, enableOCRMode, confirmSetting, cancelRecognition }) => (
  <Transition appear show={isPromptOpened} as={Fragment}>
    <Dialog className={"pdf-setting-modal relative z-10"} onClose={cancelRecognition}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
      </Transition.Child>
      <Transition.Child
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-full scale-50"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 scale-100"
        leaveTo="opacity-0 translate-y-full scale-50"
        className={"fixed inset-0 md:w-1/3 lg:w-1/2 m-auto h-min"}
      >
        <Dialog.Panel className={"flex flex-col items-center min-h-full max-w-5xl mx-4 bg-green-800 dark:bg-gray-700 text-green-900 dark:text-white shadow-lg dark:shadow-white/50 rounded-lg overflow-hidden"}>
          <section className="inline-flex w-full justify-between p-4 text-center dark:text-white">
            <h3 className="grow text-green-50">{t('additional_setting')}</h3>
            <button className="px-2 font-mono text-green-900 dark:text-white bg-green-100/50 hover:bg-green-50 dark:bg-white/20 dark:hover:bg-black/50 duration-200 rounded-full shadow dark:shadow-white/50" title="Close" onClick={cancelRecognition}>
              <h4>X</h4>
            </button>
          </section>
          <section className="flex flex-col items-center p-4 bg-green-50 dark:bg-gray-900 text-base lg:text-lg">
            <p className="text-justify text-green-900 dark:text-white leading-tight">{t('additional_setting_desc')}</p>
            <Listbox value={isOCREnabled} onChange={enableOCRMode} className="w-full p-1 bg-green-50 dark:bg-gray-900 text-green-900 dark:text-white">
              <Listbox.Options static className="max-h-full flex flex-col items-center justify-center content-center">
                <Listbox.Option as="label" className={"cursor-pointer px-2 py-3"}>
                  <input
                    type="checkbox"
                    className="ocr-mode-checkbox accent-green-600 dark:accent-gray-600 h-5 w-5 duration-200"
                    checked={isOCREnabled}
                    onChange={enableOCRMode}
                  />
                  <span className="ml-2 text-base md:text-lg">{t('enable_ocr')}</span>
                </Listbox.Option>
                <button className="w-fit m-2 px-8 py-2 bg-green-800 hover:bg-green-900 active:bg-green-500 text-center text-white rounded-md shadow-md dark:shadow-white/50 duration-200" onClick={confirmSetting}>{t('ok')}</button>
              </Listbox.Options>
            </Listbox>
          </section>
        </Dialog.Panel>
      </Transition.Child>
    </Dialog>
  </Transition>
)

export default PdfSettingPrompt