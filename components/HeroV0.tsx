export default function HeroV0() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      {/* TODO: paste v0 design here */}
      
      {/* Placeholder Hero Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            EMER Designs
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
          Crafting digital experiences that inspire, engage, and deliver results
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
            Get Started
          </button>
          <button className="px-8 py-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors font-medium">
            Learn More
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 animate-bounce">
        <svg 
          className="w-6 h-6 text-gray-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  )
}