import React from "react"
import Dropzone from "react-dropzone"
import Swal from "sweetalert2"

const DropZoneContainer = ({ t, pickFile }) => (
  <Dropzone
    accept={{
      'image/*': [],
      'application/pdf': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': []
    }}
    onDrop={acceptedFiles => {
      const imageFiles = acceptedFiles.filter(file => file.type.startsWith("image/"))
      const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf')
      const docxFiles = acceptedFiles.filter(file => file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
      if (imageFiles.length > 0) pickFile(imageFiles)
      else if (pdfFiles.length > 0) pickFile(pdfFiles)
      else if (docxFiles.length > 0) pickFile(docxFiles)
      else {
        Swal.fire({
          icon: 'error',
          title: t('invalid_file.0'),
          text: t('invalid_file.1'),
          confirmButtonColor: 'green'
        })
      }
    }}>
    {({ getRootProps }) => (
      <div className="dropzone hidden md:absolute inset-4 md:grid border-2 border-dashed border-green-700/50 lg:pb-36 pb-0 dark:border-gray-400 items-center justify-center text-green-700/25 dark:text-gray-700/75 rounded-xl duration-200" {...getRootProps()}>
        <h1 className="font-normal text-5xl lg:text-7xl text-center">{t('drop_image_or_pdf')}</h1>
      </div>
    )}
  </Dropzone>
)

export default DropZoneContainer