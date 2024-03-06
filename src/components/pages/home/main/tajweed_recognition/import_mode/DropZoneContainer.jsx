import React from "react"
import Dropzone from "react-dropzone"

const DropZoneContainer = ({ pickImage }) => (
  <Dropzone accept="image/*" onDrop={pickImage}>
    {({ getRootProps }) => (
      <div className="dropzone hidden md:absolute inset-4 md:grid border-2 border-dashed border-green-700/50 dark:border-gray-400 items-center justify-center text-green-700/25 dark:text-gray-700/75 rounded-xl duration-200" {...getRootProps()}>
        <h1 className="font-normal text-5xl lg:text-8xl text-center">Drop an Image Here</h1>
      </div>
    )}
  </Dropzone>
)

export default DropZoneContainer