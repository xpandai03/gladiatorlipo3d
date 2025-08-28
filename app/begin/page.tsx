'use client';

import { useState, useEffect, useRef } from 'react';

export default function BeginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <main className="bg-black">
      {/* Video Section - Full viewport height */}
      <section className="min-h-screen flex flex-col">
        <div className="h-16"></div>
        
        <div className="flex-1 relative mx-8">
          <div className="absolute inset-0">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/-qbKcdy5s-U?autoplay=1&playsinline=1&rel=0&modestbranding=1"
              title="GLADIATOR LIPO — intro video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        
        <div className="h-16"></div>
      </section>

      {/* Content Section - Scrollable */}
      <section 
        ref={contentRef}
        className={`min-h-screen bg-black text-white px-8 py-24 flex items-center justify-center transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light tracking-wider mb-12 uppercase">
            What is Gladiator<br />Liposuction?
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed font-light">
            <p>
              Gladiator Lipo, or gladiator surgery, is a fat reduction, body-defining procedure Dr. Emer developed for men who have made fitness a lifestyle yet have not been able to eliminate certain problem areas. Gladiator liposuction is often the only way for these patients to win the battle against persistent pockets of body fat and/or genetic factors that prevent them from achieving the deep, etched definition and masculine, athletic build that they desire.
            </p>
            
            <p>
              With Gladiator Lipo, Dr. Emer strategically removes small amounts of fat to sculpt more prominent lines and give the body a leaner, fitter look. He also targets under-defined muscles, puffiness, and mild skin laxity throughout the body for 360-degree transformations.
            </p>
          </div>

          {/* Learn More Button */}
          <div className="mt-12">
            <a
              href="#"
              className="
                inline-block
                px-12 py-4
                text-white
                text-sm 
                uppercase 
                tracking-[0.25em] 
                font-light
                rounded-full
                transition-all 
                duration-300 
                ease-out
                bg-black/20
                backdrop-blur-sm
                border 
                border-white
                hover:bg-white 
                hover:text-black
                hover:shadow-[0_0_40px_rgba(255,255,255,0.8)]
                active:scale-95
                text-center
              "
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}