import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ArrowUpRight, Divide } from "lucide-react";
import AnimatedTitle from "./ui/AnimatedTitle";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import founderFrame from "../assests/FoundFrame.png";
import founderImage from "../assests/ownerImg.png";
import Divider from "./Divider";

gsap.registerPlugin(ScrollTrigger);

const Founder: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.fromTo(
        ".founder-text p",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        },
        0.2
      );

      tl.fromTo(
        ".founder-btn",
        { y: 20, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
        },
        0.6
      );

      tl.fromTo(
        ".founder-img-mask",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.5,
          ease: "power4.inOut",
        },
        0
      );

      tl.fromTo(
        ".founder-img",
        { scale: 1.15, y: 40 },
        { scale: 1, y: 0, duration: 1.5, ease: "power2.out" },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-40 bg-sublime-dark relative overflow-hidden"
    >
      {/* SVG CLIP PATH */}
 <svg width="0" height="0" style={{ position: "absolute" }}>
  <defs>
    <clipPath id="insideCircularCut" clipPathUnits="objectBoundingBox">
      <path
        d="
          M0.1,0
          H1
          V0.9
          Q0.9,0.9 0.9,1
          H0
          V0.1
          Q0.1,0.1 0.1,0
          Z
        "
      />
    </clipPath>
  </defs>
</svg>



      <div className="max-w-[1180px]  mx-auto px-6">
        {/* TITLE */}
        <AnimatedTitle
          title="From Our Founder"
          subtitle="The Story"
          align="center"
            containerClass="mb-6"
          text="#E8B879"
             textClass='font-gotham'
        />

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT TEXT */}
          <div className="founder-text space-y-8 text-sublime-light/70 font-unbounded text-[16px] leading-8 tracking-wide">
            <p className="opacity-0 will-change-transform font-unbounded">
         More than tea, spices, nuts, or honey, Sublime House of Tea is an appreciative experience of Health and Wellness. Founded in 2013, Sublime House of Tea, much like Prestige, is an initiative, which brings together, supreme quality, trust, authenticity, and freshness to your daily lives, through your kitchens.
            </p>

            <p className="opacity-0 will-change-transform">
       Yet, despite the vast array of tea varieties available, only a few  classic options have managed to gain mainstream popularity.  Tea holds immense potential beyond its current status of being a  classic beverage—chai. While nothing compares to the  brilliance of Kadak chai, it's important to remember that tea can  be much more than that.
            </p>

            <div className="founder-btn opacity-0 mt-12 flex items-center gap-6">
              <button className="px-10 py-4 border border-sublime-light text-sublime-light rounded-full text-xs tracking-[0.2em] uppercase hover:bg-sublime-gold hover:text-sublime-dark transition">
                Read Our Story
              </button>

              <div className="w-14 h-14 border border-sublime-light rounded-full flex items-center justify-center hover:bg-sublime-gold hover:text-sublime-dark transition cursor-pointer">
                <ArrowUpRight size={20} strokeWidth={1} />
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="founder-img-mask relative max-w-xl w-full">
              <div className="relative w-full h-[600px] flex items-center justify-center">
                {/* FRAME */}
             

                {/* IMAGE CUT */}
                <div className="relative  w-full h-full p-2 z-20">
                  <div
                  
                    className="relative  w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={founderImage}
                      alt="Uzma Irfan"
                      className="max-w-full clip-frame max-h-[80%] object-contain founder-img"
                    />
                  </div>
                </div>
              </div>

              {/* TEXT BELOW */}
              <div className="-mt-12 text-center">
                <h4 className="text-sublime-gold font-gotham text-xl tracking-wide">
                  Uzma Irfan
                  <Divider width={20}/>
                </h4>
                <p className="text-white/50 text-xs font-gotham uppercase tracking-[0.35em] mt-2">
                  Founder, Sublime House of Tea
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
