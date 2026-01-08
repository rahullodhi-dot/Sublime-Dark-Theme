import React from 'react'
import divider from "../assests/Divider.png"

const Divider = ({width}) => {
  return (
    <div className="flex  justify-center items-center">
      <img src={divider} alt="Divider" className={`h-auto w-[${width}%]`} />
    </div>
  )
}

export default Divider
