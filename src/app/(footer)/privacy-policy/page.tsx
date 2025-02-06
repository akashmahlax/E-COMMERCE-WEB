import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <div className="bg-gray-50 min-h-screen py-12 px-8 sm:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto bg-white p-8 shadow-lg rounded-2xl">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 leading-7 mb-4">
            At Apex, we are committed to protecting your privacy. This Privacy Policy outlines the types of
            personal information we collect, how we use it, and the steps we take to ensure your information is secure.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">1. Information We Collect</h2>
            <p className="text-gray-600">
              We may collect personal information such as your name, email address, phone number, shipping address,
              and payment details when you make a purchase or create an account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">2. How We Use Your Information</h2>
            <p className="text-gray-600">
              The information we collect is used to provide and improve our services, process transactions, send
              updates, and respond to customer service requests.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">3. Sharing Your Information</h2>
            <p className="text-gray-600">
              We do not sell, trade, or rent your personal information to third parties. We may share information with
              trusted service providers to help us operate our website and provide services to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">4. Security</h2>
            <p className="text-gray-600">
              We implement a variety of security measures to protect your personal information from unauthorized
              access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">5. Cookies</h2>
            <p className="text-gray-600">
              Our website may use cookies to enhance your browsing experience. You can choose to set your web browser
              to refuse cookies or alert you when cookies are being sent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">6. Your Choices</h2>
            <p className="text-gray-600">
              You may choose not to provide certain information, but this may limit your ability to use certain
              features of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">7. Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. We encourage you to periodically review this page
              for the latest information on our privacy practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">8. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at:
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