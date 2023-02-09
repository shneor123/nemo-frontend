import React from 'react'

export const HomeCards = ({ imgDada }) => {
  return (
    <div className="guide-carousel">
      <div className='el-carousel'>
        <img src={imgDada} className="carousel-img" />
      </div>
    </div>
  )
}