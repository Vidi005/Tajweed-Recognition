import { Transition } from "@headlessui/react"
import React, { Fragment } from "react"

const TajweedGuidelines = ({ isCarouselItemHovered, lines, linesColor }) => isCarouselItemHovered &&
  <Transition
    appear
    show={isCarouselItemHovered}
    as={Fragment}
    enter="ease-out duration-500"
    enterFrom="translate-y-full"
    enterTo="translate-y-0"
    leave="ease-in duration-500"
    leaveFrom="opacity-100 translate-y-0"
    leaveTo="opacity-0 translate-y-full"
  >
    <svg className="absolute w-full h-full top-0 left-0 duration-300">
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          <g className="absolute drop-shadow-sm" style={{ transform: `translate(${line.x1}px, ${line.y1}px)` }}>
            <circle
              className="animate-ping"
              cx={"0"}
              cy={"0"}
              r={"5"}
              fill={linesColor}
              opacity={"0.75"}
            />
            <circle className="relative" cx="0" cy="0" r="3" fill={`${linesColor}BF`}/>
          </g>
          <line
            className="drop-shadow"
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={`${linesColor}BF`}
            strokeWidth="2"
          />
        </React.Fragment>
      ))}
    </svg>
  </Transition>

export default TajweedGuidelines