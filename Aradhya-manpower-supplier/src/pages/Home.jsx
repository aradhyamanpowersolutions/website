import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import './timeline.css';
import { useInView } from 'react-intersection-observer';

const companyPeople = [
  '/Hero_image/p1.png',
  '/Hero_image/p3.png',
  '/Hero_image/p4.png',
  '/Hero_image/p5.png',
  '/Hero_image/p7.png',
  '/Hero_image/p8.png',
  '/Hero_image/p6.png',

];

function CompanyPeopleSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [previousIndex, setPreviousIndex] = useState(companyPeople.length - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousIndex(currentIndex);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % companyPeople.length);
      setNextIndex((prevIndex) => (prevIndex + 1) % companyPeople.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
      {companyPeople.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          className="absolute top-0 left-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{
            opacity: index === currentIndex ? 1 : index === nextIndex ? 1 : index === previousIndex ? 1 : 0,
            zIndex: index === currentIndex ? 2 : index === nextIndex ? 1 : 0
          }}
          transition={{ duration: 1 }}
        />
      ))}
    </div>
  );
}
function ProcessStep({ step, index }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={cardVariants}
      className="process-card bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border border-white border-opacity-20"
    >
      <div className="p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{step.icon}</span>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-blue-400 transition-colors duration-300">{step.title}</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function Home() {
  const processSteps = [
    {
      title: "Needs Assessment",
      description: "We conduct a thorough assessment of your manpower needs to understand the specific requirements for each role.",
      icon: "🔍"
    },
    {
      title: "Recruitment & Selection",
      description: "We leverage a robust recruitment process to source and vet candidates, ensuring they meet your standards and job requirements.",
      icon: "👥"
    },
    {
      title: "Deployment",
      description: "Our team manages the deployment of personnel to your site, providing continuous support and ensuring smooth integration.",
      icon: "🚀"
    },
    {
      title: "Monitoring & Support",
      description: "We offer ongoing support and monitor performance to address any issues promptly and maintain high standards.",
      icon: "📊"
    },
    {
      title: "Feedback & Improvement",
      description: "We actively seek feedback to continuously improve our services and adapt to your evolving needs.",
      icon: "🔄"
    }
  ];

  const logos = [
    '/images/cipla.png',
    '/images/lupin.png',
    '/images/ipca.png',
    '/images/ajanta.png',
    '/images/clad.png',
    '/images/kusum.png',
    '/images/par.png',
    '/images/symbiotec.png',
    '/images/mother.png',
    '/images/temple.png',
    '/images/knovea.png',
  ];

  const logoContainerRef = useRef(null);
  const [logoWidth, setLogoWidth] = useState(0);

  useEffect(() => {
    if (logoContainerRef.current) {
      const containerWidth = logoContainerRef.current.offsetWidth;
      setLogoWidth(containerWidth / 5); // Show 5 logos at a time
    }
  }, []);

  const logoAnimation = {
    x: [-logoWidth, -logoWidth * logos.length],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 50,
        ease: "linear",
      },
    },
  };
  return (
    <div className="home bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 min-h-screen">
        <section className="hero-section min-h-screen flex items-center justify-center pt-24 pb-16">
  <div className="container mx-auto px-4">
    <div className="flex flex-col lg:flex-row items-center justify-between">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left"
      >
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Aradhya Manpower Supplier
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-cursive"
          >
            Serving your needs better
          </motion.div>
          <p className="text-lg mb-12 text-gray-700 dark:text-gray-300 max-w-xl">
            Transforming workplaces with efficient and reliable manpower services. Elevate your business with our expert solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/services"
              className="bg-orange-500 text-white py-3 px-8 rounded-full font-semibold hover:bg-orange-600 transition duration-300 text-lg inline-flex items-center justify-center"
            >
              Our Services
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
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-purple-500 text-purple-500 py-3 px-8 rounded-full font-semibold hover:bg-purple-500 hover:text-white transition duration-300 text-lg inline-flex items-center justify-center"
            >
              Contact Us
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
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
        
       
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 mt-12 lg:mt-0"
      >
        <CompanyPeopleSlideshow />
      </motion.div>
    </div>

    {/* Logo Slideshow */}
    <div className="mt-20">
    <h2 className="text-4xl font-semibold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Our Client</h2>
    <div className="overflow-hidden">
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
  </div>
</section>

      {/* Services Section */}
      <section className="services-section py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Skilled Labor", icon: "👨‍🔧", description: "Our skilled labor services include technicians in maintenance, lab assistants, and more." },
              { title: "Unskilled Labor", icon: "👷", description: "This service includes general labor for packing, loading, and unloading, warehouse work, and more." },
              { title: "Administrative Support", icon: "👩‍💼", description: "Our administrative support services include office assistants, clerks, and more." }
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer border border-white border-opacity-20 flex flex-col h-full"
              >
                <div className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{service.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </div>
                <Link to="/services" className="mt-auto">
                  <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-4">
                    <span className="text-white text-sm font-semibold block text-center">Know More</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="our-process-section py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Our Process</h2>
          <div className="process-timeline relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 dark:bg-blue-700 rounded"></div>
            {processSteps.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">What Our Clients Say</h2>
          <Testimonials />
        </div>
      </section>
    </div>
  );
}

export default Home;