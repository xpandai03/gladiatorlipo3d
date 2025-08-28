import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - EMER Designs',
  description: 'Terms of service for EMER Designs',
}

export default function TermsPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-20">
      <header>
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-sm text-gray-600 mb-12">Effective Date: January 2025</p>
      </header>

      <section className="prose prose-lg max-w-none space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <p className="text-gray-700 leading-relaxed">
            Permission is granted to temporarily access our services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <p className="text-gray-700 leading-relaxed">
            You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to use our services only for lawful purposes.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed">
            All content, features, and functionality of our services are owned by EMER Designs and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            EMER Designs shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">6. Modifications</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these terms at any time. Your continued use of our services following any changes constitutes your acceptance of the new terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
          <p className="text-gray-700 leading-relaxed">
            For questions regarding these Terms of Service, please contact us at legal@emerdesigns.com.
          </p>
        </div>
      </section>
    </article>
  )
}