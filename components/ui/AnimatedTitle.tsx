import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Divider from '../Divider';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  title: string;
  containerClass?: string;
  textClass?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  sectionType?: 'hero' | 'standard';
  text?: string;
  showDivider:boolean
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ 
  showDivider=true,
  title, 
  containerClass = 'font-gotham', 
  textClass = '', 
  subtitle,
  align = 'center',
  sectionType = 'standard',
  text="#ffffff"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = title.split(' ');
  const isHero = sectionType === 'hero';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: isHero ? "top 80%" : "top 70%", 
          end: "bottom 20%",
         toggleActions: "play reverse play reverse",

        }
      });

      // 1. Subtitle Reveal
      if (subtitle) {
        tl.fromTo(".anim-subtitle", 
          { y: 20, opacity: 0, letterSpacing: '0.05em' },
          { y: 0, opacity: 1, letterSpacing: '0.2em', duration: 1.5, ease: "power3.out" },
          0
        );
      }

      // 2. Title Character Reveal
      if (isHero) {
        // Hero: Luxury 3D Character Flip (Preserving Original)
        tl.fromTo(".anim-char", 
          { 
            y: 80, 
            opacity: 0,
            rotateX: 90, 
          },
          { 
            y: 0, 
            opacity: 1, 
            rotateX: 0,
            stagger: 0.02, 
            duration: 1.4, 
            ease: "expo.out" 
          },
          0.1
        );
      } else {
        // Standard: Premium Letter Reveal (New Spec)
        // Slight Y-axis movement, subtle rotation, smooth stagger
        tl.fromTo(".anim-char", 
          { 
            y: 40, 
            opacity: 0,
            rotateX: 45,
            scale: 0.95
          },
          { 
            y: 0, 
            opacity: 1, 
            rotateX: 0,
            scale: 1,
            stagger: 0.015, 
            duration: 1.2, 
            ease: "power3.out" 
          },
          0.1
        );
      }
      
      // 3. Decorative Elements
      if (align === 'center') {
        tl.fromTo(".deco-line",
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 0.5, duration: 1.5, ease: "expo.out" },
            0.5
        );
        tl.fromTo(".deco-symbol",
            { scale: 0, rotate: -90, opacity: 0 },
            { scale: 1, rotate: 45, opacity: 1, duration: 1.2, ease: "back.out(1.7)" },
            0.6
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, [title, subtitle, isHero, align]);

  const alignmentClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
  const flexAlign = align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start';

  return (
    <div ref={containerRef} className={`flex flex-col ${flexAlign} ${containerClass} mt-16 perspective-1000`}>
      {subtitle && (
        <p className={`anim-subtitle text-[${text}] text-xs md:text-sm mb-2   uppercase font-gotham ${alignmentClass} font-medium opacity-0 will-change-transform`}>
          {subtitle}
        </p>
      )}
      
      <h2 className={`   text-[${text}] text-6xl   mx-auto   ${textClass} ${alignmentClass} `}>
        {words.map((word, wordIndex) => (
          <span 
            key={wordIndex} 
            className={`inline-block whitespace-nowrap mr-[0.25em] ${containerClass}`}
          >
            {word.split('').map((char, charIndex) => (
              <span 
                key={charIndex} 
                className="anim-char inline-block origin-bottom transform-style-3d will-change-transform opacity-0"
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </h2>
      
      {/* Decorative Line for Center Alignment */}
      {align === 'center' && showDivider && (
        <div className="w-full flex justify-center -mt-2 items-center gap-6 opacity-80">
          <Divider width={50}/>
           {/* <div className="deco-line h-[1px] w-12 md:w-24 bg-gradient-to-l from-sublime-gold to-transparent origin-right opacity-0 will-change-transform"></div>
           <div className="deco-symbol text-sublime-gold text-[10px] opacity-0 will-change-transform">◆</div>
           <div className="deco-line h-[1px] w-12 md:w-24 bg-gradient-to-r from-sublime-gold to-transparent origin-left opacity-0 will-change-transform"></div> */}
        </div>
      )}
    </div>
  );
};

export default AnimatedTitle;