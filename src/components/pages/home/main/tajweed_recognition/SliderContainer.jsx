import React from "react"
import Slider from "react-slick"
import CustomNextArrow from "./CustomNextArrow"
import CustomPrevArrow from "./CustomPrevArrow"

const SliderContainer = ({ colorizedTajweeds, carouselItemsRefs, calculateLines }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: colorizedTajweeds?.length > 4 ? 5 : colorizedTajweeds?.length,
    slidesToScroll: colorizedTajweeds?.length > 4 ? 5 : colorizedTajweeds?.length,
    initialSlide: 0,
    adaptiveHeight: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: colorizedTajweeds?.length > 3 ? 4 : colorizedTajweeds?.length,
          slidesToScroll: colorizedTajweeds?.length > 3 ? 4 : colorizedTajweeds?.length
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: colorizedTajweeds?.length > 2 ? 3 : colorizedTajweeds?.length,
          slidesToScroll: colorizedTajweeds?.length > 2 ? 3 : colorizedTajweeds?.length
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: colorizedTajweeds?.length > 1 ? 2 : colorizedTajweeds?.length,
          slidesToScroll: colorizedTajweeds?.length > 1 ? 2 : colorizedTajweeds?.length
        }
      }
    ]
  }
  return (
    <footer className="footer-slider-container mx-6 bg-green-50 dark:bg-gray-700 text-center align-middle text-green-900 dark:text-white shadow-lg">
      <Slider arrows {...settings}>
        {colorizedTajweeds?.map((tajweed, i) => (
          <span key={i} ref={carouselItemsRefs[`tajweed-${tajweed.id}`]} className={`border-t-4 border-b-2 border-x border-y-[${tajweed.color}] border-x-green-900 hover:bg-green-300 dark:hover:bg-gray-500 dark:border-x-white lg:text-lg sm:text-base text-sm p-2 cursor-pointer duration-200`} onMouseEnter={() => calculateLines(`tajweed-${tajweed.id}`, true)} onMouseLeave={() => calculateLines(`tajweed-${tajweed.id}`, false)}>{tajweed.name}</span>
        ))}
      </Slider>
    </footer>
  )
}

export default SliderContainer