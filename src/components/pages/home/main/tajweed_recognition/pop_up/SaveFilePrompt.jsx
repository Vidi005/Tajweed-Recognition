import { Dialog, Listbox, Transition } from "@headlessui/react"
import React, { Fragment } from "react"

const SaveFilePrompt = ({ t, inputRef, isDialogOpened, isFocused, isBismillahAdded, docTitle, handleTitleChange, onFocusHandler, onBlurHandler, addBismillah, saveAsDoc, saveAsPdf, cancelSaving }) => {
  let charsLimit = ''
  if (docTitle.length >= 100) charsLimit = `${t('chars_limit_exceeded')}`
  else charsLimit = `${docTitle.length} / 100`
  return (
    <Transition appear show={isDialogOpened} as={Fragment}>
      <Dialog initialFocus={inputRef} className={"save-file-dialog relative z-10"} onClose={cancelSaving}>
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
          className={"fixed inset-0 md:w-3/4 lg:w-1/2 m-auto h-min"}
        >
          <Dialog.Panel className={"flex flex-col items-center min-h-full max-w-5xl mx-4 bg-green-800 dark:bg-gray-700 text-green-900 dark:text-white shadow-lg dark:shadow-white/50 rounded-lg overflow-hidden"}>
            <section className="inline-flex w-full justify-between p-4 text-center dark:text-white">
              <h3 className="grow text-green-50">{t('save_file_confirmation')}</h3>
              <button className="px-2 font-mono text-green-900 dark:text-white bg-green-100/50 hover:bg-green-50 dark:bg-white/20 dark:hover:bg-black/50 duration-200 rounded-full shadow dark:shadow-white/50" title="Close" onClick={cancelSaving}>
                <h4>X</h4>
              </button>
            </section>
            <section className="flex flex-col items-center w-full p-4 bg-green-50 dark:bg-gray-900 text-base lg:text-lg">
              <p className="text-justify text-green-900 dark:text-white leading-tight">{t('save_file_confirmation_desc')}</p>
              <br />
              <input
                ref={inputRef}
                type="text"
                className="input-title w-full m-1 p-2 border border-green-800 dark:border-gray-100 bg-green-50/25 dark:bg-gray-900/25 text-base text-black dark:text-white rounded-md shadow-inner dark:shadow-white/50 z-50"
                placeholder={t('type_title')}
                value={docTitle}
                onChange={handleTitleChange}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                autoFocus
                required
              />
              {isFocused
                ? docTitle.length >= 100
                  ? <label className="w-full pl-1 text-justify leading-tight text-sm text-red-700 dark:text-red-500" htmlFor="input-title">{charsLimit}</label>
                  : <label className="w-full pl-1 text-justify leading-tight text-sm text-green-800 dark:text-green-500" htmlFor="input-title">{charsLimit}</label>
                : <label className="w-full pl-0.5 text-justify leading-tight text-sm text-red-600 dark:text-red-400">* {t('input_title_required')}</label>
              }
              <br />
              <p className="text-center text-sm text-green-700 dark:text-gray-200">
                {t('pre_text_download')}<a className="underline text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-50 active:text-violet-700" href="https://www.kolomedu.com/2020/07/cara-instal-font-lpmq-isep-misbah-font.html" target="_blank" rel="noopener noreferrer">LPMQ Isep Misbah</a>{t('post_text_download')}
              </p>
              <Listbox value={isBismillahAdded} onChange={addBismillah} className="w-full p-1 bg-green-50 dark:bg-gray-900 text-green-900 dark:text-white">
                <Listbox.Options static className="max-h-full flex items-center justify-center">
                  <Listbox.Option as="label" className={"cursor-pointer px-2 py-3"}>
                    <input
                      type="checkbox"
                      className="bismillah-mode-checkbox accent-green-600 dark:accent-gray-600 h-5 w-5 duration-200"
                      checked={isBismillahAdded}
                      onChange={addBismillah}
                    />
                    <span className="ml-2 text-base md:text-lg">{t('add_bismillah')}</span>
                  </Listbox.Option>
                </Listbox.Options>
              </Listbox>
              <div className="flex w-full items-center justify-evenly text-sm md:text-base">
                <button className="m-2 px-4 py-2 bg-green-800 hover:bg-green-900 active:bg-green-500 text-center text-white rounded-md shadow-md dark:shadow-white/50 duration-200" onClick={saveAsDoc} disabled={docTitle.length < 1}>{t('save_as_doc')}</button>
                <button className="m-2 px-4 py-2 bg-green-800 hover:bg-green-900 active:bg-green-500 text-center text-white rounded-md shadow-md dark:shadow-white/50 duration-200" onClick={saveAsPdf} disabled={docTitle.length < 1}>{t('save_as_pdf')}</button>
              </div>
            </section>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default SaveFilePrompt