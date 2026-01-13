import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from './ui/AnimatedTitle';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import RotatedLuxuryText from './RotateText';
import lemon from '../assests/lemon.gif'
import ginger from '../assests/ginger.gif'
import honey from '../assests/honey.gif'
import redTea from '../assests/redTea.gif'
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from 'lucide-react';


gsap.registerPlugin(ScrollTrigger);

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=1000&auto=format&fit=crop";

const slides = [
  { img: lemon, title: 'Morning Rituals' },
  { img: ginger, title: 'Afternoon Delight' },
  { img: honey, title: 'Evening Calm' },
  { img: redTea, title: 'Wellness Brews' }
];

const Curated: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {
  const ctx = gsap.context(() => {

    /* ===============================
       1. CARD DEPTH REVEAL (NO LOADING)
    =============================== */
    gsap.fromTo(
      ".curated-card",
      {
        y: 40,
        rotateX: 6,
        transformPerspective: 1200,
      },
      {
        y: 0,
        rotateX: 0,
        opacity:1,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 40%",
          scrub: true, // scroll controls motion
        },
      }
    );

    /* ===============================
       2. IMAGE PARALLAX (EDITORIAL)
    =============================== */
    gsap.utils.toArray<HTMLElement>(".curated-card img").forEach((img) => {
      gsap.fromTo(
        img,
        { y: -80 },
        {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    });

    /* ===============================
       3. SCROLL VELOCITY TILT
    =============================== */
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      toggleActions: "play reverse play reverse",
      onUpdate: (self) => {
        const tilt = gsap.utils.clamp(0, 0, self.getVelocity() / 900);

        gsap.to(".curated-card", {
          rotateX: tilt,
          duration: 0.25,
          ease: "power2.out",
        });
      },
    });

  }, containerRef);

  return () => ctx.revert();
}, []);




 const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;

  gsap.to(card, {
    y: -10,
    rotateX: -2,
    duration: 0.6,
    ease: "power3.out",
  });

  gsap.to(card.querySelector("img"), {
    scale: 1,
    duration: 0.8,
    ease: "power2.out",
  });
};

const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;

  gsap.to(card, {
    y: 0,
    rotateX: 0,
    duration: 0.6,
    ease: "power3.out",
  });

  gsap.to(card.querySelector("img"), {
    scale: 1,
    duration: 0.8,
    ease: "power2.out",
  });
};


  return (
    <section ref={containerRef} className="py-24 overflow-hidden bg-sublime-dark border-t border-white/5 relative z-10">
      <RotatedLuxuryText side="right" position="right-20" />
      <RotatedLuxuryText side="left" position="left-20" />
      <div className="max-w-[1180px] mx-auto px-6">
        <AnimatedTitle
          title="Shop the Best"
          subtitle="GO THROUGH OUR BEST"
          containerClass=""
          text="#E8B879"
             textClass='font-gotham'
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {slides.map((slide, index) => (
            <div key={index} className="relative">

              {/* 🌿 DECORATION (NOT CLIPPED) */}
              {index === 3 && <svg
                className="absolute top-[-20%] right-[-20%] rotate-90 w-48 h-48 opacity-80 pointer-events-none z-0"
                xmlns="http://www.w3.org/2000/svg" width="141" height="122" viewBox="0 0 141 122" fill="none">
                <g clip-path="url(#clip0_229_433)">
                  <path d="M53.2312 53.2309L53.2312 32.9525M67.1727 67.1724L67.1727 51.9635M67.1727 34.2199L67.1727 42.458M79.8468 79.8464L79.8468 70.3409M79.8468 41.8243L79.8468 60.8353M86.1838 86.1834C97.3826 74.9846 97.2204 56.6631 85.8213 45.2641C74.511 33.9538 54.8383 27.2239 40.0223 32.6052C38.3178 33.222 36.7696 34.2059 35.4875 35.4873M86.1838 86.1834C74.985 97.3821 56.6634 97.2199 45.2643 85.8209C41.2441 81.8007 37.8043 76.7235 35.2771 71.185M86.1838 86.1834L35.4875 35.4873M35.4875 35.4873C34.2201 36.7547 33.2315 38.2959 32.6054 40.0221C30.4432 45.9763 30.2379 52.7113 31.4977 59.3804" stroke="#E8B879" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" />
                </g>
                <g clip-path="url(#clip1_229_433)">
                  <path d="M116.216 67.3333L125.174 64.9333M111.708 75.1415L118.426 73.3414M126.264 71.2413L122.625 72.2164M107.61 82.2397L111.809 81.1147M124.405 77.7396L116.008 79.9897M105.561 85.7889C111.833 89.4101 119.907 87.1699 123.593 80.7857C127.25 74.4512 127.894 64.9651 123.764 59.0577C123.29 58.3778 122.672 57.8104 121.954 57.3957M105.561 85.7889C99.289 82.1677 97.1922 74.0557 100.878 67.6715C102.178 65.4199 104.014 63.2996 106.161 61.5278M105.561 85.7889L121.954 57.3957M121.954 57.3957C121.244 56.9859 120.446 56.7317 119.61 56.6594C116.724 56.4091 113.725 57.1155 110.928 58.4613" stroke="#E8B879" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" />
                </g>
                <g clip-path="url(#clip2_229_433)">
                  <path d="M98.4176 101.72L95.6447 106.523M97.0221 96.5121L94.9424 100.114M92.5161 104.317L93.6426 102.366M95.7534 91.7773L94.4536 94.0286M90.5542 100.783L93.1538 96.2799M95.119 89.4099C90.9353 90.5309 88.4684 94.8924 89.6095 99.1509C90.7417 103.376 94.4807 107.66 98.7257 108.412C99.2137 108.499 99.7149 108.477 100.194 108.349M95.119 89.4099C99.3027 88.2889 103.62 90.8326 104.761 95.0911C105.163 96.593 105.284 98.2658 105.125 99.9232M95.119 89.4099L100.194 108.349M100.194 108.349C100.667 108.222 101.112 107.992 101.496 107.669C102.823 106.555 103.792 104.988 104.406 103.236" stroke="#E8B879" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" />
                </g>
                <defs>
                  <clipPath id="clip0_229_433">
                    <rect width="86.0343" height="86.0343" fill="white" transform="matrix(0.707108 -0.707105 0.707108 0.707105 0 60.8353)" />
                  </clipPath>
                  <clipPath id="clip1_229_433">
                    <rect width="39.3428" height="39.3428" fill="white" transform="matrix(0.866026 0.499998 -0.500002 0.866024 106.558 44.7207)" />
                  </clipPath>
                  <clipPath id="clip2_229_433">
                    <rect width="23.5289" height="23.5288" fill="white" transform="matrix(-0.965926 0.258818 -0.25882 -0.965926 112.064 107.198)" />
                  </clipPath>
                </defs>
              </svg>}

              {/*  CARD (CLIPPED) */}
              <div
                className="curated-card relative p-0 m-0  w-full aspect-[3/5] group overflow-hidden rounded-t-[12rem] bg-[#0a1510] cursor-pointer opacity-0 will-change-transform"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* BORDER */}
                <div className="card-border absolute inset-0 pointer-events-none z-30 " />

                {/* OVERLAYS */}
                {/* <div className="overlay-dim absolute inset-0 bg-black opacity-0 transition-opacity duration-500 z-10 pointer-events-none" /> */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 pointer-events-none" />

                {/* IMAGE */}
                <img
                  src={slide.img}
                  onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                  alt={slide.title}
                  className="relative z-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* TEXT */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-end p-8 text-center pointer-events-none">
                  <h3 className="curated-title font-gotham text-xl text-white/80  drop-shadow-xl">
                    {slide.title}
                  </h3>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-sublime-gold">
                      View Collection
                    </span>
                    <ArrowUpRight size={14} className="text-sublime-gold" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="mt-8 flex justify-center">
          <button className="h-fit w-fit p-2 rounded-full  border border-sumblime-gold  text-sublime-light rounded-full text-xs tracking-[0.2em] uppercase hover:bg-sublime-gold hover:text-sublime-dark transition">
            <ArrowLeft />
          </button>

          <div className="mx-4 flex items-center gap-2">
            <div className="w-4 h-2 rounded-full bg-sublime-gold"></div>
            <div className="w-12 h-2 rounded-full bg-sublime-gold"></div>
            <div className="w-4 h-2 rounded-full bg-sublime-gold"></div>

          </div>

          <button className="h-fit w-fit p-2 rounded-full  border border-sumblime-gold  text-sublime-light rounded-full text-xs tracking-[0.2em] uppercase hover:bg-sublime-gold hover:text-sublime-dark transition">
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Curated;