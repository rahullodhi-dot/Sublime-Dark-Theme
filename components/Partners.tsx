import React, { useRef, useEffect, useState } from "react";
import AnimatedTitle from "./ui/AnimatedTitle";

import taj from "../assests/taj.jpg";
import marriot from "../assests/marriot.jpg";
import bare from "../assests/bare.png";
import basket from "../assests/basket.png";
import sheration from "../assests/sheration.jpg";
import fc from "../assests/fc.png";
import reviewImg from "../assests/reviewSvg.png";

const partners = [
  { name: "Sheraton Grand", src: sheration },
  { name: "Bare Necessities", src: bare },
  { name: "Marriott", src: marriot },
  { name: "Nature's Basket", src: basket },
  { name: "Taj Bangalore", src: taj },
  { name: "First Club", src: fc },
];

const Partners: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let rafId: number;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused.current) {
        container.scrollLeft += speed;

        const singleSetWidth = container.scrollWidth / 3;

        //  SEAMLESS LOOP (NO BLANK SPACE)
        if (container.scrollLeft >= singleSetWidth * 2) {
          container.scrollLeft -= singleSetWidth;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="py-24 bg-[#1A302A] relative overflow-hidden border-t border-white/5">
      {/* DECOR */}
      <img
        src={reviewImg}
        className="max-h-64 aspect-[3/2] absolute -left-36 -top-48 rotate-[95deg] opacity-60"
        alt=""
      />
      <img
        src={reviewImg}
        className="max-h-64 aspect-[3/2] absolute -right-36 -bottom-48 -rotate-[95deg] opacity-60"
        alt=""
      />

      <div className="container mx-auto px-6 text-center">
        <AnimatedTitle
          title="Our Trusted Partners"
          subtitle="Trust We Gain"
          text="#E8B879"
          containerClass="mb-16"
        />

        <p className="text-sublime-gold text-xs tracking-[0.2em] uppercase mb-12">
          Trust We Gain
        </p>

        {/* MARQUEE */}
        <div
          ref={scrollRef}
          className="flex gap-12 items-center overflow-x-hidden"
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
          onTouchStart={() => (isPaused.current = true)}
          onTouchEnd={() => (isPaused.current = false)}
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {/* 🔥 MUST BE TRIPLED */}
          {[...partners, ...partners, ...partners,...partners,...partners,...partners,...partners].map((partner, i) => (
            <div
              key={i}
              className="h-40 w-64 md:w-48 border border-white/10 flex items-center justify-center p-4 rounded-lg shrink-0 opacity-80 hover:opacity-100 transition"
            >
              <img
                src={partner.src}
                alt={partner.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
