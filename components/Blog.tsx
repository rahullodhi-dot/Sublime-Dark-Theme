import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Eye } from 'lucide-react';
import AnimatedTitle from './ui/AnimatedTitle';
import RotatedLuxuryText from './RotateText';
import looseTea from '../assests/Loose-tea.png'
import Honey from '../assests/Honey.png'
import Spices from '../assests/spice1.png'
import DryFruits from '../assests/Dryfruits.png'
import blog1 from "../assests/blog1.png"
import blog2 from "../assests/blog2.png"
import blog3 from "../assests/blog3.png"


gsap.registerPlugin(ScrollTrigger);

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=1600&auto=format&fit=crop";

const categories = [
    {
        title: 'Refreshing Blends to Uplift the Spirit of Ramadan with Sublime House of Tea',
        description: 'During the auspicious month of Ramadan, Muslims around the globe eagerly await the opportunity for self-reflection, spiritual growth and communal gatherings. In addition to the fasting and prayers, people come together to share a tradition of breaking fast, or iftar, with loved ones and friends.',
        views: '2.4K',
        link: '#',
        img: blog1,
    },
    {
        title: 'Tea-riffic Treats: Discovering the Unique Gift Sets for Tea Enthusiasts',
        description: 'In India, tea is not a simple beverage, but an emotion with complex notes of history, flavor, cultural significance and heritage. It is an emotion that many in the country adore and appreciate. But for a true connoisseur, tea is an adventure of flavor and fragrances, something that Sublime House of Tea prides itself',
        views: '1.8K',
        link: '#',
        img: blog2,
    },
    {
        title: 'Corporate Gifting Redefined: A Guide to Meaningful & Memorable Presents',
        description: 'An average person spends around 90,000 hours at work over a lifetime. That’s one-third of your life, which means a conducive workplace environment that fosters growth and learning is crucial for one’s well-being. Appreciation of employees is also an important aspect of a healthy working environment. And so, in the',
        views: '3.1K',
        link: '#',
        img: blog3,
    },
];


const Blog: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%", // Centered viewport trigger
                    once: true
                }
            });

            // Reveal Capsules
            tl.fromTo(".category-capsule",
                {
                    y: 60,
                    opacity: 0,
                    scale: 0.95,
                    rotationX: 10
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotationX: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power3.out",
                    clearProps: "transform" // Ensures hover transform works cleanly after animation
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // 3D Tilt Interaction




    return (
        <section ref={containerRef} className="py-32  bg-[#0B1C14] relative overflow-hidden  perspective-2000">

            <RotatedLuxuryText side="right" position="right-20" />
            <RotatedLuxuryText side="left" position="left-20" />




            <div className="absolute inset-0 opacity-[0.03]  bg-texture pointer-events-none mix-blend-overlay"></div>

            <div className="container mx-auto px-6">
                <AnimatedTitle
                    text="#E8B879"
                    title="Our Latest Blog"
                    subtitle="LATEST UPDATES"
                    containerClass="mb-6"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 oveflow-scroll gap-2 md:gap-1">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className="category-capsule overflow-hidden rounded-xl  border-2 border-sublime-gold group relative  w-[450px] h-[550px] bg-[#0a1510]  shadow-2xl opacity-0"
                        >


                            {index === 0 && <svg
                                className="absolute  inset-0 z-0 -top-24"
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
                            {/* IMAGE */}
                            <div className="relative w-full h-[50%] overflow-hidden">
                                <img
                                    src={cat.img}
                                    onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                                    alt={cat.title}
                                    className="w-full  rounded-xl h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* OVERLAY */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                {/* VIEWS */}
                                <div className="absolute flex gap-1 justify-center top-4 right-4 text-xs text-white/80 bg-black/40 px-3 py-1 rounded-full backdrop-blur">
                                    <Eye size={14} />
                                    {cat.views}
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className=" p-5 flex flex-col justify-between">
                                {/* TITLE */}
                                <h3 className="font-serif text-[24px] font-[400px] text-sublime-gold tracking-wide leading-snug">
                                    {cat.title}
                                </h3>

                                {/* DESCRIPTION */}
                                <p className="text-[16px]  text-white/70 font-light line-clamp-4 mt-2">
                                    {cat.description}
                                </p>

                                {/* READ MORE */}
                                <div className="mt-4 flex items-center gap-2 text-sublime-gold text-sm cursor-pointer group-hover:gap-3 transition-all">
                                    <span className="uppercase tracking-widest">Read More</span>
                                    <ArrowUpRight size={18} />
                                </div>
                            </div>
                        </div>


                    ))}
                </div>

                <div className=" flex justify-center items-center py-5 mt-10 gap-3">
                    <button className="px-10  py-3 rounded-full  border  border-sublime-light  text-2xl">View More Article</button>
                    <button className="h-fit w-fit p-5 border rounded-full"><ArrowUpRight/></button>
                </div>

            </div>
        </section>
    );
};

export default Blog;