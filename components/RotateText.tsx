import React, { useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type RotatedLuxuryTextProps = {
  text?: string
  side?: "left" | "right"
  position?: string
  className?: string
}

const RotatedLuxuryText: React.FC<RotatedLuxuryTextProps> = ({
  text = "TASTE OF LUXURY",
  side = "right",
  position = "right-20",
  className = "",
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const sideClasses =
    side === "right"
      ? `
          ${position}
          top-1/2
          -translate-y-1/2
          origin-right
          rotate-90
        `
      : `
          ${position}
          top-1/2
          transtalate-y-full
          origin-left
          -rotate-90
        `

  useLayoutEffect(() => {
    if (!wrapperRef.current) return

    // Direction as per requirement
    const fromY = side === "left" ? -150 : 150
    const toY = side === "left" ? 150 : -150

    const ctx = gsap.context(() => {
      const motion = gsap.fromTo(
        wrapperRef.current,
        { y: fromY },
        {
          y: toY,
          duration: 7,          // slow luxury pace
          ease: "sine.inOut",   // premium feel
          repeat: -1,
          yoyo: true,           //  THIS IS THE KEY
        }
      )

      // Scroll = energy controller
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          motion.timeScale( self.progress)
        },
      })
    })

    return () => ctx.revert()
  }, [side])

  return (
    <div
      ref={wrapperRef}
      className={`
        absolute
        ${sideClasses}
        w-[840px]
        h-[135px]
        flex items-center
        z-[50]
        pointer-events-none
        ${className}
      `}
    >
      <h2
        className="
          w-full
          text-center
          text-[#E8B8791A]
          font-bold
          tracking-[0.18rem]
          font-serif
          text-[100px]
          leading-none
          whitespace-nowrap
        "
      >
        {text}
      </h2>
    </div>
  )
}

export default RotatedLuxuryText
