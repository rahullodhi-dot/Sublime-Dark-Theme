import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import AnimatedTitle from './ui/AnimatedTitle';
import backVideo from '../assests/HeroBackVideo.mp4';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cinematic Background Parallax
      gsap.to(imageRef.current, {
        yPercent: 20,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.0
        }
      });
      
      // 2. Continuous "Breathing" for background
      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // 3. CTA Animation - Staggered 3D Reveal
      const buttons = document.querySelectorAll('.hero-btn');
      gsap.fromTo(buttons, 
        { 
            y: 40, 
            autoAlpha: 0, 
        },
        { 
            y: 0, 
            autoAlpha: 1, 
            duration: 1.2, 
            stagger: 0.1,
            delay: 1.2, // Wait for title
            ease: "power3.out"
        }
      );

      // 4. Scroll Indicator
      gsap.fromTo(".scroll-indicator",
        { y: -30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.5, delay: 2.0, ease: "power3.out" }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleBtnEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1.02, duration: 0.4, ease: "power2.out" });
    gsap.to(e.currentTarget.querySelector('.btn-bg'), { opacity: 0.15, duration: 0.4 });
    gsap.to(e.currentTarget.querySelector('.btn-text'), { letterSpacing: '0.3em', duration: 0.4 });
  };
  
  const handleBtnLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(e.currentTarget.querySelector('.btn-bg'), { opacity: 0.05, duration: 0.4 });
    gsap.to(e.currentTarget.querySelector('.btn-text'), { letterSpacing: '0.25em', duration: 0.4 });
  };
  
  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
  };

  return (
    <div ref={containerRef} className="relative  w-full h-[120vh] overflow-hidden -mt-[100px] md:-mt-[120px] perspective-1000"> 
      
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
    
        <video src={backVideo} autoPlay muted loop className="w-full h-[130%] object-cover object-center filter brightness-[1]"></video>
        {/* Cinematic Vignette & Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sublime-dark/60 via-transparent to-sublime-dark pointer-events-none"></div>
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 w-full h-screen flex flex-col justify-center items-center px-4 pt-24">
        <div className="max-w-6xl mx-auto text-center perspective-1000">
          
          <AnimatedTitle 
          showDivider={false}
            title="Serenity in Every Moment"
            subtitle="Exquisite Craftsmanship"
            sectionType="hero"
            align="center"
            textClass="text-5xl md:text-7xl lg:text-9xl italic tracking-tight drop-shadow-2xl"
          />

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10">
            <button 
                className="hero-btn group relative px-12 py-5 rounded-full overflow-hidden transition-all duration-500 border border-white/20 hover:border-sublime-gold/60"
                onMouseEnter={handleBtnEnter}
                onMouseLeave={handleBtnLeave}
                onClick={handleBtnClick}
            >
              <div className="btn-bg absolute inset-0 bg-sublime-gold opacity-[0.05] transition-opacity duration-300"></div>
              <span className="btn-text relative font-unbounded text-sm tracking-[0.25em] uppercase text-sublime-light group-hover:text-sublime-gold transition-colors duration-300 block">
              Explore Now 
              </span>
            </button>
            
            {/* <button 
                className="hero-btn flex items-center gap-4 text-sublime-light/80 hover:text-sublime-gold transition-colors duration-300 group"
                onMouseEnter={(e) => gsap.to(e.currentTarget, { x: 5, duration: 0.5 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, duration: 0.5 })}
            > */}
              {/* <span className="text-xs uppercase tracking-widest font-light border-b border-transparent group-hover:border-sublime-gold transition-colors pb-1">View Showreel</span> */}
              {/* <div className="w-12 h-12 rounded-full border border-sublime-light/20 flex items-center justify-center group-hover:border-sublime-gold group-hover:rotate-45 transition-all duration-500 bg-white/5 backdrop-blur-sm">
                <ArrowUpRight size={24} strokeWidth={1} />
              </div> */}
            {/* </button> */}
            
          </div>

        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-32 md:bottom-12 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center opacity-0 pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.3em] text-sublime-gold/60 mb-6">Scroll</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-sublime-gold/30 to-transparent relative overflow-hidden">
          <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-transparent to-sublime-gold animate-slide-down opacity-80"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;