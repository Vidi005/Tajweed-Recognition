import React from "react"

const CustomNextArrow = props => {
  const { className, style, onClick } = props
  return (
    <div
      title="Next Items"
      className={className}
      style={{ ...style, display: "relative", height: "100%" }}
      onClick={onClick}
    >
      <span className="absolute right-0 -left-1 inset-y-0 flex items-center justify-center border-t-4 border-b-2 border-y-green-900 dark:border-y-white h-full bg-gradient-to-l from-green-900 to-green-50 dark:from-gray-300 dark:to-gray-700">
        <img className="object-contain object-center hover:brightness-75 duration-200" src="images/next-icon.svg" alt="Next" />
      </span>
    </div>
  )
}

export default CustomNextArrow