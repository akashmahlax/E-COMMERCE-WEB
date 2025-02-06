import Head from "next/head";

export default function CancellationAndRefundsPolicy() {
  return (
    <>
      <Head>
        <title>Cancellation and Refunds Policy</title>
      </Head>
      <div className="bg-gray-50 min-h-screen py-12 px-8 sm:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto bg-white p-8 shadow-lg rounded-2xl">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Cancellation and Refunds Policy</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">1. Order Cancellations</h2>
            <p className="text-gray-600">
              Orders can be canceled within 24 hours of placing the order. After this period, the order processing begins, and cancellation may not be possible.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">2. How to Cancel an Order</h2>
            <p className="text-gray-600">
              To cancel an order, please contact our customer support team at:
            </p>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Email: akashdalla406@gmail.com</li>
              <li>Phone: +91 7814002784</li>
            </ul>
            <p className="text-gray-600 mt-2">
              Provide your order number and the reason for cancellation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">3. Refunds Policy</h2>
            <p className="text-gray-600">
              Refunds are issued in the following scenarios:
            </p>
            <ul className="list-disc pl-5 text-gray-600">
              <li>If the product received is defective or damaged.</li>
              <li>If the order is canceled within the permitted timeframe.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">4. Refund Process</h2>
            <p className="text-gray-600">
              Once your return or cancellation is approved, the refund will be processed to your original payment method within 7-10 business days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">5. Non-Refundable Items</h2>
            <p className="text-gray-600">
              The following items are not eligible for refunds:
            </p>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Gift cards</li>
              <li>Items purchased on final sale</li>
              <li>Digital products</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">6. Contact Information</h2>
            <p className="text-gray-600">
              If you have any questions or concerns about our Cancellation and Refunds Policy, please reach out to us:
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