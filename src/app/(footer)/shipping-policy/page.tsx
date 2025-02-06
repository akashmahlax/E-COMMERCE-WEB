import Head from "next/head";

export default function ShippingPolicy() {
  return (
    <>
      <Head>
        <title>Shipping Policy</title>
      </Head>
      <div className="bg-gray-50 min-h-screen py-12 px-8 sm:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto bg-white p-8 shadow-lg rounded-2xl">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Shipping Policy</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">1. Order Processing Time</h2>
            <p className="text-gray-600">
              Orders are typically processed within 1-3 business days (excluding weekends and holidays) after receiving your order confirmation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">2. Shipping Rates and Delivery Estimates</h2>
            <p className="text-gray-600">
              Shipping charges for your order will be calculated and displayed at checkout.
            </p>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Standard Shipping: 5-7 business days</li>
              <li>Express Shipping: 2-4 business days</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">3. Shipping Confirmation and Order Tracking</h2>
            <p className="text-gray-600">
              You will receive a shipping confirmation email once your order has been shipped, containing your tracking number.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">4. International Shipping</h2>
            <p className="text-gray-600">
              Currently, we only ship to addresses within India.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">5. Shipping Issues and Delays</h2>
            <p className="text-gray-600">
              While we strive to ensure timely delivery, unforeseen delays may occur due to courier service issues, customs clearance, or other factors beyond our control.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">6. Return Shipping Costs</h2>
            <p className="text-gray-600">
              If a return is necessary, the shipping cost for returning the product may be borne by the customer unless the item was defective or incorrectly shipped.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">7. Contact Information</h2>
            <p className="text-gray-600">
              For any questions or concerns regarding our shipping policy, please contact us:
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