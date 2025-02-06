"use client";
import Head from "next/head";

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions</title>
      </Head>
      <div className="bg-gray-50 min-h-screen py-12 px-8 sm:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto bg-white p-8 shadow-lg rounded-2xl">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Terms and Conditions</h1>
          <p className="text-gray-600 leading-7 mb-4">
            These terms and conditions outline the rules and regulations for the use of shopshare website.
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing this website, you agree to comply with and be bound by the following terms. If you do not
              agree to these terms, please refrain from using the site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">2. User Accounts</h2>
            <p className="text-gray-600">
              To use certain features of our website, you may need to create an account. You are responsible for
              maintaining the confidentiality of your account details and for all activities under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">3. Intellectual Property Rights</h2>
            <p className="text-gray-600">
              All content, logos, graphics, and text on this website are the property of [Web Name] and are protected
              by intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">4. Payment and Pricing</h2>
            <p className="text-gray-600">
              Prices listed on our website are subject to change without notice. We strive to display accurate prices,
              but errors may occur. In the event of a pricing error, we reserve the right to cancel or adjust orders.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">5. Limitation of Liability</h2>
            <p className="text-gray-600">
              To the fullest extent permitted by law, [Web Name] shall not be liable for any damages arising from the
              use or inability to use our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">6. Governing Law</h2>
            <p className="text-gray-600">
              These terms shall be governed by and interpreted in accordance with the laws of [Jurisdiction].
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">7. Amendments</h2>
            <p className="text-gray-600">
              We reserve the right to update these terms at any time. Your continued use of the website constitutes
              acceptance of the changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">8. Contact Information</h2>
            <p className="text-gray-600">
              If you have any questions about these terms, please contact us at:
            </p>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Email: akashdalla406@gmail.com</li>
              <li>Phone: +91 7814002784</li>
            </ul>
          </section>

          <p className="text-sm text-gray-500 mt-6">
          Last updated: {Date.now().toString()}
          </p>
        </div>
      </div>
    </>
  );
}

