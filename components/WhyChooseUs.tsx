import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from './ui/AnimatedTitle';
import whyChooseUsBg from '../assests/WhyChooseUs.jpg';
import GifContainer from './gifContainer';

import girl from '../assests/girl.gif';
import door from '../assests/door.gif';
import lotus from '../assests/lotus.gif';
import leafgif from '../assests/leafgif.gif';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: leafgif, title: 'Wellness Enhancing',desc:"A lifestyle designed to elevate your body, mind, and spirit." },
  { icon: lotus, title: 'Direct from Growers',desc:"From the hands that harvest to yours-pure, authentic, and direct." },
  { icon: door, title: 'Sourced Fresh in Small Batches',desc:"Crafted in small batches to ensure unmatched freshness and quality." },
  { icon: girl, title: 'Proudly Women Led' ,desc:"Proudly a women-led brand, built on passion, purpose, and perseverance."}
];

const WhyChooseUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  function getHungPoint(path, progress, index, offset = 80) {
    const total = path.getTotalLength();
    const length = total * progress;

    const p = path.getPointAtLength(length);
    const pPrev = path.getPointAtLength(Math.max(0, length - 1));
    const pNext = path.getPointAtLength(Math.min(total, length + 1));

    const dx = pNext.x - pPrev.x;
    const dy = pNext.y - pPrev.y;

    let nx = -dy;
    let ny = dx;

    const mag = Math.hypot(nx, ny);
    nx /= mag;
    ny /= mag;

    const direction = index % 2 === 0 ? -1 : 1;

    return {
      anchor: p,
      icon: {
        x: p.x + nx * offset * direction,
        y: p.y + ny * offset * direction
      }
    };
  }

  const anchors = [0, 0.33, 0.66, 1];

  useEffect(() => {
    if (!pathRef.current || !svgContainerRef.current) return;

    const path = pathRef.current;
    const svg = path.ownerSVGElement;
    const container = svgContainerRef.current;
    const rect = container.getBoundingClientRect();

    const svgPoint = svg.createSVGPoint();

    const calculated = anchors.map((t, i) => {
      const data = getHungPoint(path, t, i);

      svgPoint.x = data.icon.x;
      svgPoint.y = data.icon.y;
      const iconScreen = svgPoint.matrixTransform(svg.getScreenCTM());

      svgPoint.x = data.anchor.x;
      svgPoint.y = data.anchor.y;
      const anchorScreen = svgPoint.matrixTransform(svg.getScreenCTM());

      return {
        iconX: iconScreen.x - rect.left,
        iconY: iconScreen.y - rect.top,
        anchorX: anchorScreen.x - rect.left,
        anchorY: anchorScreen.y - rect.top
      };
    });

    setPoints(calculated);
  }, []);

  /* ================= GSAP (NO STYLE CHANGES) ================= */
useLayoutEffect(() => {
  if (!pathRef.current || !containerRef.current) return;

  const ctx = gsap.context(() => {
    const path = pathRef.current!;
    const length = path.getTotalLength();

    /* KEEP DASH STYLE — JUST OFFSET */
    gsap.set(path, {
      strokeDasharray: "6 6",
      strokeDashoffset: length
    });

    /* SVG DASHED PROGRESS */
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",     // ⬅️ START ONLY WHEN SECTION ENTERS
        end: "bottom top",       // ⬅️ FULL SECTION SCROLL
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    /* CONNECTORS — APPEAR AFTER SVG REACHES */
    gsap.fromTo(
      "line, circle",
      { opacity: 0 },
      {
        opacity: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",       // ⬅️ AFTER SVG IS VISIBLE
          toggleActions: "play none none reverse"
        }
      }
    );
  }, containerRef);

  return () => ctx.revert();
}, []);


  return (
    <section
      ref={containerRef}
      className="py-32 min-h-screen container font-Gotham bg-sublime-dark relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay">
        <img
          src={whyChooseUsBg}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-[1180px] mx-auto px-6 relative z-10">
        <AnimatedTitle
          title="Why Choose Us"
          subtitle="AWESOME PRODUCTS"
          containerClass=""
          text="#E8B879"
             textClass='font-gotham'
        />

        <div
          ref={svgContainerRef}
          className="relative w-full h-[22vw] mt-20  gap-12 flex items-center justify-center"
        >
          {features.map((f, i) => (
            <div
              key={i}
              className={`feature-item w-72  text-center px-6 flex flex-col   ${
                i % 2 === 0 ? 'mb-[100px]' : 'mt-[100px]'
              }`}
            >
              <h2 className="text-xl font-bold">{f.title}</h2>
              <p className="text-sm text-center">
              {f.desc}
              </p>
            </div>
          ))}

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 973 389"
            fill="none"
          >
            <path
              ref={pathRef}
              d="
                M0.0449 379.253
                C192.229 387.988 126.058 2.746 331.999 2.746
                C509.549 2.746 468.275 387.988 652.597 387.988
                C863.704 387.988 777.953 0.999 972.321 0.999
              "
              stroke="#E8B879"
              strokeWidth="2"
              strokeDasharray="6 6"
              fill="none"
            />
          </svg>

          {points.map((p, i) => (
            <div key={i} className="absolute" style={{ left: 0, top: i % 2 === 0 ? "-18px" :"18px" }}>
              <svg
                className="absolute pointer-events-none"
                style={{ left: 0, top: 0 }}
                width="100%"
                height="100%"
              >
                <line
                  x1={p.anchorX}
                  y1={p.anchorY}
                  x2={p.iconX}
                  y2={p.iconY}
                  stroke="#E8B879"
                  strokeWidth="1.5"
                />
                <circle
                  cx={p.anchorX}
                  cy={p.anchorY}
                  r="3"
                  fill="#E8B879"
                />
              </svg>

              <div
                className={`absolute flex flex-col -translate-x-1/2 -translate-y-1/2
                 h-[120px] w-[120px] rounded-full border border-sublime-gold
                 bg-black/60 backdrop-blur-md flex items-center justify-center ${
                   i % 2 === 0 ? '' : 'rotate-180'
                 }`}
                style={{
                  left: p.iconX,
                  top: p.iconY
                }}
              >
                <div className="absolute h-2 w-2 rounded-full bg-sublime-gold -bottom-2">
                  <div className="absolute h-4 w-0.5 -translate-x-1/2 left-[50%] bg-sublime-gold -bottom-4"></div>
                </div>

                <GifContainer
                  className={`${i % 2 === 0 ? '' : 'rotate-180'} h-[70%] w-[70%]`}
                  gifUrl={features[i].icon}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;  