import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const AnimatedSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowPopup(true);

    fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setSubmitStatus('success');
      })
      .catch((error) => {
        console.error('Error:', error);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const PopupCard = ({ isSubmitting, status, onClose }) => {
    let message = '';
    let icon = null;
  
    if (isSubmitting) {
      message = "Sending your message to the stars...";
      icon = (
        <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      );
    } else if (status === 'success') {
      message = "Thank you! We'll reach back to you soon. Please check your email.";
      icon = <CheckCircleIcon className="h-12 w-12 text-green-500" />;
    } else if (status === 'error') {
      message = "Oops! An error occurred. Please try again.";
      icon = <ExclamationCircleIcon className="h-12 w-12 text-red-500" />;
    }
  
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-sm w-full mx-4 text-center shadow-xl">
          {icon}
          <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">{message}</p>
          {!isSubmitting && (
            <button
              onClick={onClose}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Close
            </button>
          )}
        </div>
      </motion.div>
    );
  };


  return (
    <div className="contact bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Let's Connect
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              We're here to listen, assist, and collaborate. Reach out and let's start a conversation about your manpower needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="#contact-form"
                  className="bg-orange-500 text-white py-3 px-8 rounded-full font-semibold hover:bg-orange-600 transition duration-300 text-lg inline-flex items-center justify-center"
                >
                  Get in Touch
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                    />
                  </svg>
                </a>
              </motion.div>
              <Link
                to="/"
                className="bg-transparent border-2 border-purple-500 text-purple-500 py-3 px-8 rounded-full font-semibold hover:bg-purple-500 hover:text-white transition duration-300 text-lg inline-flex items-center justify-center"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="scroll-down flex flex-col items-center"
          >
            <motion.p
              className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Scroll Down to Fill Form
            </motion.p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8 text-blue-600 dark:text-blue-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="contact-form-section py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection delay={0.2}>
            <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Reach Out to Us</h2>
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 transition duration-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 transition duration-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 transition duration-300"
                    placeholder="+91 123 456 7890"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 transition duration-300"
                    placeholder="Your Company Ltd."
                  />
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 transition duration-300"
                  placeholder="Tell us about your manpower needs..."
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="mt-8 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-md font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 text-lg"
              >
                Send Message
              </motion.button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection delay={0.4}>
            <h2 className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Our Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="contact-info-card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 p-8 text-center"
              >
                <PhoneIcon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">+91 8827653280<br />+91 9827237970</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="contact-info-card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 p-8 text-center"
              >
                <EnvelopeIcon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Email</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">aradhyamanpowersolutions@gmail.com </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="contact-info-card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 p-8 text-center"
              >
                <MapPinIcon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Address</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  C.O. 2136 Luniya Pura, Mhow, Indore,<br />
                  Branch Office 91 <br />
                  Link raod Pithampur Dhar
                </p>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection delay={0.6}>
            <h2 className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Find Us on the Map</h2>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.9996135832574!2d75.67264454403077!3d22.621379573964095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2s0!5e0!3m2!1sen!2sin!4v1627900675523!5m2!1sen!2sin`}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      <AnimatePresence>
        {showPopup && (
          <PopupCard
            isSubmitting={isSubmitting}
            status={submitStatus}
            onClose={() => {
              setShowPopup(false);
              setSubmitStatus(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Contact;