'use client'

import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import Image from 'next/image'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface BodyFlythroughProps {
  mode?: 'spline' | 'video'
}

export default function BodyFlythrough({ mode = 'video' }: BodyFlythroughProps) {
  const [shouldUseSpline, setShouldUseSpline] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const checkCapabilities = () => {
      const isDesktop = window.innerWidth >= 1024
      const hasGoodGPU = 'gpu' in navigator && navigator.gpu !== undefined
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      const canUseSpline = 
        mode === 'spline' && 
        isDesktop && 
        !prefersReducedMotion && 
        (hasGoodGPU || true)
      
      setShouldUseSpline(canUseSpline)
    }

    checkCapabilities()
    window.addEventListener('resize', checkCapabilities)
    
    return () => window.removeEventListener('resize', checkCapabilities)
  }, [mode])

  useEffect(() => {
    if (!shouldUseSpline && videoRef.current) {
      const handleScroll = () => {
        if (!containerRef.current || !videoRef.current) return
        
        const rect = containerRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const elementTop = rect.top
        const elementHeight = rect.height
        
        if (elementTop < viewportHeight && elementTop + elementHeight > 0) {
          const visibleProgress = Math.max(0, Math.min(1, 
            (viewportHeight - elementTop) / (viewportHeight + elementHeight)
          ))
          
          setScrollProgress(visibleProgress)
          
          if (videoRef.current.duration) {
            videoRef.current.currentTime = visibleProgress * videoRef.current.duration
          }
        }
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
      
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [shouldUseSpline])

  const handleVideoError = () => {
    setVideoError(true)
  }

  if (shouldUseSpline) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <Suspense fallback={
          <div className="text-white text-2xl animate-pulse">Loading 3D Experience...</div>
        }>
          <div className="w-full h-screen">
            <Spline 
              scene="https://prod.spline.design/6Wq1Q7YGyM-iab9t/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </Suspense>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-center">
          <p className="text-lg font-medium">Immersive 3D Experience</p>
          <p className="text-sm opacity-75">Interact with the model</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {!videoError ? (
        <>
          <div className="sticky top-0 w-full h-screen">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
              onError={handleVideoError}
              poster="/poster.svg"
            >
              <source src="/body.webm" type="video/webm" />
            </video>
          </div>
          
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="sticky top-1/2 -translate-y-1/2 text-white text-center px-8"
              style={{
                opacity: Math.sin(scrollProgress * Math.PI),
              }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Experience Innovation
              </h2>
              <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
                Scroll to explore our cutting-edge solutions
              </p>
            </div>
          </div>
          
          <div className="h-[200vh]" aria-hidden="true" />
        </>
      ) : (
        <div className="relative min-h-screen flex items-center justify-center">
          <Image
            src="/poster.svg"
            alt="EMER Designs showcase"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-10 text-white text-center px-8">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Visual Excellence
            </h2>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              Discover our portfolio of innovative designs
            </p>
          </div>
        </div>
      )}
    </div>
  )
}