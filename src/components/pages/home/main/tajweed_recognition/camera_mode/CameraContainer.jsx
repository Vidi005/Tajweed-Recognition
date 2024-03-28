import React from "react"
import CameraSwitcher from "./CameraSwitcher"
import { withTranslation } from "react-i18next"

const CameraContainer = ({ props, cameraRef, canvasRef, isCameraPermissionGranted, isCameraReady, setUpCamera, onCloseCamera, captureImage, switchCamera }) => (
  <div className="fixed inset-0 bg-green-100 dark:bg-black animate__animated animate__fadeInRight animate__faster">
    <header className="camera-container__header sticky top-0 w-full p-2 bg-green-800 text-white text-center shadow-xl">
      <h2>{props.t('capture_image')}</h2>
    </header>
    {isCameraReady
      ? <video
          ref={cameraRef}
          className="tab-identifier__capture w-full"
          autoFocus
          autoPlay
          playsInline
          muted
          width="100%">
        </video>
      : null
    }
    <canvas ref={canvasRef} className="hidden"></canvas>
    <main className="camera-menu absolute grid grid-cols-3 place-items-center justify-between bg-gradient-to-t from-black w-full px-2 py-8 bottom-0">
      <button
        className="border-2 border-white p-1 rounded-full shadow-lg"
        onClick={onCloseCamera}
      >
        <img className="h-8 object-cover" src="images/close-icon-dark.svg" alt="Close Camera"/>
      </button>
      {
        isCameraPermissionGranted
          ? <button className="h-14 w-14 p-0.5 border-4 border-double border-white rounded-full shadow-lg" onClick={captureImage}>
              <span className="inline-block w-full h-full rounded-full bg-white active:bg-gray-300"></span>
            </button>
          : <button className="h-14 w-14 p-0.5 border-4 border-double border-gray-500 rounded-full shadow-inner" disabled>
              <span className="inline-block w-full h-full rounded-full bg-gray-500"></span>
            </button>
      }
      <CameraSwitcher switchCamera={switchCamera}/>
    </main>
    {
      isCameraReady
        ? null
        : (
          <section className="flex justify-center items-center w-full h-full">
            <button
              className="bg-white my-2 active:bg-green-700 active:border-2 active:border-white p-3 font-sans text-green-900 active:text-white duration-200 rounded-xl shadow-xl"
              onClick={setUpCamera}
            >{props.t('camera_permission')}</button>
          </section>
          )
    }
  </div>
  )

export default withTranslation()(CameraContainer)