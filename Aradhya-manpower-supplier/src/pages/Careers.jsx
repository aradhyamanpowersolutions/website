import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import ApplyForm from './ApplyForm';

const AnimatedSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

const WhyJoinUs = () => {
  const reasons = [
    {
      title: "Growth Opportunities",
      description: "Expand your skills and advance your career with our professional development programs.",
      icon: "🚀"
    },
    {
      title: "Innovative Environment",
      description: "Be part of cutting-edge projects and shape the future of workforce solutions.",
      icon: "💡"
    },
    {
      title: "Work-Life Balance",
      description: "Enjoy flexible schedules and a supportive culture that values your well-being.",
      icon: "⚖️"
    },
    {
      title: "Competitive Benefits",
      description: "Receive comprehensive health coverage, retirement plans, and attractive perks.",
      icon: "🏆"
    },
    {
      title: "Diverse & Inclusive",
      description: "Join a team that celebrates diversity and fosters an inclusive workplace.",
      icon: "🌈"
    },
    {
      title: "Global Impact",
      description: "Make a difference in communities worldwide through our international projects.",
      icon: "🌍"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white py-20 rounded-3xl shadow-xl">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Why Join Aradhya Manpower?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-xl hover:shadow-2xl transition duration-300 border border-white border-opacity-20 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-6xl mb-4 text-blue-500">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-sm opacity-80">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
function Careers() {
  const [showPopup, setShowPopup] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const whyJoinUsRef = useRef(null);

  useEffect(() => {
    if (showPopup) {
      setScrollPosition(window.pageYOffset);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [showPopup, scrollPosition]);

  const handleApplicationSubmit = (status) => {
    setSubmitStatus(status);
    setShowPopup(true);
    setIsSubmitting(false);
    setScrollPosition(window.pageYOffset);
  };

  const scrollToWhyJoinUs = () => {
    whyJoinUsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const PopupCard = ({ isSubmitting, status, onClose }) => {
    let message = '';
    let icon = null;
  
    if (isSubmitting) {
      message = "Submitting your application...";
      icon = (
        <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      );
    } else if (status === 'success') {
      message = "Thank you for your application! We'll review it and get back to you soon.";
      icon = <CheckCircleIcon className="h-12 w-12 text-green-500" />;
    } else if (status === 'error') {
      message = "Oops! An error occurred while submitting your application. Please try again.";
      icon = <ExclamationCircleIcon className="h-12 w-12 text-red-500" />;
    }
  
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', top: scrollPosition }}
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
    <div className="careers bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 min-h-screen">
      <section className="hero-section min-h-screen flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Join Our Team
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-cursive"
            >
              Shape the Future of Workforce Solutions
            </motion.div>
            <p className="text-xl md:text-2xl mb-12 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Be part of a dynamic team that's revolutionizing workforce solutions globally.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="#apply-now"
                className="bg-orange-500 text-white py-3 px-8 rounded-full font-semibold hover:bg-orange-600  transition duration-300 text-lg inline-flex items-center justify-center"
              >
                Apply Now
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
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
              <a
                onClick={scrollToWhyJoinUs}
                className="bg-transparent border-2 border-purple-500 text-purple-500 py-3 px-8 rounded-full font-semibold hover:bg-purple-500 hover:text-white transition duration-300 text-lg inline-flex items-center justify-center cursor-pointer"
              >
                Why Join Us?
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
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={whyJoinUsRef} className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <WhyJoinUs />
          </AnimatedSection>
        </div>
      </section>
      <section id="apply-now" className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Apply Now
          </h2>
          <div className="max-w-3xl mx-auto">
            <ApplyForm onSubmit={handleApplicationSubmit} />
          </div>
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

export default Careers;