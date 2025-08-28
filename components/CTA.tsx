export default function CTA() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 text-white text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-6">
        Ready to Transform Your Vision?
      </h2>
      <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-95">
        Join hundreds of satisfied clients who have elevated their digital presence with our innovative solutions.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
          Start Your Project
        </button>
        <button className="px-8 py-4 border-2 border-white rounded-lg hover:bg-white/10 transition-colors font-semibold">
          Schedule Consultation
        </button>
      </div>
      
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
        <div>
          <p className="text-3xl font-bold">500+</p>
          <p className="text-sm opacity-90">Projects Completed</p>
        </div>
        <div>
          <p className="text-3xl font-bold">98%</p>
          <p className="text-sm opacity-90">Client Satisfaction</p>
        </div>
        <div>
          <p className="text-3xl font-bold">24/7</p>
          <p className="text-sm opacity-90">Support Available</p>
        </div>
      </div>
    </div>
  )
}