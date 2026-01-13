import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import footervideo from "../assests/footerVideo.mp4";

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [".footer-title", ".footer-text", ".footer-form > *"],
        { opacity: 0, y: 40 }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          once: true,
          toggleActions:"play reverse play reverse"
        },
      });

      tl.to(".footer-title", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
      })
        .to(
          ".footer-text",
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          ".footer-form > *",
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative min-h-[70vh] py-24 border-t border-white/10 text-sublime-light overflow-hidden"
    >
      {/* VIDEO BG */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          src={footervideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col  mt-20 items-center text-center">
        <h3 className="footer-title font-gotham text-3xl md:text-5xl max-w-3xl mb-6">
          Subscribe to our newsletter for more updates.
        </h3>

        <p className="footer-text font-gotham text-white/80 text-sm md:text-base max-w-2xl mb-10 uppercase">
          Sublime House of Tea is more than just a cup of tea, a jar of honey, or a
          spice. Founded in 2013, Sublime brings freshness and authenticity.
        </p>

        <div className="footer-form flex w-full max-w-xl flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Your Email Address"
            className="flex-1 bg-white/5 border border-white rounded-full px-8 py-4 text-sm text-white placeholder:text-white/60 focus:outline-none"
          />
          <button className="px-10 py-4 font-gotham border border-white text-white rounded-full text-xs uppercase tracking-widest hover:bg-sublime-gold hover:text-sublime-dark transition">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
