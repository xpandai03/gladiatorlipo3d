'use client';

import Spline from '@splinetool/react-spline';
import { useState, useEffect, useRef } from 'react';
import { AscendModal } from '@/components/AscendIntake';

const SCENE_URL =
  'https://prod.spline.design/6s3QjaKZREdGtVKe/scene.splinecode?v=rev1'; // bump rev on each publish

const reviews = [
  {
    text: "I had an incredible experience getting hi def lipo on my torso and chest by Dr. Emer. His artistry is unmatched. I'm a fit guy and I spent the last year and a half getting in the best shape of my life. I wanted to work with a Dr. to take my body to the next level, but I didn't want fake abs drawn on me - I wanted a Dr. to reveal and define my actual muscles and body. Only two days out of surgery and I look like a Marvel character. I'm shocked at how little bruising or swelling I have, and the aftercare team and regimen has been awesome. Everyone at the office has been super communicative, warm, and attentive - especially Michael, Mari, and Dalia. This is the most holistic care I've ever received from a medical team.",
    author: "JARED NEWMARK"
  },
  {
    text: "I found Dr. Emer through instagram and loved his work so I scheduled a consultation and planned to get my buccal fat pad and neck lipo with him. The process went amazing, it was painless and very smooth and his team took amazing care of me and helped guide me through the entire process making it seamless. I love my results and will be back in a few weeks to get filler done with him, I'd highly recommend to everyone to schedule a consultation with Dr. Emer and go to him for all your work, will not regret it !!",
    author: "RAHEEL KHALID"
  },
  {
    text: "Hands down the best of the best when it comes to Lipo! I've been working with Dr. Emer to figure out how to shape my sexy self! I'm a bit curvy and well with curves comes the dreaded chub over time. Unless of course you're a gym nut which I am not lol. I'm really happy with how everything went and will be coming back for a follow up session soon.",
    author: "MICHELLE BROWN"
  },
  {
    text: "Dr. Jason Emer is LA's very own cosmetics dermatologist very BEST. He is treating me for hyperpigmentation, possible neck lift and HD lipo in the near future. He is truly a master artist of Beauty: fillers, and SKIN improvement. He has a great staff. From his call center to Justin N. his sale rep is personable, caring and knowledgeable have great customer service skills. I've gotten a couple amazing facial from his esthetician, Amazing! He only carries the very best skincare products. My favorite from his beauty bar are The EMK Beverly Hills Rescue Serum and Alpha Mask, my fav. Oh did I mention his brand new state of the art office, never seen anything like it. Dr. Emer and his team of Doctor and Staff are the very best. Can't wait for my next treatment.",
    author: "CHARLES BORROMEO"
  }
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [videoInView, setVideoInView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Typing animation effect
  useEffect(() => {
    const text = "Begin your ascension";
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        // Hold the complete text for 1 second, then fade out
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }, 70); // 70ms per character for smooth typing
    
    return () => clearInterval(typingInterval);
  }, []); // Only run once on mount

  // Control video playback based on visibility and interaction
  useEffect(() => {
    if (iframeRef.current && hasInteracted) {
      const iframe = iframeRef.current;
      if (videoInView) {
        // Play video when in view (after user has interacted)
        iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      } else {
        // Pause video when out of view
        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    }
  }, [videoInView, hasInteracted]);

  useEffect(() => {
    const contentObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const resultsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setResultsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const reviewsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReviewsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        setVideoInView(entry.isIntersecting);
      },
      { threshold: 0.5 } // Video needs to be 50% visible
    );

    if (contentRef.current) {
      contentObserver.observe(contentRef.current);
    }
    if (resultsRef.current) {
      resultsObserver.observe(resultsRef.current);
    }
    if (reviewsRef.current) {
      reviewsObserver.observe(reviewsRef.current);
    }
    if (videoRef.current) {
      videoObserver.observe(videoRef.current);
    }

    return () => {
      if (contentRef.current) {
        contentObserver.unobserve(contentRef.current);
      }
      if (resultsRef.current) {
        resultsObserver.unobserve(resultsRef.current);
      }
      if (reviewsRef.current) {
        reviewsObserver.unobserve(reviewsRef.current);
      }
      if (videoRef.current) {
        videoObserver.unobserve(videoRef.current);
      }
    };
  }, []);

  const scrollToVideo = () => {
    videoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div className={`fixed inset-0 bg-white z-[400] flex items-center justify-center transition-opacity duration-500 ${!isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="text-black text-3xl md:text-4xl font-thin tracking-wider">
            {typedText}
            <span className="animate-pulse ml-1">|</span>
          </h1>
        </div>
      )}

      {/* Main Content - fade in after loading */}
      <main className={`bg-black text-white transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Fixed EMER Logo */}
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] pointer-events-none">
          <span className={`text-5xl md:text-6xl font-black tracking-[0.15em] transition-colors duration-300 ${isModalOpen ? 'text-black' : 'text-white'}`}>
            EMER
          </span>
        </div>

      {/* Spline Hero Section - First viewport */}
      <section className="min-h-[100svh] relative">
        {/* Spline background */}
        <div className="fixed inset-0">
          <Spline scene={SCENE_URL} />
        </div>

        {/* Sleek Minimalist Button - Fixed at bottom */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="
            fixed
            bottom-12
            left-1/2
            -translate-x-1/2
            z-[100]
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
            inline-block
            text-center
          "
        >
          Ascend
        </button>

        {/* Reduced-motion poster */}
        <img
          src="/poster.jpg"
          alt=""
          className="fixed inset-0 w-full h-full object-cover hidden motion-reduce:block"
        />
      </section>

      {/* Video Section - Second viewport */}
      <section ref={videoRef} className="min-h-screen flex flex-col relative z-10 bg-black">
        <div className="h-16"></div>
        
        <div className="flex-1 relative mx-8">
          <div 
            className="absolute inset-0 cursor-pointer group"
            onClick={() => {
              if (!hasInteracted) {
                setHasInteracted(true);
              }
              setIsMuted(!isMuted);
              if (iframeRef.current) {
                iframeRef.current.contentWindow?.postMessage(
                  `{"event":"command","func":"${isMuted ? 'unMute' : 'mute'}","args":""}`, 
                  '*'
                );
              }
            }}
          >
            <iframe
              ref={iframeRef}
              className="w-full h-full pointer-events-none"
              src={`https://www.youtube.com/embed/-qbKcdy5s-U?autoplay=${videoInView ? '1' : '0'}&mute=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`}
              title="GLADIATOR LIPO — intro video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            
            {/* Mute/Unmute Indicator */}
            <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-sm rounded-full p-3 transition-all duration-200 group-hover:bg-black/70">
              {isMuted ? (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </div>
            
            {/* Click to unmute prompt (shows when muted) */}
            {isMuted && videoInView && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="bg-black/70 text-white px-6 py-3 rounded-full text-sm uppercase tracking-wider animate-pulse">
                  Click to unmute
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="h-16"></div>
      </section>

      {/* Content Section - Third viewport */}
      <section 
        ref={contentRef}
        className={`min-h-screen bg-black text-white px-8 py-24 flex items-center justify-center transition-opacity duration-1000 relative z-10 ${
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

      {/* Real Results Section - Fourth viewport */}
      <section 
        ref={resultsRef}
        className={`min-h-screen bg-black text-white px-8 py-24 flex flex-col items-center justify-center transition-opacity duration-1000 relative z-10 ${
          resultsVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-light tracking-[0.2em] mb-16 uppercase text-center">
            Real Results
          </h2>
          
          {/* Transformation Images Grid */}
          <div className="space-y-8">
            {/* First transformation */}
            <div className="relative w-full overflow-hidden rounded-lg">
              <img
                src="/transformation1.png"
                alt="Gladiator Lipo Transformation 1"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Second transformation */}
            <div className="relative w-full overflow-hidden rounded-lg">
              <img
                src="/transformation2.webp"
                alt="Gladiator Lipo Transformation 2"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section - Fifth viewport */}
      <section 
        ref={reviewsRef}
        className={`min-h-screen bg-black text-white px-8 py-24 flex flex-col items-center justify-center transition-opacity duration-1000 relative z-10 ${
          reviewsVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-light tracking-[0.2em] mb-8 uppercase text-center">
            Reviews
          </h2>
          
          {/* 5 Star Rating */}
          <div className="flex justify-center mb-12 text-3xl text-yellow-400">
            ★★★★★
          </div>
          
          {/* Carousel Container */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-20 text-white/60 hover:text-white transition-colors duration-300 text-4xl md:text-5xl font-light z-20"
              aria-label="Previous review"
            >
              ‹
            </button>
            
            {/* Review Content */}
            <div className="px-4 md:px-12">
              <div className="min-h-[300px] flex flex-col justify-center">
                <p className="text-center text-base md:text-lg leading-relaxed font-light mb-8 transition-opacity duration-500">
                  {reviews[currentReview].text}
                </p>
                <p className="text-center text-sm md:text-base font-medium tracking-[0.2em] uppercase">
                  {reviews[currentReview].author}
                </p>
              </div>
            </div>
            
            {/* Right Arrow */}
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-20 text-white/60 hover:text-white transition-colors duration-300 text-4xl md:text-5xl font-light z-20"
              aria-label="Next review"
            >
              ›
            </button>
          </div>
          
          {/* Review Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentReview === index ? 'bg-white w-8' : 'bg-white/30'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
    
    {/* Ascend Intake Modal */}
    <AscendModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
    />
    </>
  );
}