"use client";
import Head from "next/head";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    console.log("Input changed:", e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    // Simulate form submission logic
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-6">We would love to hear from you! Please fill out the form below or reach out directly.</p>
        {submitted ? (
          <div className="text-green-600 text-xl font-semibold">
            Thank you for contacting us! We will get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-blue-300"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300"
            >
              Submit
            </button>
          </form>
        )}

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Contact Information</h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Email: akashdalla406@gmail.com</li>
            <li>Phone: +91 7814002784</li>
          </ul>
        </section>

        <p className="text-sm text-gray-500 mt-6">
          Last updated: [Insert Date]
        </p>
      </div>
    </>
  );
}