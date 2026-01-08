import React, { useEffect, useState, useRef } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { NavLink } from '../types';

const navLinks: NavLink[] = [
  { label: 'Loose Tea', href: '#' },
  { label: 'Honey', href: '#' },
  { label: 'Spices', href: '#' },
  { label: 'Dry Fruits', href: '#' },
  { label: 'Gifting', href: '#' },
  {label:<Menu/>, href: '#'}
];


const  Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Icon Hover Animation
  const handleIconEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1.2, rotate: 10, duration: 0.4, ease: "power2.out" });
  };
  
  const handleIconLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.4, ease: "power2.out" });
  };

  // Link Hover Animation
  const handleLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const line = e.currentTarget.querySelector('.link-line');
    gsap.to(line, { width: '100%', duration: 0.5, ease: "expo.out" });
    gsap.to(e.currentTarget, { color: '#C5A059', duration: 0.3 });
  };

  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const line = e.currentTarget.querySelector('.link-line');
    gsap.to(line, { width: '0%', duration: 0.5, ease: "expo.out" });
    gsap.to(e.currentTarget, { color: '#EBE7E0', duration: 0.3 });
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 border-b border-white/5 ${
        isScrolled ? 'bg-sublime-dark/80 backdrop-blur-xl py-4 shadow-lg' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex-shrink-0 z-50">
           <a href="#" className="flex flex-col items-center group">
             <span className="font-serif text-2xl md:text-3xl text-white tracking-wide group-hover:text-sublime-gold transition-colors duration-500">
               Sublime
             </span>
             <span className="text-[0.5rem] md:text-[0.6rem] text-sublime-gold tracking-[0.3em] uppercase mt-1 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
               The House of Tea
             </span>
           </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-xs lg:text-sm text-sublime-light tracking-[0.15em] uppercase relative py-2"
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
            >
              {link.label}
              <span className="link-line absolute bottom-0 left-0 h-[1px] bg-sublime-gold w-0 transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-8 text-sublime-light">
          <button 
            onMouseEnter={handleIconEnter} 
            onMouseLeave={handleIconLeave}
            className="p-2 transition-colors hover:text-sublime-gold"
          >
            <Search size={20} strokeWidth={1} />
          </button>
          <button 
            onMouseEnter={handleIconEnter} 
            onMouseLeave={handleIconLeave}
            className="p-2 transition-colors hover:text-sublime-gold"
          >
            <User size={20} strokeWidth={1} />
          </button>
          <button 
            onMouseEnter={handleIconEnter} 
            onMouseLeave={handleIconLeave}
            className="p-2 transition-colors hover:text-sublime-gold relative"
          >
            <ShoppingBag size={20} strokeWidth={1} />
            <span className="absolute top-1 right-0 w-1.5 h-1.5 bg-sublime-gold rounded-full"></span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50 text-sublime-light">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-sublime-dark/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-2xl font-serif text-sublime-light tracking-wider hover:text-sublime-gold transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;