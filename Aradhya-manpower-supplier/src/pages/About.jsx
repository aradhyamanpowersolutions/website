import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';

function About() {
  const logos = [
    '/images/cipla.png',
    '/images/lupin.png',
    '/images/ipca.png',
    '/images/ajanta.png',
    '/images/clad.png',
    '/images/kusum.png',
    '/images/par.png',
    '/images/symbiotec.png',
  ];

  const logoContainerRef = useRef(null);
  const [logoWidth, setLogoWidth] = useState(0);

  useEffect(() => {
    if (logoContainerRef.current) {
      const containerWidth = logoContainerRef.current.offsetWidth;
      setLogoWidth(containerWidth / logos.length);
    }
  }, [logos.length]);

  const logoAnimation = {
    x: [-logoWidth, -logoWidth * logos.length],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    },
  };

  return (
    <div className="about bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 min-h-screen">
      <section className="hero-section min-h-screen flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              About Aradhya Manpower
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-cursive"
            >
              Your Partner in Industrial Excellence
            </motion.div>
            <p className="text-xl md:text-2xl mb-12 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Aradhya Manpower Supplier is a leading organization, excelling in manpower Supply in Manufacturing industry for Packing, Loading & unloading, Housekeeping, Maintenance, Quality lab etc.
            </p>
            <div className="flex justify-center">
              <Link
                to="/contact"
                className="bg-orange-500 text-white py-3 px-8 rounded-full font-semibold hover:bg-orange-600 transition duration-300 text-lg inline-flex items-center"
              >
                Get Started
                <ArrowRightCircleIcon className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </motion.div>
          
          {/* Logo Slideshow */}
          <div className="overflow-hidden mt-16">
            <motion.div
              ref={logoContainerRef}
              className="flex space-x-12"
              animate={logoAnimation}
            >
              {logos.concat(logos).map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt={`Client logo ${index + 1}`}
                  className="h-12 w-auto"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="our-story-section py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer border border-white border-opacity-20 flex flex-col h-full"
            >
              <div className="p-6 flex-grow">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Our Journey</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  This young company, incepted in the year 2019, introduced revolutionary & then 'ahead of its time' services. We've rapidly grown to become a trusted partner in the manufacturing industry.
                </p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer border border-white border-opacity-20 flex flex-col h-full"
            >
              <div className="p-6 flex-grow">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Our Expertise</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We specialize in providing high-quality manpower for various sectors including Packing, Loading & unloading, Housekeeping, Maintenance, and Quality lab operations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="values-section py-24 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Quality", icon: "⭐", description: "We are committed to providing top-quality manpower to meet our clients' needs." },
              { title: "Innovation", icon: "💡", description: "We continuously innovate our services to stay ahead in the industry." },
              { title: "Reliability", icon: "🤝", description: "Our clients can always count on us for timely and efficient service." }
            ].map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;