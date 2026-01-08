import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Founder from './components/Founder';
import Curated from './components/Curated';
import WhyChooseUs from './components/WhyChooseUs';
import BestSellers from './components/BestSellers';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import Footer from './components/Footer';
import Blog from './components/Blog';
import MainFooter from './components/MainFooter';


function App() {
  return (
    <main className="w-full bg-sublime-dark min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <Founder />
      <Curated />
      <WhyChooseUs />
      <BestSellers />
      <Testimonials />
      <Partners />
      <Blog/>
      <Footer />
      <MainFooter/>
    </main>
  );
}

export default App;