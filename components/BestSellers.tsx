import React, { useRef, useLayoutEffect, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import AnimatedTitle from "./ui/AnimatedTitle";
import RotatedLuxuryText from "./RotateText";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as THREE from "three";

// Images
import Turmeric from "../assests/Turmeric.png";
import BlackTea from "../assests/BlackTea.png";
import Mountain from "../assests/Mountain.png";
import GamramMasala from "../assests/GaramMasal.png";

//  GLB IMPORT (FIXED)


gsap.registerPlugin(ScrollTrigger);

/* ------------------ GLB MODEL ------------------ */
const Model = ({ glb }: { glb: string }) => {
  const { scene } = useGLTF(glb);
  const ref = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const box = new THREE.Box3().setFromObject(ref.current);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    console.log(center)
    //  CENTER
    ref.current.position.set(
      -center.x,
      -center.y ,
      -center.z
    );

    //  SCALE FOR CARD
    // const maxAxis = Math.max(size.x, size.y , size.z);
    const scale =  1.73; //  KEY FIX
    ref.current.scale.setScalar(scale);
  }, []);

  return <primitive ref={ref} object={scene} />;
};

const ProductGLB = ({ glb }: { glb: string }) => {
  return (
    <Canvas
      className="w-full h-full mt-10 "   // MOST IMPORTANT
      camera={{ position: [0, 0, 6], fov: 50 }}
    >
      {/* <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} /> */}

      <Suspense fallback={null}>
        <Model glb={glb} />
        <Environment preset="warehouse" />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
      />
    </Canvas>
  );
};


/* ------------------ DATA ------------------ */
const products = [
  { name: "Saffron Turmeric tea", price: "$24.00", src: Turmeric },
  { name: "English Breakfast", price: "$18.00", src: BlackTea },
  { name: "Mountain Honey", price: "$32.00", glb: "/public/models/container.glb" }, //  GLB WORKS
  { name: "Garam Masala Powder", price: "$15.00", src: GamramMasala },
];

const FALLBACK_IMAGE = Turmeric;

/* ------------------ COMPONENT ------------------ */
const BestSellers: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-card",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-12 overflow-hidden bg-sublime-dark relative"
    >
      <RotatedLuxuryText side="right" position="right-20" />
      <RotatedLuxuryText side="left" position="left-20" />

      <div className="max-w-[1180px] mx-auto px-6">
        <AnimatedTitle
          title="Our Best Selling Products"
          subtitle="ONLY BUY GOOD"
          containerClass="mb-6"
          text="#E8B879"
          textClass="font-gotham"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product, index) => (
            <div key={index} className="product-card opacity-0 group">
              <div className="relative w-full aspect-[3/5] rounded-t-full overflow-hidden mb-8 border border-white/5 bg-[#0a1510]">
                {product.glb ? (
                  <ProductGLB glb={product.glb} />
                ) : (
                  <img
                    src={product.src}
                    onError={(e) =>
                      (e.currentTarget.src = FALLBACK_IMAGE)
                    }
                    className="w-full h-full object-cover opacity-90"
                    alt={product.name}
                  />
                )}

                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <button className="px-6 py-3 bg-sublime-gold text-sublime-dark text-xs font-bold uppercase rounded-full">
                    Quick Add
                  </button>
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-gotham opacity-80 text-xl text-sublime-light group-hover:text-sublime-gold transition">
                  {product.name}
                </h3>
                <p className="text-sm text-white/50 tracking-wider">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-8">
          <button className="p-2 border border-sublime-gold rounded-full">
            <ArrowLeft />
          </button>
          <button className="p-2 border border-sublime-gold rounded-full">
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
