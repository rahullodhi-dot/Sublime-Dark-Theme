import React from 'react'

const GifContainer = ({gifUrl,className}) => {
  return (
    <div className={`w-full h-full flex justify-center  items-center ${className}`}>
      <img src={gifUrl} alt="GIF" />
    </div>
  )
}

export default GifContainer
