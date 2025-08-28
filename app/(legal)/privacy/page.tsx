import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - EMER Designs',
  description: 'Privacy policy for EMER Designs',
}

export default function PrivacyPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-20">
      <header>
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-12">Last updated: January 2025</p>
      </header>

      <section className="prose prose-lg max-w-none space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed">
            We collect information you provide directly to us, such as when you contact us, subscribe to our newsletter, or use our services. This may include your name, email address, and any other information you choose to provide.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed">
            We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
          <p className="text-gray-700 leading-relaxed">
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at privacy@emerdesigns.com.
          </p>
        </div>
      </section>
    </article>
  )
}