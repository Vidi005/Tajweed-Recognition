import React from "react"
import Slider from "react-slick"
import CustomNextArrow from "./CustomNextArrow"
import CustomPrevArrow from "./CustomPrevArrow"

const SliderContainer = ({ colorizedTajweeds, carouselItemsRefs, calculateLines, showSummaryModal }) => {
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
        breakpoint: 1536,
        settings: {
          slidesToShow: colorizedTajweeds?.length > 3 ? 4 : colorizedTajweeds?.length,
          slidesToScroll: colorizedTajweeds?.length > 3 ? 4 : colorizedTajweeds?.length
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: colorizedTajweeds?.length > 2 ? 3 : colorizedTajweeds?.length,
          slidesToScroll: colorizedTajweeds?.length > 2 ? 3 : colorizedTajweeds?.length
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: colorizedTajweeds?.length > 1 ? 2 : colorizedTajweeds?.length,
          slidesToScroll: colorizedTajweeds?.length > 1 ? 2 : colorizedTajweeds?.length
        }
      }
    ]
  }
  return (
    <footer className="footer-slider-container relative mx-6 bg-green-50 dark:bg-gray-700 text-center align-middle text-green-900 dark:text-white shadow-lg animate__animated animate__slideInUp">
      <Slider arrows {...settings}>
        {colorizedTajweeds?.map((tajweed, i) => (
          <span
            data-index={i}
            key={i}
            ref={carouselItemsRefs[`tajweed-${tajweed.id}`]}
            onMouseEnter={() => calculateLines(`tajweed-${tajweed.id}`, true, i, tajweed.color)}
            onMouseLeave={() => calculateLines(`tajweed-${tajweed.id}`, false, i, tajweed.color)}
            onClick={() => showSummaryModal(tajweed.id)}
          >
            <div
              className="border-t-4 border-b-2 border-x hover:bg-green-800/25 dark:hover:bg-gray-500 tracking-tighter lg:text-lg sm:text-base text-sm p-2 cursor-pointer duration-200"
              style={{ borderTopColor: tajweed.color, borderBottomColor: tajweed.color }}
            >
              {tajweed.name}
            </div></span>
        ))}
      </Slider>
    </footer>
  )
}

export default SliderContainer