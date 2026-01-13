import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import foolterLogo from "../assests/footerLogo.png";
import footerImage from "../assests/MainFooterImg.png";
import ButterFly from "./ButterFly";
import Divider from "./Divider";

gsap.registerPlugin(ScrollTrigger);

const MainFooter: React.FC = () => {
  const footerRef = useRef(null);
  const items = useRef<HTMLElement[]>([]);

  const addItem = (el: any) => {
    if (el && !items.current.includes(el)) items.current.push(el);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(items.current, {
        opacity: 0,
        y: 22,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
          toggleActions:"play reverse play reverse"
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#0B1C14] h-[70vh] text-white relative overflow-hidden"
    >
      {/* butterflies */}
      <ButterFly className="top-48 left-[30px] absolute z-10 rotate-45" />
      <ButterFly className="top-24 left-[320px] absolute z-10 rotate-90" />
      <ButterFly className="top-64 left-[280px] absolute z-10 rotate-135" />
      <ButterFly className="top-[57px] right-[10px] absolute z-10" />
      <ButterFly className="top-[11px] right-[330px] absolute z-10 rotate-45" />
      <ButterFly className="top-[300px] right-[206px] absolute z-10 rotate-90" />

      {/* background images */}
      <div className="max-w-xl absolute left-0 top-0 opacity-70">
        <img src={footerImage} alt="" className="h-full w-full" />
      </div>
      <div className="absolute right-0 top-0 scale-x-[-1] max-w-lg opacity-70">
        <img src={footerImage} alt="" />
      </div>

      <div className="relative z-20 container mx-auto px-6">

        {/* LOGO */}
        <div ref={addItem} className="text-center mx-auto mb-10 w-[197px] h-[102px]">
          <img src={foolterLogo} alt="" className="h-full w-full" />
          <Divider width={100} />
        </div>

        {/* TAGLINE */}
        <p
          ref={addItem}
          className="max-w-xl mx-auto text-center font-gotham text-[16px] leading-[30px] text-white/90 mb-6"
        >
          Sublime House of Tea is more than just a cup of tea, a jar of honey, or a spice. Founded in 2013, Sublime aims to bring freshness, superior quality, and authenticity to our daily lives.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[1180px] mx-auto lg:grid-cols-4 gap-14 border-t border-white/10 pt-16 text-white">
          
          {/* Discover */}
          <div>
            <h4 ref={addItem} className="text-[16px] uppercase tracking-widest mb-8">
              Discover
            </h4>
            <ul className="space-y-4 text-sm text-white/95">
              {/* {["FAQs", "About Us", "Blog", "Our Products", "Contact Us"].map((item) => (
                <li
                  ref={addItem}
                  key={item}
                  className="hover:text-sublime-gold text-sublime-light transition cursor-pointer"
                >
                  hkerh
                  {item}
                </li>
              ))} */}

              <li ref={addItem}>FAQs</li>
              <li ref={addItem}>About Us</li>
              <li ref={addItem}>Our Products</li>
              <li ref={addItem}>Contact US</li>
            </ul>
          </div>

          {/* Help Center */}
          <div>
            <h4 ref={addItem} className="text-[16px] uppercase tracking-widest mb-8">
              Help Center
            </h4>
            <ul className="space-y-4 text-sm text-white">
              {/* {["Return & Refund", "Privacy & Policy", "Terms of Service", "Brochure", "Track Order"].map((item) => (
                <li
                  ref={addItem}
                  key={item}
                  className="hover:text-sublime-gold transition cursor-pointer"
                >
                  {item}
                </li>
              ))} */}

              <li ref={addItem}>Return & Refund</li>
              <li ref={addItem}>Privacy & Policy</li>
              <li ref={addItem}>Term & Service</li>
              <li ref={addItem}>Track Order</li>
            </ul>
          </div>

          {/* ADDRESS */}
          <div>
            <h4 ref={addItem} className="text-[16px] uppercase tracking-widest mb-8">
              Address
            </h4>
            <p ref={addItem} className="text-sm text-white/90 leading-relaxed">
              Prestige Falcon Towers,<br />19, Brunton Road,<br />Bengaluru 560025
            </p>
            <p ref={addItem} className="text-sm mt-3 text-white/80">+91 80 6949 6126</p>
            <p ref={addItem} className="text-sm mt-1 text-white/80">hello@sublime.in</p>
          </div>

          {/* FOLLOW */}
          <div>
            <h4 ref={addItem} className="text-[16px] uppercase tracking-widest mb-8">
              Follow Us On
            </h4>
         <div className="flex gap-6 text-white/70">
          <a  className="hover:text-sublime-gold   h-fit w-fit border-sublime-gold rounded-full transition">
             <svg  className="border  p-3 rounded-full"  ref={addItem} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"> <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z" fill="#E8B879" /> </svg> </a> 
             <a   className="hover:text-sublime-gold   h-fit w-fit border-sublime-gold rounded-full  transition"> <svg className="border  p-3 rounded-full"  ref={addItem} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 28 28" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 12.8333C3.5 8.43383 3.5 6.2335 4.86733 4.86733C6.23467 3.50117 8.43383 3.5 12.8333 3.5H15.1667C19.5662 3.5 21.7665 3.5 23.1327 4.86733C24.4988 6.23467 24.5 8.43383 24.5 12.8333V15.1667C24.5 19.5662 24.5 21.7665 23.1327 23.1327C21.7653 24.4988 19.5662 24.5 15.1667 24.5H12.8333C8.43383 24.5 6.2335 24.5 4.86733 23.1327C3.50117 21.7653 3.5 19.5662 3.5 15.1667V12.8333ZM21 8.75C21 9.21413 20.8156 9.65925 20.4874 9.98744C20.1592 10.3156 19.7141 10.5 19.25 10.5C18.7859 10.5 18.3408 10.3156 18.0126 9.98744C17.6844 9.65925 17.5 9.21413 17.5 8.75C17.5 8.28587 17.6844 7.84075 18.0126 7.51256C18.3408 7.18437 18.7859 7 19.25 7C19.7141 7 20.1592 7.18437 20.4874 7.51256C20.8156 7.84075 21 8.28587 21 8.75ZM16.3333 15.1667C16.3333 15.7855 16.0875 16.379 15.6499 16.8166C15.2123 17.2542 14.6188 17.5 14 17.5C13.3812 17.5 12.7877 17.2542 12.3501 16.8166C11.9125 16.379 11.6667 15.7855 11.6667 15.1667C11.6667 14.5478 11.9125 13.9543 12.3501 13.5168C12.7877 13.0792 13.3812 12.8333 14 12.8333C14.6188 12.8333 15.2123 13.0792 15.6499 13.5168C16.0875 13.9543 16.3333 14.5478 16.3333 15.1667ZM18.6667 15.1667C18.6667 16.4043 18.175 17.5913 17.2998 18.4665C16.4247 19.3417 15.2377 19.8333 14 19.8333C12.7623 19.8333 11.5753 19.3417 10.7002 18.4665C9.825 17.5913 9.33333 16.4043 9.33333 15.1667C9.33333 13.929 9.825 12.742 10.7002 11.8668C11.5753 10.9917 12.7623 10.5 14 10.5C15.2377 10.5 16.4247 10.9917 17.2998 11.8668C18.175 12.742 18.6667 13.929 18.6667 15.1667Z" fill="#E8B879" /> </svg> </a> </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div  className="text-center font-gotham mt-20 text-xs text-white/80 tracking-widest uppercase">
          © 2025 Sublime House of Tea. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
