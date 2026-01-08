import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import AnimatedTitle from './ui/AnimatedTitle';
import RotatedLuxuryText from './RotateText';
import looseTea from '../assests/Loose-tea.png'
import Honey from '../assests/Honey.png'
import Spices from '../assests/spice1.png'
import DryFruits from '../assests/Dryfruits.png'

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=1600&auto=format&fit=crop";

const categories = [
  { name: 'Loose Tea', link: '#', img: looseTea },
  { name: 'Premium Honey', link: '#', img: Honey },
  { name: 'Exotic Spices', link: '#', img: Spices },
  { name: 'Dry Fruits', link: '#', img: DryFruits },
];

const Categories: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

 useLayoutEffect(() => {
  const ctx = gsap.context(() => {

    /* CARD REVEAL */
    gsap.fromTo(
      ".category-capsule",
      {
        y: 80,
        opacity: 0,
        scale: 0.9,
        rotationX: 15,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    /* TEXT ANIMATION (NAME) */
    gsap.fromTo(
      ".category-text",
      {
        y: 30,
        opacity: 0,
        filter: "blur(6px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "bottom 35%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    /* ARROW ICON */
    gsap.fromTo(
      ".category-arrow",
      {
        x: -10,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "bottom 35%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

  }, containerRef);

  return () => ctx.revert();
}, []);


  // 3D Tilt Interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000
    });

    // Parallax Image
    const img = card.querySelector('.capsule-img');
    gsap.to(img, {
      scale: 1.15,
      x: (x - centerX) * 0.05,
      y: (y - centerY) * 0.05,
      duration: 0.4
    });

    // Content Lift
    gsap.to(card.querySelector('.content-wrapper'), { y: -10, duration: 0.4 });
    gsap.to(card.querySelector('.btn-reveal'), { opacity: 1, y: 0, duration: 0.4 });
    gsap.to(card.querySelector('.overlay-glow'), { opacity: 0.5, duration: 0.4 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: "power3.out" });
    gsap.to(card.querySelector('.capsule-img'), { scale: 1, x: 0, y: 0, duration: 0.6 });
    gsap.to(card.querySelector('.content-wrapper'), { y: 0, duration: 0.4 });
    gsap.to(card.querySelector('.btn-reveal'), { opacity: 0, y: 10, duration: 0.4 });
    gsap.to(card.querySelector('.overlay-glow'), { opacity: 0, duration: 0.4 });
  };

  return (
    <section ref={containerRef} className="py-6  o bg-sublime-dark relative  perspective-2000">

      <RotatedLuxuryText side="right" position="right-20" />
      <RotatedLuxuryText side="left" position="left-20" />




      <div className="absolute inset-0 opacity-[0.03] bg-texture pointer-events-none mix-blend-overlay"></div>

      <div className="container mx-auto px-6">
        <AnimatedTitle
        text="#E8B879"
          title="Shop by Category"
          subtitle="SOMETHING FOR EVERYONE"
          containerClass="mb-6"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="category-capsule flex flex-col items-center group relative w-full cursor-pointer opacity-0 will-change-transform transform-style-3d"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
             { index === 0 && <svg
              className="absolute top-[-20%] left-[-20%] w-48 h-48 opacity-80 pointer-events-none z-0"
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
              {/* IMAGE CAPSULE */}
              <div className="relative w-full aspect-[9/16] rounded-full overflow-hidden bg-[#0a1510] shadow-2xl">
                <div className="overlay-glow absolute inset-0 bg-sublime-gold/30 mix-blend-overlay opacity-0 transition-opacity duration-500 z-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 pointer-events-none"></div>

                <img
                  src={cat.img}
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  alt={cat.name}
                  className="capsule-img w-full h-full object-cover transition-transform duration-700"
                />
              </div>

              {/* CONTENT BELOW IMAGE */}
              <div className="mt-6 flex  items-center text-center z-20">
                <span className="font-serif  text-2xl text-sublime-gold tracking-wide drop-shadow-lg px-4">
                  {cat.name}
                </span>

                <div className="btn-reveal mt-3 flex items-center gap-2 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">

                  <ArrowUpRight size={24} className="text-sublime-gold" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;