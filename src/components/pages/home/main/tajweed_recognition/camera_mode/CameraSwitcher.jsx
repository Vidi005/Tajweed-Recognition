import React from "react"

const CameraSwitcher = ({ switchCamera }) => (
  <button
    className="border-2 border-white p-1 rounded-full shadow-lg"
    onClick={() => switchCamera()}
  >
    <img className="h-8 object-cover" src="images/flip-camera-icon.svg" alt="Switch Camera"/>
  </button>
)

export default CameraSwitcher