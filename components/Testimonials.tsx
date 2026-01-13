


import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Star } from 'lucide-react';
import AnimatedTitle from './ui/AnimatedTitle';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import reviewImg from "../assests/reviewSvg.png";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop";

const reviews = [
  {
    name: "Anita Sharma",
    location: "Bengaluru",
    text: "Sublime Signature Black Tea is pure perfection! The aroma is refreshing, the taste is soothing, and it instantly uplifts my mood.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    title: "Exceptional Quality",
  },
  {
    name: "Vaibhav Vedsav",
    location: "Kolkata",
    text: "Our whole family loves Sublime Moroccan Mint Tea! It's refreshing, natural, and packed with antioxidants.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Rich Aroma With Taste",
  },
  {
    name: "Paola Sebastian",
    location: "Mumbai",
    text: "Sublime Dry Fruits are pure perfection! The aroma is refreshing, the taste is soothing, and it instantly uplifts my mood.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    title: "Exceptional Support",
  },
];

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ===============================
     PREMIUM SCROLL ANIMATION
  =============================== */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      /* 1️⃣ CARD DEPTH REVEAL */
      gsap.fromTo(
        ".review-card",
        {
          y: 80,
          rotateX: 6,
          transformPerspective: 1200,
        },
        {
          y: 0,
          rotateX: 0,
          ease: "power3.out",
          stagger: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "top 60%",
            scrub: true,
          },
        }
      );

      /* 2️⃣ IMAGE PARALLAX */
      gsap.utils.toArray<HTMLElement>(".review-avatar").forEach((img) => {
        gsap.fromTo(
          img,
          { y: -6 },
          {
            y: 6,
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

      /*  SCROLL VELOCITY TILT */
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const tilt = gsap.utils.clamp(-2, 2, self.getVelocity() / 900);
          gsap.to(".review-card", {
            rotateX: tilt,
            duration: 0.25,
            ease: "power2.out",
          });
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ===============================
     MAGNETIC HOVER (SUBTLE)
  =============================== */
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      y: -10,
      rotateX: -2,
      duration: 0.6,
      ease: "power3.out",
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
  };

  return (
    <section
      ref={containerRef}
      className="py-12 bg-sublime-dark relative border-t border-white/5"
    >
      <div className="max-w-[1180px] mx-auto  px-6">
        <AnimatedTitle
          title="What Our Customers Say"
          subtitle="Hear From Our Customers"
          containerClass="mb-6"
          text="#E8B879"
             textClass='font-gotham'
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-center">
          {reviews.map((review, index) => (
            <div key={index} className="relative  review-card overflow-hidden flex justify-center">

              {/* DECOR TOP */}
            

              {/* CARD */}
              <div
               
                className={`
                 
                  relative z-10
                  ${index === 1 ? "min-h-[460px] " : "min-h-[400px]"}
                  w-full
                  flex flex-col border  items-center text-center
                  bg-[#FFF7EA]
                  px-10 py-6
                  rounded-3xl
                  shadow-xl shadow-gray-800/40
                `}
              >

                  <div className="absolute -top-20 -right-28 h-48 w-48 z-[50] pointer-events-none">
                <img src={reviewImg} className="w-full h-full object-contain" />
              </div>

              {/* DECOR BOTTOM */}
              <div className="absolute h-48 w-48 z-[50] -bottom-28 -left-28 rotate-180 pointer-events-none">
                <img src={reviewImg} className="w-full h-full object-contain" />
              </div>
                {/* AVATAR */}
                <div className="w-32  h-32 rounded-full border border-black/20 p-1 bg-gold shadow-xl">
                  <img
                    src={review.image}
                    onError={(e) => (e.currentTarget.src = FALLBACK_AVATAR)}
                    className="review-avatar w-full h-full rounded-full object-cover"
                  />
                </div>

                {/* STARS */}
                <div className="mt-6 mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={28} className="fill-sublime-gold text-sublime-gold" />
                  ))}
                </div>

                <h4 className="font-gotham opacity-80 text-xl text-[#0C6A64] font-medium mb-4">
                  {review.title}
                </h4>

                <p className="text-[16px] font-medium leading-7 text-black/70 mb-6">
                  “{review.text}”
                </p>

                <div className="text-xs uppercase tracking-widest text-red-500 font-semibold">
                  {review.name}
                  <span className="ml-2">{review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
