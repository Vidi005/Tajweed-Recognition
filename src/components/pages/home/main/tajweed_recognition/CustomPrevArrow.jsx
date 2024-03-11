import React from "react"

const CustomPrevArrow = props => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: "relative", height: "100%" }}
      onClick={onClick}
    >
      <span className="absolute left-0 -right-2 inset-y-0 flex items-center justify-center border-t-4 border-b-2 border-y-green-900 dark:border-y-white h-full bg-gradient-to-r from-green-900 to-green-50 dark:from-gray-300 dark:to-gray-700">
        <img className="pl-1 object-contain object-center hover:brightness-75 duration-200" src="images/prev-icon.svg" alt="Previous" />
      </span>
    </div>
  )
}

export default CustomPrevArrow