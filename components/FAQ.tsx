'use client'

import { useState } from 'react'

const faqs = [
  {
    question: "What services does EMER Designs offer?",
    answer: "We offer comprehensive digital design and development services including web design, UI/UX design, branding, mobile app development, and custom software solutions tailored to your business needs."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope and complexity. A simple website might take 4-6 weeks, while complex applications can take 3-6 months. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Yes! We offer various maintenance and support packages to ensure your digital products continue to perform optimally. This includes updates, security patches, and feature enhancements."
  },
  {
    question: "What is your design process?",
    answer: "Our process includes discovery, strategy, design, development, testing, and launch phases. We maintain close collaboration with clients throughout, ensuring the final product exceeds expectations."
  },
  {
    question: "Can you work with existing brands and systems?",
    answer: "Absolutely! We can seamlessly integrate with your existing brand guidelines and technical infrastructure, or help you evolve them to meet modern standards."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600">
          Find answers to common questions about our services
        </p>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-semibold text-gray-900">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`px-6 pb-4 text-gray-600 ${
                openIndex === index ? 'block' : 'hidden'
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Still have questions?
        </p>
        <button className="text-blue-600 hover:text-blue-700 font-semibold">
          Contact our team →
        </button>
      </div>
    </div>
  )
}