import React from "react";
import butterFly from "../assests/ButterFly.gif"
type FloatingGifProps = {

  alt?: string;
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
  rotate?: number;
  zIndex?: number;
  center?: boolean;
  className?: string;
  position?: "absolute" | "fixed";
};

const ButterFly: React.FC<FloatingGifProps> = ({

  alt = "",
  x = "0",
  y = "0",
  width = 10,
  height = "auto",
  rotate = 0,
  zIndex = 10,
  center = false,
  className = "",
  position = "absolute"
}) => {
  return (
    <img
    
      src={butterFly}
      alt={alt}
      className={`${className} w-12 h-12 `}
      
      draggable={false}
    />
  );
};

export default ButterFly;
